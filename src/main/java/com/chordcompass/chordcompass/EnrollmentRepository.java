package com.chordcompass.chordcompass;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<StudentEnrollment, Integer> {
    List<StudentEnrollment> findByStudentId(Integer studentId);
    List<StudentEnrollment> findByCourseId(Integer courseId);
    List<StudentEnrollment> findByIsActive(Boolean isActive);
}
