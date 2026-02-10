package com.chordcompass.chordcompass;

import com.chordcompass.chordcompass.dto.EnrollmentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "http://localhost:5173")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'INSTRUCTOR')")
    public ResponseEntity<List<EnrollmentResponse>> getAllEnrollments() {
        List<EnrollmentResponse> responses = enrollmentService.getAllEnrollments()
                .stream()
                .map(EnrollmentResponse::fromEntity)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'INSTRUCTOR', 'STUDENT')")
    public ResponseEntity<EnrollmentResponse> getEnrollmentById(@PathVariable Integer id) {
        return ResponseEntity.ok(EnrollmentResponse.fromEntity(enrollmentService.getEnrollmentById(id)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StudentEnrollment> createEnrollment(@RequestBody StudentEnrollment enrollment) {
        return ResponseEntity.ok(enrollmentService.createEnrollment(enrollment));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StudentEnrollment> updateEnrollment(@PathVariable Integer id, @RequestBody StudentEnrollment enrollment) {
        return ResponseEntity.ok(enrollmentService.updateEnrollment(id, enrollment));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEnrollment(@PathVariable Integer id) {
        enrollmentService.deleteEnrollment(id);
        return ResponseEntity.noContent().build();
    }
}
