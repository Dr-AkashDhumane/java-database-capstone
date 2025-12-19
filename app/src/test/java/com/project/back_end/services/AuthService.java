package com.yourpackage.service;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public boolean isValidToken(String token) {
        return token != null && token.startsWith("Bearer ");
    }

    public String getRoleFromToken(String token) {
        // Simulated logic – replace with JWT parsing later
        if (token.contains("ADMIN")) {
            return "ADMIN";
        } else if (token.contains("DOCTOR")) {
            return "DOCTOR";
        }
        return null;
    }
}
