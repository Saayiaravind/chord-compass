package com.chordcompass.chordcompass;

import com.chordcompass.chordcompass.dto.VideoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/videos")
@CrossOrigin(origins = "http://localhost:5173")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @Autowired
    private StudentRepository studentRepository;

    // Admin: Get all videos
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'INSTRUCTOR')")
    public List<VideoResponse> getAllVideos() {
        return videoService.getAllVideos()
                .stream()
                .map(VideoResponse::fromEntity)
                .toList();
    }

    // Student: Get my own videos (must be before /{id} to avoid path conflict)
    @GetMapping("/my-videos")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<VideoResponse>> getMyVideos() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student profile not found for: " + email));
        List<VideoResponse> responses = videoService.getVideosByStudentId(student.getId())
                .stream()
                .map(VideoResponse::fromEntity)
                .toList();
        return ResponseEntity.ok(responses);
    }

    // Admin: Get video by id
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'INSTRUCTOR', 'STUDENT')")
    public ResponseEntity<VideoResponse> getVideoById(@PathVariable Integer id) {
        return ResponseEntity.ok(VideoResponse.fromEntity(videoService.getVideoById(id)));
    }

    // Admin: Get videos by student id
    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'INSTRUCTOR')")
    public ResponseEntity<List<VideoResponse>> getVideosByStudent(@PathVariable Integer studentId) {
        List<VideoResponse> responses = videoService.getVideosByStudentId(studentId)
                .stream()
                .map(VideoResponse::fromEntity)
                .toList();
        return ResponseEntity.ok(responses);
    }

    // Admin: Create video
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Video createVideo(@RequestBody Video video) {
        return videoService.createVideo(video);
    }

    // Admin: Update video
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Video> updateVideo(@PathVariable Integer id, @RequestBody Video video) {
        return ResponseEntity.ok(videoService.updateVideo(id, video));
    }

    // Admin: Delete video
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteVideo(@PathVariable Integer id) {
        videoService.deleteVideo(id);
        return ResponseEntity.noContent().build();
    }
}
