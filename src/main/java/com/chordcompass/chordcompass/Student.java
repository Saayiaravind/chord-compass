package com.chordcompass.chordcompass;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(length = 15)
    private String phone;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // Default constructor (required by JPA)
    public Student() {
    }

    // Constructor for creating new students
    public Student(String name, String email, String phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    // Getters
    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // Setters (no setter for id - it's auto-generated)
    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}