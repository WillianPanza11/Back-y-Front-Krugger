package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.model.Vacuna;

public interface VacunaRepository extends JpaRepository<Vacuna, Long> {
    
}
