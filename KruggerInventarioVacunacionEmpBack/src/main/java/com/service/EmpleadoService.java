package com.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dto.EmpleadoDto;
import com.dto.EmpleadoListAllDateDto;
import com.model.Empleado;
import com.model.Usuario;
import com.repository.EmpleadoRespository;
import com.repository.UsuarioRepository;
import com.util.GenericResponse;
import com.util.ParametersApp;

@Service
public class EmpleadoService {

    private static final Logger log = LoggerFactory.getLogger(EmpleadoService.class);

    @Autowired
    EmpleadoRespository empleadoRespository;

    @Autowired
    UsuarioRepository usuarioRepository;

    public GenericResponse<String> saveEmpleado(EmpleadoDto empleadoDto) {
        GenericResponse<String> response = new GenericResponse<>();
        try {
            Empleado empleado = new Empleado();
            empleado.setIdEmpleado(empleadoDto.getIdEmpleado());
            empleado.setEstadoVacunacion(empleadoDto.getEstadoVacunacion());
            empleado.setSalario(empleadoDto.getSalario());
            empleado.setTipo(empleadoDto.getTipo());
            empleado.setEstado("a");
            empleadoRespository.save(empleado);
            response.setMessage(ParametersApp.SUCCESSFUL.getReasonPhrase());
            response.setObject("guardado correctamente");
            response.setStatus(ParametersApp.SUCCESSFUL.value());
        } catch (Exception e) {
            log.error("ERROR", e);
            response.setStatus(ParametersApp.SERVER_ERROR.value());
        }
        return response;
    }

    public GenericResponse<List<EmpleadoListAllDateDto>> listAllEmpleadosDate() {
        GenericResponse<List<EmpleadoListAllDateDto>> response = new GenericResponse<>();
        try {
            List<EmpleadoListAllDateDto> dto = new ArrayList<>();
            for (EmpleadoListAllDateDto empleados : empleadoRespository.listAllDatesEmpleados()) {
                if (empleados != null) {
                    EmpleadoListAllDateDto empleadoDto = new EmpleadoListAllDateDto();
                    empleadoDto.setIdUsuario(empleados.getIdUsuario());
                    empleadoDto.setApellidos(empleados.getApellidos());
                    empleadoDto.setCedula(empleados.getCedula());
                    empleadoDto.setDireccion(empleados.getDireccion());
                    empleadoDto.setEmail(empleados.getEmail());
                    empleadoDto.setFechaNacimiento(empleados.getFechaNacimiento());
                    empleadoDto.setNombreUsuario(empleados.getNombreUsuario());
                    empleadoDto.setPassword(empleados.getPassword());
                    empleadoDto.setNombres(empleados.getNombres());
                    empleadoDto.setIdEmpleado(empleados.getIdEmpleado());
                    empleadoDto.setEstadoVacunacion(empleados.getEstadoVacunacion());
                    empleadoDto.setSalario(empleados.getSalario());
                    empleadoDto.setTipo(empleados.getTipo());
                    empleadoDto.setEstado(empleados.getEstado());
                    dto.add(empleadoDto);
                    response.setMessage(ParametersApp.SUCCESSFUL.getReasonPhrase());
                    response.setObject(dto);
                    response.setStatus(ParametersApp.SUCCESSFUL.value());
                } else {
                    response.setStatus(ParametersApp.SERVER_ERROR.value());
                }
            }
        } catch (Exception e) {
            log.error("ERROR", e);
            response.setStatus(ParametersApp.SERVER_ERROR.value());
        }
        return response;
    }

    // poner a un empleado inactivo
    public GenericResponse<String> putInactivoEmpleado(int IdEmpleado) {
        GenericResponse<String> response = new GenericResponse<>();
        try {
            if (empleadoRespository.findById((long) IdEmpleado) != null) {
                empleadoRespository.putEstadoInactivoEmpleado(IdEmpleado);
                response.setMessage(ParametersApp.SUCCESSFUL.getReasonPhrase());
                response.setObject("EMPLEADO ELIMINADO");
                response.setStatus(ParametersApp.SUCCESSFUL.value());
            } else {
                response.setMessage("NO EXISTE EL EMPLEADO");
                response.setObject("NO EXISTE EL EMPLEADO");
                response.setStatus(ParametersApp.PROCESS_NOT_COMPLETED.value());
            }

        } catch (Exception e) {
            response.setStatus(ParametersApp.SERVER_ERROR.value());
            log.error("ERROR", e);
        }
        return response;
    }

    public GenericResponse<String> actualizarDatosEmpleado(EmpleadoListAllDateDto empleadoDto) {
        GenericResponse<String> response = new GenericResponse<>();
        try {
            Usuario usuario = usuarioRepository.findById((long) empleadoDto.getIdEmpleado()).get();
            if (usuario != null) {
                Empleado empleado = empleadoRespository.findById((long) empleadoDto.getIdEmpleado()).get();
                if (empleado != null) {
                    try {
                        // if (usuarioRepository.existsByCedula(empleadoDto.getCedula())) {
                        //     response.setMessage("CEDULA YA EXISTE");
                        //     response.setObject("CEDULA YA EXISTE");
                        //     response.setStatus(ParametersApp.PROCESS_NOT_COMPLETED.value());
                        //     return response; 
                        // }

                        // if (usuarioRepository.existsByEmail(empleadoDto.getEmail())) {
                        //     response.setMessage("EMAIL YA EXISTE");
                        //     response.setObject("EMAIL YA EXISTE");
                        //     response.setStatus(ParametersApp.PROCESS_NOT_COMPLETED.value());
                        //     return response; 
                        // }

                        // if(usuarioRepository.existsByNombreUsuario(empleadoDto.getNombreUsuario())){
                        //     response.setMessage("NOMBRE DE USUARIO YA EXISTE");
                        //     response.setObject("NOMBRE DE USUARIO YA EXISTE");
                        //     response.setStatus(ParametersApp.PROCESS_NOT_COMPLETED.value());
                        //     return response; 
                        // }

                        
                        usuario.setIdUsuario(empleadoDto.getIdUsuario());
                        usuario.setCedula(empleadoDto.getCedula());
                        usuario.setNombres(empleadoDto.getNombres());
                        usuario.setApellidos(empleadoDto.getApellidos());
                        usuario.setDireccion(empleadoDto.getDireccion());
                        usuario.setEmail(empleadoDto.getEmail());
                        usuario.setFechaNacimiento(empleadoDto.getFechaNacimiento());
                        usuario.setNombreUsuario(empleadoDto.getNombreUsuario());
                        usuario.setPassword(empleadoDto.getPassword());
                        empleado.setIdEmpleado((long) empleadoDto.getIdEmpleado());
                        empleado.setEstadoVacunacion(empleadoDto.getEstadoVacunacion());
                        empleado.setSalario(empleadoDto.getSalario());
                        empleado.setTipo(empleadoDto.getTipo());
                        empleado.setEstado(empleadoDto.getEstado());
                        empleadoRespository.save(empleado);
                        // usuarioRepository.save(usuario);
                        response.setMessage(ParametersApp.SUCCESSFUL.getReasonPhrase());
                        response.setObject(" EMPLEADO ACTUALIZADO");
                        response.setStatus(ParametersApp.SUCCESSFUL.value());

                    } catch (Exception e) {
                        log.error("ERROR AL EDITAR EMPLEADO ");
                        response.setMessage("ERROR AL EDITAR EMPLEADO ");
                        response.setStatus(ParametersApp.SERVER_ERROR.value());
                    }
                }
            }
        } catch (Exception e) {
            log.error("ERROR AL EDITAR EMPLEADO ");
            e.printStackTrace(System.out);
            response.setStatus(ParametersApp.SERVER_ERROR.value());
        }
        return response;
    }

    public GenericResponse<List<EmpleadoListAllDateDto>> getDataDeUnEmpleado(String nombreuser) {
        GenericResponse<List<EmpleadoListAllDateDto>> response = new GenericResponse<>();
        try {
            if(nombreuser == null || nombreuser.isEmpty()){
                response.setMessage("NO EXISTE EL EMPLEADO");
                response.setStatus(ParametersApp.PROCESS_NOT_COMPLETED.value());
                return response;
            }

            List<EmpleadoListAllDateDto> usuario = empleadoRespository.getDatosDeUnEmpleado(nombreuser);
            if (usuario != null) {
                response.setMessage(ParametersApp.SUCCESSFUL.getReasonPhrase());
                response.setObject(usuario);
                response.setStatus(ParametersApp.SUCCESSFUL.value());
            } else {
                response.setMessage("NO EXISTE EL EMPLEADO");
                response.setStatus(ParametersApp.SERVER_ERROR.value());
            }
        } catch (Exception e) {
            log.error("ERROR", e);
            response.setStatus(ParametersApp.SERVER_ERROR.value());
        }
        return response;
    }

    

}
