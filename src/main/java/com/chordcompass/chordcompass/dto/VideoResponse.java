package com.chordcompass.chordcompass.dto;

import com.chordcompass.chordcompass.Video;
import java.time.LocalDateTime;

public class VideoResponse {
    private Integer id;
    private Integer studentId;
    private String studentName;
    private String title;
    private String youtubeUrl;
    private String description;
    private LocalDateTime createdAt;

    public static VideoResponse fromEntity(Video video) {
        VideoResponse dto = new VideoResponse();
        dto.id = video.getId();
        if (video.getStudent() != null) {
            dto.studentId = video.getStudent().getId();
            dto.studentName = video.getStudent().getName();
        }
        dto.title = video.getTitle();
        dto.youtubeUrl = video.getYoutubeUrl();
        dto.description = video.getDescription();
        dto.createdAt = video.getCreatedAt();
        return dto;
    }

    // Getters
    public Integer getId() { return id; }
    public Integer getStudentId() { return studentId; }
    public String getStudentName() { return studentName; }
    public String getTitle() { return title; }
    public String getYoutubeUrl() { return youtubeUrl; }
    public String getDescription() { return description; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
