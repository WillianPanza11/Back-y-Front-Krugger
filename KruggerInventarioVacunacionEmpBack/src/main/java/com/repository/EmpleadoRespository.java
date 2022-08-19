package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.dto.EmpleadoListAllDateDto;
import com.model.Empleado;

public interface EmpleadoRespository extends JpaRepository<Empleado, Long>{
    
    @Transactional(value = "transactionManager", propagation = Propagation.REQUIRES_NEW, rollbackFor = {Throwable.class})
    @Query(nativeQuery = true)
    List<EmpleadoListAllDateDto> listAllDatesEmpleados();

    @Transactional(value = "transactionManager", propagation = Propagation.REQUIRES_NEW, rollbackFor = {Throwable.class})
    @Query(nativeQuery = true)
    List<EmpleadoListAllDateDto> getDatosDeUnEmpleado(String username);

    //Eliminar un empleado por id cambiando a esta i(inactivo)
    @Transactional(value = "transactionManager", propagation = Propagation.REQUIRES_NEW, rollbackFor = {Throwable.class})
    @Modifying
    @Query(value = "UPDATE empleado"
    +" SET estado = 'i'"
    +" WHERE id_empleado = :IdEmpleado", nativeQuery = true)
    void putEstadoInactivoEmpleado(int IdEmpleado);
}
