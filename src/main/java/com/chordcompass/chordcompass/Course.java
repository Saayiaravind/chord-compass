package com.chordcompass.chordcompass;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="courses")
public class Course {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name="session_duration_minutes")
    private Integer sessionDurationMinutes;

    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt;
    
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<StudentEnrollment> enrollments = new ArrayList<>();
    //Default constructor required by JPA
    public Course(){
        
    }

    //Constructor for creating new courses
    public Course(String title, String description, Integer sessionDurationMinutes) {
        this.title = title;
        this.description = description;
        this.sessionDurationMinutes = sessionDurationMinutes;   
    }

    //Getters and Setters
    public Integer getId() {
        return id;
    }

    // No set ID - database generates it

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public List<StudentEnrollment> getEnrollments() {
        return enrollments;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public Integer getSessionInDurationMinutes() {
        return sessionDurationMinutes;
    }

    public void setSessionDurationMinutes(Integer sessionDurationMinutes) {
        this.sessionDurationMinutes = sessionDurationMinutes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void addEnrollment(StudentEnrollment enrollment) {
        enrollments.add(enrollment);
        enrollment.setCourse(this);
    }

    public void removeEnrollment(StudentEnrollment enrollment) {
        enrollments.remove(enrollment);
        enrollment.setCourse(null);
    }

    // No setCreatedAt() - Database generates it
}
