package com.yourpackage.controller;

import com.yourpackage.model.Admin;
import com.yourpackage.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("${api.path}admin")  // Base path, e.g., /api/admin
public class AdminController {

    private final Service service;

    @Autowired
    public AdminController(Service service) {
        this.service = service;
    }

    /**
     * Admin login endpoint
     * @param admin - Admin object containing username and password
     * @return ResponseEntity with token or error message
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> adminLogin(@RequestBody Admin admin) {
        return service.validateAdmin(admin);
    }
}
