package com.chordcompass.chordcompass;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;

@Entity
@Table(name = "schedules")
public class Schedule {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "enrollment_id", nullable = false)
    @JsonIgnore
    private StudentEnrollment enrollment;
    
    @Column(name = "scheduled_date", nullable = false)
    private LocalDate scheduledDate;
    
    @Column(name = "scheduled_time", nullable = false)
    private LocalTime scheduledTime;
    
    @Column(name = "duration_minutes")
    private Integer durationMinutes;
    
    @Column(name = "meet_link", length = 255)
    private String meetLink;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private ScheduleStatus status;
    
    private Boolean attended;
    
    @Column(name = "class_notes", columnDefinition = "TEXT")
    private String classNotes;
    
    @Column(name = "practice_notes", columnDefinition = "TEXT")
    private String practiceNotes;
    
    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", insertable = false)
    private LocalDateTime updatedAt;
    
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
    
    // Default constructor (required by JPA)
    public Schedule() {
    }
    
    // Constructor for creating new schedules
    public Schedule(StudentEnrollment enrollment, LocalDate scheduledDate, LocalTime scheduledTime) {
        this.enrollment = enrollment;
        this.scheduledDate = scheduledDate;
        this.scheduledTime = scheduledTime;
        this.status = ScheduleStatus.SCHEDULED;  // Default status
        this.durationMinutes = 45;  // Default 45 minutes
    }
    
    // Getters and Setters
    public Integer getId() {
        return id;
    }
    
    public StudentEnrollment getEnrollment() {
        return enrollment;
    }
    
    public void setEnrollment(StudentEnrollment enrollment) {
        this.enrollment = enrollment;
    }
    
    public LocalDate getScheduledDate() {
        return scheduledDate;
    }
    
    public void setScheduledDate(LocalDate scheduledDate) {
        this.scheduledDate = scheduledDate;
    }
    
    public LocalTime getScheduledTime() {
        return scheduledTime;
    }
    
    public void setScheduledTime(LocalTime scheduledTime) {
        this.scheduledTime = scheduledTime;
    }
    
    public Integer getDurationMinutes() {
        return durationMinutes;
    }
    
    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }
    
    public String getMeetLink() {
        return meetLink;
    }
    
    public void setMeetLink(String meetLink) {
        this.meetLink = meetLink;
    }
    
    public ScheduleStatus getStatus() {
        return status;
    }
    
    public void setStatus(ScheduleStatus status) {
        this.status = status;
    }
    
    public Boolean getAttended() {
        return attended;
    }
    
    public void setAttended(Boolean attended) {
        this.attended = attended;
    }
    
    public String getClassNotes() {
        return classNotes;
    }
    
    public void setClassNotes(String classNotes) {
        this.classNotes = classNotes;
    }
    
    public String getPracticeNotes() {
        return practiceNotes;
    }
    
    public void setPracticeNotes(String practiceNotes) {
        this.practiceNotes = practiceNotes;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public LocalDateTime getCompletedAt() {
        return completedAt;
    }
    
    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }
}
