package com.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedNativeQueries;
import javax.persistence.NamedNativeQuery;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.SqlResultSetMappings;

import com.dto.EmpleadoListAllDateDto;

@NamedNativeQueries({
		@NamedNativeQuery(name = "Empleado.listAllDatesEmpleados", query = "", resultSetMapping = "listAllDatesEmpleados"),
		@NamedNativeQuery(name = "Empleado.getDatosDeUnEmpleado", query = "", resultSetMapping = "getDatosDeUnEmpleado"),
})

@SqlResultSetMappings({
		@SqlResultSetMapping(name = "listAllDatesEmpleados", classes = {
				@ConstructorResult(targetClass = EmpleadoListAllDateDto.class, columns = {
						@ColumnResult(name = "idUsuario", type = Long.class),
						@ColumnResult(name = "apellidos", type = String.class),
						@ColumnResult(name = "cedula", type = String.class),
						@ColumnResult(name = "direccion", type = String.class),
						@ColumnResult(name = "email", type = String.class),
						@ColumnResult(name = "fechaNacimiento", type = Date.class),
						@ColumnResult(name = "nombreUsuario", type = String.class),
						@ColumnResult(name = "password", type = String.class),
						@ColumnResult(name = "nombres", type = String.class),
						@ColumnResult(name = "idEmpleado", type = Integer.class),
						@ColumnResult(name = "estadoVacunacion", type = String.class),
						@ColumnResult(name = "salario", type = Double.class),
						@ColumnResult(name = "tipo", type = String.class),
						@ColumnResult(name = "estado", type = String.class),
				})
		}),

		@SqlResultSetMapping(name = "getDatosDeUnEmpleado", classes = {
				@ConstructorResult(targetClass = EmpleadoListAllDateDto.class, columns = {
						@ColumnResult(name = "idUsuario", type = Long.class),
						@ColumnResult(name = "apellidos", type = String.class),
						@ColumnResult(name = "cedula", type = String.class),
						@ColumnResult(name = "direccion", type = String.class),
						@ColumnResult(name = "email", type = String.class),
						@ColumnResult(name = "fechaNacimiento", type = Date.class),
						@ColumnResult(name = "nombreUsuario", type = String.class),
						@ColumnResult(name = "password", type = String.class),
						@ColumnResult(name = "nombres", type = String.class),
						@ColumnResult(name = "idEmpleado", type = Integer.class),
						@ColumnResult(name = "estadoVacunacion", type = String.class),
						@ColumnResult(name = "salario", type = Double.class),
						@ColumnResult(name = "tipo", type = String.class),
						@ColumnResult(name = "estado", type = String.class),
				})
		})
})

@Entity
public class Empleado {
	@Id
	@Column(name = "ID_EMPLEADO", nullable = false)
	private Long idEmpleado;

	@Column(name = "SALARIO", precision = 14, scale = 2)
	private Double salario;

	@Column(name = "TIPO", length = 30)
	private String tipo;

	@Column(name = "ESTADO_VACUNACION", length = 11)
	private String estadoVacunacion;

	@Column(name = "ESTADO", length = 1)
	private String estado;

	@JoinColumn(name = "ID_EMPLEADO", referencedColumnName = "ID_USUARIO")
	@OneToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.MERGE)
	private Usuario usuario;

	@OneToOne(cascade = CascadeType.PERSIST, mappedBy = "empleado", fetch = FetchType.LAZY)
	@PrimaryKeyJoinColumn
	private Vacuna vacuna;

	public Empleado() {
	}

	public Empleado(Long idEmpleado, Double salario, String tipo, String estadoVacunacion, String estado,
			Usuario usuario) {
		this.idEmpleado = idEmpleado;
		this.salario = salario;
		this.tipo = tipo;
		this.estadoVacunacion = estadoVacunacion;
		this.estado = estado;
		this.usuario = usuario;
	}

	public Long getIdEmpleado() {
		return idEmpleado;
	}

	public void setIdEmpleado(Long idEmpleado) {
		this.idEmpleado = idEmpleado;
	}

	public Double getSalario() {
		return salario;
	}

	public void setSalario(Double salario) {
		this.salario = salario;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getEstadoVacunacion() {
		return estadoVacunacion;
	}

	public void setEstadoVacunacion(String estadoVacunacion) {
		this.estadoVacunacion = estadoVacunacion;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

}
