package com.controller;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.model.Rol;
import com.model.Usuario;
import com.security.dto.JwtDto;
import com.security.dto.LoginUsuario;
import com.security.dto.NuevoUsuario;
import com.security.enums.RolNombre;
import com.security.jwt.JwtProvider;
import com.security.service.UsuarioService;
import com.service.RolService;
import com.util.GenericResponse;
import com.util.ParametersApp;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    RolService rolService;

    @Autowired
    JwtProvider jwtProvider;

    @PostMapping("/nuevo")
    public GenericResponse<String> nuevo(@Valid @RequestBody NuevoUsuario nuevoUsuario, BindingResult bindingResult) {
        GenericResponse<String> response = new GenericResponse<>();
        if (bindingResult.hasErrors()) {
            response.setMessage("CAMPOS MAL FORMADOS");
            response.setObject("CAMPOS MAL FORMADOS!!");
            response.setStatus(ParametersApp.PROCESS_NOT_COMPLETED.value());
            return response;
        }

        if (usuarioService.existsByCedula(nuevoUsuario.getCedula())) {
            log.info("ESTA CEDULA YA EXISTE");
            response.setMessage("ESTA CEDULA YA EXISTE");
            response.setStatus(ParametersApp.PROCESS_NOT_COMPLETED.value());
            return response;
        }

        if (usuarioService.existsByEmail(nuevoUsuario.getEmail())) {
            response.setMessage("ESTE EMAIL YA EXISTE");
            response.setObject("ESE EMAIL YA EXISTE!!");
            response.setStatus(ParametersApp.PROCESS_NOT_COMPLETED.value());
            return response;
        } else {
            Usuario usuario = new Usuario(nuevoUsuario.getCedula(), nuevoUsuario.getNombres(),
                    nuevoUsuario.getApellidos(),nuevoUsuario.getEmail(), nuevoUsuario.getCedula(), passwordEncoder.encode(nuevoUsuario.getCedula()) );
            Set<Rol> roles = new HashSet<>();
            roles.add(rolService.getByRolNombre(RolNombre.ROLE_EMPLEADO).get());
            if (nuevoUsuario.getRoles().contains("admin")) {
                roles.add(rolService.getByRolNombre(RolNombre.ROLE_ADMIN).get());
            }
            usuario.setRoles(roles);
            usuarioService.save(usuario);
            response.setMessage(ParametersApp.SUCCESSFUL.getReasonPhrase());
            response.setObject(String.valueOf(usuario.getIdUsuario()));
            response.setStatus(ParametersApp.SUCCESSFUL.value());
            return response;
        }
    }

    @PostMapping("/login")
    public GenericResponse<JwtDto> login(@Valid @RequestBody LoginUsuario loginUsuario, BindingResult bindingResult) {
        GenericResponse<JwtDto> response = new GenericResponse<>();
        if (bindingResult.hasErrors()) {
            response.setStatus(ParametersApp.SERVER_ERROR.value());
            return response;
        } else {
            try {
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(loginUsuario.getNombreUsuario(),
                                loginUsuario.getPassword()));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = jwtProvider.generateToken(authentication);
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(), userDetails.getAuthorities());
                response.setMessage(ParametersApp.SUCCESSFUL.getReasonPhrase());
                response.setObject(jwtDto);
                response.setStatus(ParametersApp.SUCCESSFUL.value());
                return response;
            } catch (Exception e) {
                response.setStatus(ParametersApp.SERVER_ERROR.value());
            }
            return response;
        }
    }

    @GetMapping(path = "findUser")
    public ResponseEntity<GenericResponse<Optional<Usuario>>> findNombre(@RequestParam String nombreUsuario) {
        return new ResponseEntity<GenericResponse<Optional<Usuario>>>(usuarioService.getNombreUsuario(nombreUsuario),
                HttpStatus.OK);
    }
}
