package com.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class Vacuna {
    @Id
	@Column(name = "ID_VACUNA", nullable = false)
	private Long idVacuna;

    @Column(name = "TIPO_VACUNA",length = 30)
	private String tipoVacuna;
    
    @Column(name = "FECHA_VACUNACION", length = 30)
    private String fechaVacunacion;

    @Column(name = "NUMERO_DOSIS", length = 30)
    private String numeroDosis;

    @JoinColumn(name = "ID_VACUNA", referencedColumnName = "ID_EMPLEADO")
	@OneToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.MERGE)
	private Empleado empleado;

    public Vacuna() {
    }
    
    public Vacuna(Long idVacuna, String tipoVacuna, String fechaVacunacion, String numeroDosis, Empleado empleado) {
        this.idVacuna = idVacuna;
        this.tipoVacuna = tipoVacuna;
        this.fechaVacunacion = fechaVacunacion;
        this.numeroDosis = numeroDosis;
        this.empleado = empleado;
    }

    public Long getIdVacuna() {
        return idVacuna;
    }

    public void setIdVacuna(Long idVacuna) {
        this.idVacuna = idVacuna;
    }

    public String getTipoVacuna() {
        return tipoVacuna;
    }

    public void setTipoVacuna(String tipoVacuna) {
        this.tipoVacuna = tipoVacuna;
    }

    public String getFechaVacunacion() {
        return fechaVacunacion;
    }

    public void setFechaVacunacion(String fechaVacunacion) {
        this.fechaVacunacion = fechaVacunacion;
    }

    public String getNumeroDosis() {
        return numeroDosis;
    }

    public void setNumeroDosis(String numeroDosis) {
        this.numeroDosis = numeroDosis;
    }

    public Empleado getEmpleado() {
        return empleado;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }

    
}
