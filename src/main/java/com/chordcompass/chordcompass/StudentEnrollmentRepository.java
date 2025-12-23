package com.chordcompass.chordcompass;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StudentEnrollmentRepository extends JpaRepository<StudentEnrollment, Integer> {
    
    // Find all enrollments for a specific student
    List<StudentEnrollment> findByStudentId(Integer studentId);
    
    // Find all enrollments for a specific course
    List<StudentEnrollment> findByCourseId(Integer courseId);
    
    // Find active enrollments for a student
    List<StudentEnrollment> findByStudentIdAndIsActive(Integer studentId, Boolean isActive);
}