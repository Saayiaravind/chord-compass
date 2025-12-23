package com.chordcompass.chordcompass;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name = "student_enrollments")
public class StudentEnrollment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnore
    private Student student;
    
    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_plan", nullable = false, length = 50)
    private PaymentPlan paymentPlan;
    
    @Column(name = "price_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal priceAmount;
    
    @Column(name = "sessions_remaining")
    private Integer sessionsRemaining;
    
    @Column(name = "validity_start_date")
    private LocalDate validityStartDate;
    
    @Column(name = "validity_end_date")
    private LocalDate validityEndDate;
    
    @Column(name = "auto_renew")
    private Boolean autoRenew;
    
    @Column(name = "is_active")
    private Boolean isActive;
    
    @Column(name = "enrolled_at", updatable = false, insertable = false)
    private LocalDateTime enrolledAt;
    
    @Column(name = "updated_at", insertable = false)
    private LocalDateTime updatedAt;
    
    @Column(columnDefinition = "TEXT")
    private String notes;

    @OneToMany(mappedBy = "enrollment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Schedule> schedules = new ArrayList<>();
    
    // Default constructor (required by JPA)
    public StudentEnrollment() {
    }
    
    // Constructor for creating new enrollments
    public StudentEnrollment(Student student, Course course, PaymentPlan paymentPlan, 
                            BigDecimal priceAmount) {
        this.student = student;
        this.course = course;
        this.paymentPlan = paymentPlan;
        this.priceAmount = priceAmount;
    }
    
    // Getters and Setters
    public Integer getId() {
        return id;
    }
    
    // No setId() - database generates it
    
    public Student getStudent() {
        return student;
    }

    public List<Schedule> getSchedules() {
        return schedules;
    }


    public void setStudent(Student student) {
        this.student = student;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    
    public PaymentPlan getPaymentPlan() {
        return paymentPlan;
    }
    
    public void setPaymentPlan(PaymentPlan paymentPlan) {
        this.paymentPlan = paymentPlan;
    }
    
    public BigDecimal getPriceAmount() {
        return priceAmount;
    }
    
    public void setPriceAmount(BigDecimal priceAmount) {
        this.priceAmount = priceAmount;
    }
    
    public Integer getSessionsRemaining() {
        return sessionsRemaining;
    }
    
    public void setSessionsRemaining(Integer sessionsRemaining) {
        this.sessionsRemaining = sessionsRemaining;
    }
    
    public LocalDate getValidityStartDate() {
        return validityStartDate;
    }
    
    public void setValidityStartDate(LocalDate validityStartDate) {
        this.validityStartDate = validityStartDate;
    }
    
    public LocalDate getValidityEndDate() {
        return validityEndDate;
    }
    
    public void setValidityEndDate(LocalDate validityEndDate) {
        this.validityEndDate = validityEndDate;
    }
    
    public Boolean getAutoRenew() {
        return autoRenew;
    }
    
    public void setAutoRenew(Boolean autoRenew) {
        this.autoRenew = autoRenew;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
    public LocalDateTime getEnrolledAt() {
        return enrolledAt;
    }
    
    // No setEnrolledAt() - database generates it
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    // No setUpdatedAt() - database generates it
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }

    public void addSchedule(Schedule schedule) {
        schedules.add(schedule);
        schedule.setEnrollment(this);
    }

    public void removeSchedule(Schedule schedule) {
        schedules.remove(schedule);
        schedule.setEnrollment(null);
    }
}