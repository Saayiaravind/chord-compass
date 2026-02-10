package com.chordcompass.chordcompass;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "videos")
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Student student;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(name = "youtube_url", nullable = false, length = 500)
    private String youtubeUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", insertable = false)
    private LocalDateTime updatedAt;

    // Default constructor (required by JPA)
    public Video() {
    }

    // Constructor for creating new videos
    public Video(Student student, String title, String youtubeUrl, String description) {
        this.student = student;
        this.title = title;
        this.youtubeUrl = youtubeUrl;
        this.description = description;
    }

    // Getters
    public Integer getId() { return id; }
    public Student getStudent() { return student; }
    public String getTitle() { return title; }
    public String getYoutubeUrl() { return youtubeUrl; }
    public String getDescription() { return description; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    // Setters (no setter for id - it's auto-generated)
    public void setStudent(Student student) { this.student = student; }
    public void setTitle(String title) { this.title = title; }
    public void setYoutubeUrl(String youtubeUrl) { this.youtubeUrl = youtubeUrl; }
    public void setDescription(String description) { this.description = description; }
}
