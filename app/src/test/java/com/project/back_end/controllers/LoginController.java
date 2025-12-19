package com.yourpackage.controller;

import com.yourpackage.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@Controller
public class LoginController {

    @Autowired
    private AuthService authService;

    @GetMapping("/login")
    public String loginPage() {
        return "login"; // login.html
    }

    @GetMapping("/dashboard")
    public String dashboard(
            @RequestHeader(value = "Authorization", required = false) String token,
            Model model
    ) {

        if (!authService.isValidToken(token)) {
            model.addAttribute("error", "Unauthorized access");
            return "login";
        }

        String role = authService.getRoleFromToken(token);

        if ("ADMIN".equals(role)) {
            return "adminDashboard";
        } else if ("DOCTOR".equals(role)) {
            return "doctorDashboard";
        }

        model.addAttribute("error", "Invalid role");
        return "login";
    }
}
