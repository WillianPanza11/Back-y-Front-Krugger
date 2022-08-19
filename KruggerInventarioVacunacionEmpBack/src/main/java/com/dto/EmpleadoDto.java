package com.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class EmpleadoDto {
    private Long idEmpleado; 
    private String estadoVacunacion; 
    private Double salario; 
    private String tipo;
    private String estado;
}
