package com.chordcompass.chordcompass;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    
    // Secret key for signing tokens (like a password for creating/validating tokens)
    // In production, this should be in environment variables, not hardcoded!
    private static final String SECRET_KEY = "MySecretKeyForChordCompassApplicationMustBeLongEnough256Bits";
    
    // Token validity: 24 hours in milliseconds
    private static final long EXPIRATION_TIME = 86400000; // 24 * 60 * 60 * 1000
    
    // Generate secret key object
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }
    
    // 1. Generate JWT token after successful login
    public String generateToken(String email, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);  // Add role to token payload
        
        return Jwts.builder()
                .setClaims(claims)                          // Custom data (role)
                .setSubject(email)                          // Email as subject
                .setIssuedAt(new Date())                    // Current time
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))  // 24 hours from now
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)  // Sign with secret key
                .compact();                                 // Build the token string
    }
    
    // 2. Extract email from token
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }
    
    // 3. Extract role from token
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }
    
    // 4. Check if token is expired
    public boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
    
    // 5. Validate token (check signature and expiration)
    public boolean validateToken(String token, String email) {
        String tokenEmail = extractEmail(token);
        return (tokenEmail.equals(email) && !isTokenExpired(token));
    }
    
    // Helper method: Extract all data from token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}