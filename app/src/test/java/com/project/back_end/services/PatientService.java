package com.yourpackage.service;

import com.yourpackage.dto.AppointmentDTO;
import com.yourpackage.model.Appointment;
import com.yourpackage.model.Patient;
import com.yourpackage.repository.AppointmentRepository;
import com.yourpackage.repository.PatientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final TokenService tokenService;

    public PatientService(PatientRepository patientRepository,
                          AppointmentRepository appointmentRepository,
                          TokenService tokenService) {
        this.patientRepository = patientRepository;
        this.appointmentRepository = appointmentRepository;
        this.tokenService = tokenService;
    }

    /**
     * Create a new patient.
     */
    public int createPatient(Patient patient) {
        try {
            patientRepository.save(patient);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    /**
     * Retrieve appointments for a specific patient.
     */
    public ResponseEntity<Map<String, Object>> getPatientAppointment(Long id, String token) {
        Map<String, Object> response = new HashMap<>();

        String emailFromToken = tokenService.getEmailFromToken(token);
        Patient patient = patientRepository.findByEmail(emailFromToken);
        if (patient == null || !patient.getId().equals(id)) {
            response.put("message", "Unauthorized access");
            return ResponseEntity.status(401).body(response);
        }

        List<AppointmentDTO> appointments = appointmentRepository.findByPatientId(id)
                .stream()
                .map(AppointmentDTO::new)
                .collect(Collectors.toList());

        response.put("appointments", appointments);
        return ResponseEntity.ok(response);
    }

    /**
     * Filter patient appointments by condition: past or future.
     */
    public ResponseEntity<Map<String, Object>> filterByCondition(String condition, Long id) {
        Map<String, Object> response = new HashMap<>();
        List<Appointment> appointments = appointmentRepository.findByPatientId(id);

        LocalDateTime now = LocalDateTime.now();
        List<AppointmentDTO> filtered = appointments.stream()
                .filter(a -> {
                    if ("past".equalsIgnoreCase(condition)) {
                        return a.getAppointmentTime().isBefore(now);
                    } else if ("future".equalsIgnoreCase(condition)) {
                        return a.getAppointmentTime().isAfter(now);
                    }
                    return false;
                })
                .map(AppointmentDTO::new)
                .collect(Collectors.toList());

        response.put("appointments", filtered);
        return ResponseEntity.ok(response);
    }

    /**
     * Filter patient appointments by doctor's name.
     */
    public ResponseEntity<Map<String, Object>> filterByDoctor(String name, Long patientId) {
        Map<String, Object> response = new HashMap<>();
        List<AppointmentDTO> filtered = appointmentRepository
                .filterByDoctorNameAndPatientId(name, patientId)
                .stream()
                .map(AppointmentDTO::new)
                .collect(Collectors.toList());

        response.put("appointments", filtered);
        return ResponseEntity.ok(response);
    }

    /**
     * Filter patient appointments by doctor's name and condition (past/future).
     */
    public ResponseEntity<Map<String, Object>> filterByDoctorAndCondition(String condition, String name, long patientId) {
        Map<String, Object> response = new HashMap<>();
        List<Appointment> appointments = appointmentRepository.filterByDoctorNameAndPatientId(name, patientId);

        LocalDateTime now = LocalDateTime.now();
        List<AppointmentDTO> filtered = appointments.stream()
                .filter(a -> {
                    if ("past".equalsIgnoreCase(condition)) return a.getAppointmentTime().isBefore(now);
                    if ("future".equalsIgnoreCase(condition)) return a.getAppointmentTime().isAfter(now);
                    return false;
                })
                .map(AppointmentDTO::new)
                .collect(Collectors.toList());

        response.put("appointments", filtered);
        return ResponseEntity.ok(response);
    }

    /**
     * Retrieve patient details using JWT token.
     */
    public ResponseEntity<Map<String, Object>> getPatientDetails(String token) {
        Map<String, Object> response = new HashMap<>();
        String email = tokenService.getEmailFromToken(token);
        Patient patient = patientRepository.findByEmail(email);

        if (patient == null) {
            response.put("message", "Patient not found");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("patient", patient);
        return ResponseEntity.ok(response);
    }
}
