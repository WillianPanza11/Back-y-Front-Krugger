package com.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class EmpleadoListAllDateDto {
    
    private Long idUsuario;
    private String apellidos; 
    private String cedula;  
    private String direccion; 
    private String email; 
    private Date fechaNacimiento;
    private String nombreUsuario; 
    private String password;
    private String nombres; 
    private int idEmpleado; 
    private String estadoVacunacion;
    private Double salario;
    private String tipo;
    private String estado; 
}
