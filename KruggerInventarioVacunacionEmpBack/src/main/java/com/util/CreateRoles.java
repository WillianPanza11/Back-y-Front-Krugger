package com.util;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.model.Rol;
import com.model.Usuario;
import com.security.dto.NuevoUsuario;
import com.security.enums.RolNombre;
import com.security.service.UsuarioService;
import com.service.RolService;

@Component
public class CreateRoles implements CommandLineRunner {
    @Autowired
    RolService rolService;

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    PasswordEncoder passwordEncoder;

    /**
     * MUY IMPORTANTE: ESTA CLASE SÓLO SE EJECUTARÁ UNA VEZ PARA CREAR LOS ROLES.
     * UNA VEZ CREADOS SE DEBERÁ ELIMINAR O BIEN COMENTAR EL CÓDIGO
     */
    @Override
    public void run(String... args) throws Exception {

        // Rol rolAdmin = new Rol(RolNombre.ROLE_ADMIN);
        // Rol rolUser = new Rol(RolNombre.ROLE_EMPLEADO);
        // rolService.save(rolAdmin);
        // rolService.save(rolUser);

        // NuevoUsuario nuevoUsuario = new NuevoUsuario();
        // nuevoUsuario.setCedula("admin");
        // nuevoUsuario.setNombres("admin");
        // nuevoUsuario.setApellidos("admin");
        // nuevoUsuario.setNombreUsuario("admin");
        // nuevoUsuario.setEmail("admin@admin.com");

        // Usuario usuario = new Usuario(nuevoUsuario.getCedula(), nuevoUsuario.getNombres(),
        //         nuevoUsuario.getApellidos(), nuevoUsuario.getEmail(), nuevoUsuario.getCedula(),
        //         passwordEncoder.encode(nuevoUsuario.getCedula()));
        // Set<Rol> roles = new HashSet<>();
        // roles.add(rolService.getByRolNombre(RolNombre.ROLE_ADMIN).get());
        // usuario.setRoles(roles);
        // usuarioService.save(usuario);
    }
}
