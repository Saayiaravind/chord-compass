package com.chordcompass.chordcompass;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

     // GET /students - Get all students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

     // GET /students/{id} - Get student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Integer id) {
        Optional<Student> student = studentRepository.findById(id);
        
        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST /students - Create new student
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        try {
            Student savedStudent = studentRepository.save(student);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedStudent);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // PUT /students/{id} - Update student
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Integer id, @RequestBody Student studentDetails) {
        Optional<Student> studentOptional = studentRepository.findById(id);
        
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            student.setName(studentDetails.getName());
            student.setEmail(studentDetails.getEmail());
            student.setPhone(studentDetails.getPhone());
            
            Student updatedStudent = studentRepository.save(student);
            return ResponseEntity.ok(updatedStudent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /students/{id} - Delete student
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Integer id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}