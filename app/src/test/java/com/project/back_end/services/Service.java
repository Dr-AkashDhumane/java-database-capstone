package com.yourpackage.service;

import com.yourpackage.model.Admin;
import com.yourpackage.model.Appointment;
import com.yourpackage.model.Login;
import com.yourpackage.model.Patient;
import com.yourpackage.repository.AdminRepository;
import com.yourpackage.repository.DoctorRepository;
import com.yourpackage.repository.PatientRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class Service {

    private final TokenService tokenService;
    private final AdminRepository adminRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final DoctorService doctorService;
    private final PatientService patientService;

    public Service(TokenService tokenService,
                   AdminRepository adminRepository,
                   DoctorRepository doctorRepository,
                   PatientRepository patientRepository,
                   DoctorService doctorService,
                   PatientService patientService) {
        this.tokenService = tokenService;
        this.adminRepository = adminRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.doctorService = doctorService;
        this.patientService = patientService;
    }

    /**
     * Validate a JWT token for a user.
     */
    public ResponseEntity<Map<String, String>> validateToken(String token, String user) {
        Map<String, String> response = new HashMap<>();
        if (!tokenService.validateToken(token, user)) {
            response.put("message", "Invalid or expired token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        response.put("message", "Token is valid");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Validate admin login credentials.
     */
    public ResponseEntity<Map<String, String>> validateAdmin(Admin receivedAdmin) {
        Map<String, String> response = new HashMap<>();
        Admin admin = adminRepository.findByUsername(receivedAdmin.getUsername());
        if (admin == null || !admin.getPassword().equals(receivedAdmin.getPassword())) {
            response.put("message", "Invalid username or password");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        String token = tokenService.generateToken(admin.getUsername());
        response.put("token", token);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Filter doctors based on name, specialty, and available time.
     */
    public Map<String, Object> filterDoctor(String name, String specialty, String time) {
        return doctorService.filterDoctorsByNameSpecilityandTime(name, specialty, time);
    }

    /**
     * Validate whether an appointment is valid and available.
     */
    public int validateAppointment(Appointment appointment) {
        Optional.ofNullable(doctorRepository.findById(appointment.getDoctorId()))
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        List<String> availableSlots = doctorService.getDoctorAvailability(
                appointment.getDoctorId(), appointment.getAppointmentTime().toLocalDate()
        );

        if (!availableSlots.contains(appointment.getAppointmentTime().toLocalTime().toString())) {
            return 0; // Slot unavailable
        }
        return 1; // Valid
    }

    /**
     * Check if a patient already exists.
     */
    public boolean validatePatient(Patient patient) {
        return patientRepository.findByEmailOrPhone(patient.getEmail(), patient.getPhone()) == null;
    }

    /**
     * Validate patient login credentials.
     */
    public ResponseEntity<Map<String, String>> validatePatientLogin(Login login) {
        Map<String, String> response = new HashMap<>();
        Patient patient = patientRepository.findByEmail(login.getIdentifier());
        if (patient == null || !patient.getPassword().equals(login.getPassword())) {
            response.put("message", "Invalid email or password");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        String token = tokenService.generateToken(patient.getEmail());
        response.put("token", token);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Filter patient appointments by condition, doctor name, or both.
     */
    public ResponseEntity<Map<String, Object>> filterPatient(String condition, String name, String token) {
        Map<String, Object> response = new HashMap<>();
        String email = tokenService.extractUsername(token);
        Patient patient = patientRepository.findByEmail(email);
        if (patient == null) {
            response.put("message", "Patient not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        if (condition != null && !condition.isEmpty() && name != null && !name.isEmpty()) {
            return patientService.filterByDoctorAndCondition(condition, name, patient.getId());
        } else if (condition != null && !condition.isEmpty()) {
            return patientService.filterByCondition(condition, patient.getId());
        } else if (name != null && !name.isEmpty()) {
            return patientService.filterByDoctor(name, patient.getId());
        }

        return patientService.getPatientAppointment(patient.getId(), token);
    }
}
