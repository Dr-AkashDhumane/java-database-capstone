package com.yourpackage.service;

import com.yourpackage.model.Appointment;
import com.yourpackage.model.Doctor;
import com.yourpackage.model.Patient;
import com.yourpackage.repository.AppointmentRepository;
import com.yourpackage.repository.DoctorRepository;
import com.yourpackage.repository.PatientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final TokenService tokenService; // Assuming this is already implemented

    public AppointmentService(AppointmentRepository appointmentRepository,
                              PatientRepository patientRepository,
                              DoctorRepository doctorRepository,
                              TokenService tokenService) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.tokenService = tokenService;
    }

    /**
     * Book a new appointment.
     * @param appointment the appointment to book
     * @return 1 if successful, 0 if failed
     */
    public int bookAppointment(Appointment appointment) {
        try {
            appointmentRepository.save(appointment);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    /**
     * Update an existing appointment.
     */
    public ResponseEntity<Map<String, String>> updateAppointment(Appointment appointment) {
        Map<String, String> response = new HashMap<>();
        Optional<Appointment> existing = appointmentRepository.findById(appointment.getId());

        if (existing.isEmpty()) {
            response.put("message", "Appointment not found.");
            return ResponseEntity.badRequest().body(response);
        }

        // Example validation method call (assumes validateAppointment exists)
        if (!validateAppointment(appointment)) {
            response.put("message", "Invalid appointment data.");
            return ResponseEntity.badRequest().body(response);
        }

        appointmentRepository.save(appointment);
        response.put("message", "Appointment updated successfully.");
        return ResponseEntity.ok(response);
    }

    /**
     * Cancel an appointment by ID.
     */
    public ResponseEntity<Map<String, String>> cancelAppointment(long id, String token) {
        Map<String, String> response = new HashMap<>();
        Optional<Appointment> existing = appointmentRepository.findById(id);

        if (existing.isEmpty()) {
            response.put("message", "Appointment not found.");
            return ResponseEntity.badRequest().body(response);
        }

        Appointment appointment = existing.get();

        // Ensure that only the patient who booked can cancel
        String patientEmailFromToken = tokenService.getEmailFromToken(token);
        if (!appointment.getPatient().getEmail().equals(patientEmailFromToken)) {
            response.put("message", "Unauthorized to cancel this appointment.");
            return ResponseEntity.status(403).body(response);
        }

        appointmentRepository.delete(appointment);
        response.put("message", "Appointment canceled successfully.");
        return ResponseEntity.ok(response);
    }

    /**
     * Retrieve appointments for a specific doctor on a given date,
     * optionally filtered by patient name.
     */
    public Map<String, Object> getAppointment(String pname, LocalDate date, String token) {
        Map<String, Object> response = new HashMap<>();

        Long doctorId = tokenService.getDoctorIdFromToken(token);
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.atTime(LocalTime.MAX);

        List<Appointment> appointments;

        if (pname == null || pname.isEmpty()) {
            appointments = appointmentRepository.findByDoctorIdAndAppointmentTimeBetween(doctorId, start, end);
        } else {
            appointments = appointmentRepository
                    .findByDoctorIdAndPatient_NameContainingIgnoreCaseAndAppointmentTimeBetween(doctorId, pname, start, end);
        }

        response.put("appointments", appointments);
        return response;
    }

    /**
     * Example validation method for appointment.
     * You can expand this with real business logic.
     */
    private boolean validateAppointment(Appointment appointment) {
        // Check doctor and patient exist
        return doctorRepository.existsById(appointment.getDoctor().getId())
                && patientRepository.existsById(appointment.getPatient().getId());
    }
}
