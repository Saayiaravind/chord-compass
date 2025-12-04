package com.chordcompass.chordcompass;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Business logic: Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Business logic: Get student by ID
    public Optional<Student> getStudentById(Integer id) {
        return studentRepository.findById(id);
    }

    // Business logic: Create new student with validation
    public Student createStudent(Student student) {
        // Business rule: Check if email already exists
        if (studentRepository.findByEmail(student.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists: " + student.getEmail());
        }
        
        // Business rule: Validate email format (simple check)
        if (!student.getEmail().contains("@")) {
            throw new RuntimeException("Invalid email format");
        }
        
        // Save to database
        return studentRepository.save(student);
    }

    // Business logic: Update student
    public Student updateStudent(Integer id, Student studentDetails) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        
        // Business rule: If email is changing, check if new email already exists
        if (!student.getEmail().equals(studentDetails.getEmail())) {
            if (studentRepository.findByEmail(studentDetails.getEmail()).isPresent()) {
                throw new RuntimeException("Email already exists: " + studentDetails.getEmail());
            }
        }
        
        // Update fields
        student.setName(studentDetails.getName());
        student.setEmail(studentDetails.getEmail());
        student.setPhone(studentDetails.getPhone());
        
        return studentRepository.save(student);
    }

    // Business logic: Delete student
    public void deleteStudent(Integer id) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }

    
}