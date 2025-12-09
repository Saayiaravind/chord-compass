package com.chordcompass.chordcompass;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    // BCrypt encoder for password hashing
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    // 1. Register new user
    public User register(String email, String password, String role) {
        // Business rule: Check if email already exists
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered: " + email);
        }
        
        // Business rule: Validate email format
        if (!email.contains("@")) {
            throw new RuntimeException("Invalid email format");
        }
        
        // Business rule: Password must be at least 6 characters
        if (password.length() < 6) {
            throw new RuntimeException("Password must be at least 6 characters");
        }
        
        // Business rule: Role must be ADMIN or STUDENT
        if (!role.equals("ADMIN") && !role.equals("STUDENT")) {
            throw new RuntimeException("Role must be ADMIN or STUDENT");
        }
        
        // Encrypt password with BCrypt
        String encryptedPassword = passwordEncoder.encode(password);
        
        // Create and save new user
        User user = new User(email, encryptedPassword, role);
        return userRepository.save(user);
    }
    
    // 2. Login and return JWT token
    public String login(String email, String password) {
        // Find user by email
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        if (userOptional.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }
        
        User user = userOptional.get();
        
        // Verify password using BCrypt
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        
        // Password is correct → Generate JWT token
        return jwtUtil.generateToken(user.getEmail(), user.getRole());
    }
}