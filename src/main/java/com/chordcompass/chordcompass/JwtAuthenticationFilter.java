package com.chordcompass.chordcompass;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) 
            throws ServletException, IOException {
        
        // Step 1: Extract Authorization header
        String authHeader = request.getHeader("Authorization");
        
        // Step 2: Check if header exists and starts with "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // No token found, continue to next filter
            filterChain.doFilter(request, response);
            return;
        }
        
        // Step 3: Extract token (remove "Bearer " prefix)
        String token = authHeader.substring(7);
        
        try {
            // Step 4: Extract email from token
            String email = jwtUtil.extractEmail(token);
            
            // Step 5: Check if user is not already authenticated
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                
                // Step 6: Validate token
                if (jwtUtil.validateToken(token, email)) {
                    
                    // Step 7: Get user from database (to get role)
                    User user = userRepository.findByEmail(email).orElse(null);
                    
                    if (user != null) {
                        // Step 8: Create authority (role) for Spring Security
                        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getRole());
                        
                        // Step 9: Create authentication object
                        UsernamePasswordAuthenticationToken authentication = 
                            new UsernamePasswordAuthenticationToken(
                                email, 
                                null,  // No password needed (already authenticated via token)
                                Collections.singletonList(authority)
                            );
                        
                        // Step 10: Set additional details
                        authentication.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                        );
                        
                        // Step 11: Tell Spring Security: "This user is authenticated!"
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }
        } catch (Exception e) {
            // Token is invalid (expired, tampered, etc.)
            // Just continue without authentication
            System.out.println("JWT validation failed: " + e.getMessage());
        }
        
        // Step 12: Continue to next filter or controller
        filterChain.doFilter(request, response);
    }
}