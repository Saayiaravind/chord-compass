package com.chordcompass.chordcompass;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    public List<StudentEnrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public StudentEnrollment getEnrollmentById(Integer id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found with id: " + id));
    }

    public StudentEnrollment createEnrollment(StudentEnrollment enrollment) {
        // Validate enrollment has student and course
        if (enrollment.getStudent() == null || enrollment.getCourse() == null) {
            throw new RuntimeException("Enrollment must have both student and course");
        }
        return enrollmentRepository.save(enrollment);
    }

    public StudentEnrollment updateEnrollment(Integer id, StudentEnrollment enrollmentDetails) {
        StudentEnrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found with id: " + id));
        
        enrollment.setPaymentPlan(enrollmentDetails.getPaymentPlan());
        enrollment.setPriceAmount(enrollmentDetails.getPriceAmount());
        enrollment.setSessionsRemaining(enrollmentDetails.getSessionsRemaining());
        enrollment.setIsActive(enrollmentDetails.getIsActive());
        
        return enrollmentRepository.save(enrollment);
    }

    public void deleteEnrollment(Integer id) {
        if (!enrollmentRepository.existsById(id)) {
            throw new RuntimeException("Enrollment not found with id: " + id);
        }
        enrollmentRepository.deleteById(id);
    }
}
