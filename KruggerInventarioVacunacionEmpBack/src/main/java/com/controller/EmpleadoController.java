package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dto.EmpleadoDto;
import com.dto.EmpleadoListAllDateDto;
import com.service.EmpleadoService;
import com.util.GenericResponse;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/empleado")
@Tag(name = "MenuWS", description = "Control y mantenimiento de empleados")
public class EmpleadoController {
    
    @Autowired
    private EmpleadoService empleadoService;

    @PostMapping(path = "save")
    public ResponseEntity<GenericResponse<String>> saveEmpleado(@RequestBody EmpleadoDto  empleadoDto){
        return new ResponseEntity<GenericResponse<String>> (empleadoService.saveEmpleado(empleadoDto), HttpStatus.OK);
    }

    @GetMapping(path = "listarEmpleados")
    public ResponseEntity<GenericResponse<List<EmpleadoListAllDateDto>>> listarEmpleadosAllDates(){
		return new ResponseEntity<GenericResponse<List<EmpleadoListAllDateDto>>>(empleadoService.listAllEmpleadosDate(), HttpStatus.OK);
	}

    @PutMapping(path = "deletefamiliares")
    public ResponseEntity<GenericResponse<String>> deleteEmpleado(@RequestParam("IdEmpleado") int IdEmpleado) {
        return new ResponseEntity<GenericResponse<String>>(empleadoService.putInactivoEmpleado(IdEmpleado), HttpStatus.OK);
    } 

    @PutMapping(path = "updateDatosEmpleado")
    public ResponseEntity<GenericResponse<String>> updateDataEmpleado(@RequestBody EmpleadoListAllDateDto empleadoDTO){
        return new ResponseEntity<GenericResponse<String>>(empleadoService.actualizarDatosEmpleado(empleadoDTO), HttpStatus.OK);
    }

    @GetMapping(path = "datosUnEmpleado")
    public ResponseEntity<GenericResponse<List<EmpleadoListAllDateDto>>> datosUnEmpleado(@RequestParam("username") String username){
        return new ResponseEntity<GenericResponse<List<EmpleadoListAllDateDto>>>(empleadoService.getDataDeUnEmpleado(username), HttpStatus.OK);
    }

}
