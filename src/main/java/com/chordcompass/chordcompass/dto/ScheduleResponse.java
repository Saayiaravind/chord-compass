package com.chordcompass.chordcompass.dto;

import com.chordcompass.chordcompass.Schedule;
import com.chordcompass.chordcompass.ScheduleStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class ScheduleResponse {
    private Integer id;
    private Integer enrollmentId;
    private String studentName;
    private String courseTitle;
    private LocalDate scheduledDate;
    private LocalTime scheduledTime;
    private Integer durationMinutes;
    private String meetLink;
    private ScheduleStatus status;
    private Boolean attended;
    private String classNotes;
    private String practiceNotes;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;

    public static ScheduleResponse fromEntity(Schedule schedule) {
        ScheduleResponse dto = new ScheduleResponse();
        dto.id = schedule.getId();
        if (schedule.getEnrollment() != null) {
            dto.enrollmentId = schedule.getEnrollment().getId();
            if (schedule.getEnrollment().getStudent() != null) {
                dto.studentName = schedule.getEnrollment().getStudent().getName();
            }
            if (schedule.getEnrollment().getCourse() != null) {
                dto.courseTitle = schedule.getEnrollment().getCourse().getTitle();
            }
        }
        dto.scheduledDate = schedule.getScheduledDate();
        dto.scheduledTime = schedule.getScheduledTime();
        dto.durationMinutes = schedule.getDurationMinutes();
        dto.meetLink = schedule.getMeetLink();
        dto.status = schedule.getStatus();
        dto.attended = schedule.getAttended();
        dto.classNotes = schedule.getClassNotes();
        dto.practiceNotes = schedule.getPracticeNotes();
        dto.createdAt = schedule.getCreatedAt();
        dto.completedAt = schedule.getCompletedAt();
        return dto;
    }

    // Getters
    public Integer getId() { return id; }
    public Integer getEnrollmentId() { return enrollmentId; }
    public String getStudentName() { return studentName; }
    public String getCourseTitle() { return courseTitle; }
    public LocalDate getScheduledDate() { return scheduledDate; }
    public LocalTime getScheduledTime() { return scheduledTime; }
    public Integer getDurationMinutes() { return durationMinutes; }
    public String getMeetLink() { return meetLink; }
    public ScheduleStatus getStatus() { return status; }
    public Boolean getAttended() { return attended; }
    public String getClassNotes() { return classNotes; }
    public String getPracticeNotes() { return practiceNotes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getCompletedAt() { return completedAt; }
}
