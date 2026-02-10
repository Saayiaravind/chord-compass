package com.chordcompass.chordcompass;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    public Video getVideoById(Integer id) {
        return videoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Video not found with id: " + id));
    }

    public List<Video> getVideosByStudentId(Integer studentId) {
        return videoRepository.findByStudentId(studentId);
    }

    public Video createVideo(Video video) {
        if (video.getStudent() == null) {
            throw new RuntimeException("Video must be assigned to a student");
        }
        if (video.getYoutubeUrl() == null || video.getYoutubeUrl().isBlank()) {
            throw new RuntimeException("Video must have a YouTube URL");
        }
        if (video.getTitle() == null || video.getTitle().isBlank()) {
            throw new RuntimeException("Video must have a title");
        }
        return videoRepository.save(video);
    }

    public Video updateVideo(Integer id, Video videoDetails) {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Video not found with id: " + id));

        video.setTitle(videoDetails.getTitle());
        video.setYoutubeUrl(videoDetails.getYoutubeUrl());
        video.setDescription(videoDetails.getDescription());

        return videoRepository.save(video);
    }

    public void deleteVideo(Integer id) {
        if (!videoRepository.existsById(id)) {
            throw new RuntimeException("Video not found with id: " + id);
        }
        videoRepository.deleteById(id);
    }
}
