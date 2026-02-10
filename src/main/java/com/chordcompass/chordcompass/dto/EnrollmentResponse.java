package com.chordcompass.chordcompass.dto;

import com.chordcompass.chordcompass.PaymentPlan;
import com.chordcompass.chordcompass.StudentEnrollment;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class EnrollmentResponse {
    private Integer id;
    private Integer studentId;
    private String studentName;
    private String studentEmail;
    private Integer courseId;
    private String courseTitle;
    private PaymentPlan paymentPlan;
    private BigDecimal priceAmount;
    private Integer sessionsRemaining;
    private LocalDate validityStartDate;
    private LocalDate validityEndDate;
    private Boolean autoRenew;
    private Boolean isActive;
    private LocalDateTime enrolledAt;
    private String notes;

    public static EnrollmentResponse fromEntity(StudentEnrollment enrollment) {
        EnrollmentResponse dto = new EnrollmentResponse();
        dto.id = enrollment.getId();
        dto.studentId = enrollment.getStudent() != null ? enrollment.getStudent().getId() : null;
        dto.studentName = enrollment.getStudent() != null ? enrollment.getStudent().getName() : null;
        dto.studentEmail = enrollment.getStudent() != null ? enrollment.getStudent().getEmail() : null;
        dto.courseId = enrollment.getCourse() != null ? enrollment.getCourse().getId() : null;
        dto.courseTitle = enrollment.getCourse() != null ? enrollment.getCourse().getTitle() : null;
        dto.paymentPlan = enrollment.getPaymentPlan();
        dto.priceAmount = enrollment.getPriceAmount();
        dto.sessionsRemaining = enrollment.getSessionsRemaining();
        dto.validityStartDate = enrollment.getValidityStartDate();
        dto.validityEndDate = enrollment.getValidityEndDate();
        dto.autoRenew = enrollment.getAutoRenew();
        dto.isActive = enrollment.getIsActive();
        dto.enrolledAt = enrollment.getEnrolledAt();
        dto.notes = enrollment.getNotes();
        return dto;
    }

    // Getters
    public Integer getId() { return id; }
    public Integer getStudentId() { return studentId; }
    public String getStudentName() { return studentName; }
    public String getStudentEmail() { return studentEmail; }
    public Integer getCourseId() { return courseId; }
    public String getCourseTitle() { return courseTitle; }
    public PaymentPlan getPaymentPlan() { return paymentPlan; }
    public BigDecimal getPriceAmount() { return priceAmount; }
    public Integer getSessionsRemaining() { return sessionsRemaining; }
    public LocalDate getValidityStartDate() { return validityStartDate; }
    public LocalDate getValidityEndDate() { return validityEndDate; }
    public Boolean getAutoRenew() { return autoRenew; }
    public Boolean getIsActive() { return isActive; }
    public LocalDateTime getEnrolledAt() { return enrolledAt; }
    public String getNotes() { return notes; }
}
