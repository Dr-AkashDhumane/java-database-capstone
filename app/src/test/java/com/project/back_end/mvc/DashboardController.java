package com.example.clinicmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.clinicmanagement.service.TokenValidationService;

import java.util.Map;

@Controller
public class DashboardController {

    @Autowired
    private TokenValidationService tokenService;

    /**
     * Handles admin dashboard access
     * @param token JWT token for admin authentication
     * @return admin dashboard view if token is valid, otherwise redirects to login
     */
    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {
        Map<String, Object> validationResult = tokenService.validateToken(token, "admin");

        if (validationResult.isEmpty()) {
            // Token is valid
            return "admin/adminDashboard"; // Thymeleaf template at templates/admin/adminDashboard.html
        }

        // Token invalid → redirect to login page
        return "redirect:/";
    }

    /**
     * Handles doctor dashboard access
     * @param token JWT token for doctor authentication
     * @return doctor dashboard view if token is valid, otherwise redirects to login
     */
    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {
        Map<String, Object> validationResult = tokenService.validateToken(token, "doctor");

        if (validationResult.isEmpty()) {
            // Token is valid
            return "doctor/doctorDashboard"; // Thymeleaf template at templates/doctor/doctorDashboard.html
        }

        // Token invalid → redirect to login page
        return "redirect:/";
    }
}
