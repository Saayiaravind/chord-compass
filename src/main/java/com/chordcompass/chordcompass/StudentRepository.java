package com.chordcompass.chordcompass;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    // That's it! Spring Boot auto-generates all basic CRUD methods
}