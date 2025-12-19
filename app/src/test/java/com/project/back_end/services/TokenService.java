package com.yourpackage.service;

import com.yourpackage.model.Admin;
import com.yourpackage.model.Doctor;
import com.yourpackage.model.Patient;
import com.yourpackage.repository.AdminRepository;
import com.yourpackage.repository.DoctorRepository;
import com.yourpackage.repository.PatientRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class TokenService {

    private final AdminRepository adminRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    private SecretKey signingKey;

    @Value("${jwt.secret}")
    private String jwtSecret;

    private final long EXPIRATION_TIME = 1000L * 60 * 60 * 24 * 7; // 7 days in milliseconds

    public TokenService(AdminRepository adminRepository,
                        DoctorRepository doctorRepository,
                        PatientRepository patientRepository) {
        this.adminRepository = adminRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
    }

    @PostConstruct
    private void init() {
        signingKey = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Generate a JWT token for a given user identifier.
     */
    public String generateToken(String identifier) {
        return Jwts.builder()
                .setSubject(identifier)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extract the identifier (subject) from a JWT token.
     */
    public String extractIdentifier(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    /**
     * Validate a JWT token for a given user type.
     * Returns true if valid, false if invalid or expired.
     */
    public boolean validateToken(String token, String userType) {
        try {
            String identifier = extractIdentifier(token);
            switch (userType.toLowerCase()) {
                case "admin":
                    Admin admin = adminRepository.findByUsername(identifier);
                    return admin != null;
                case "doctor":
                    Doctor doctor = doctorRepository.findByEmail(identifier);
                    return doctor != null;
                case "patient":
                    Patient patient = patientRepository.findByEmail(identifier);
                    return patient != null;
                default:
                    return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Get the signing key used for JWT.
     */
    public SecretKey getSigningKey() {
        return signingKey;
    }
}
