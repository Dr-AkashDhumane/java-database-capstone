package com.yourpackage.service;

import com.yourpackage.dto.Login;
import com.yourpackage.model.Appointment;
import com.yourpackage.model.Doctor;
import com.yourpackage.repository.AppointmentRepository;
import com.yourpackage.repository.DoctorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final TokenService tokenService; // Assumed implemented

    public DoctorService(DoctorRepository doctorRepository,
                         AppointmentRepository appointmentRepository,
                         TokenService tokenService) {
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
        this.tokenService = tokenService;
    }

    /**
     * Fetch available slots for a doctor on a given date.
     */
    public List<String> getDoctorAvailability(Long doctorId, LocalDate date) {
        List<Appointment> appointments = appointmentRepository
                .findByDoctorIdAndAppointmentTimeBetween(doctorId, date.atStartOfDay(), date.atTime(23,59));

        Set<String> bookedSlots = appointments.stream()
                .map(a -> a.getAppointmentTime().toLocalTime().toString())
                .collect(Collectors.toSet());

        // Example: clinic hours 9AM - 5PM, hourly slots
        List<String> allSlots = new ArrayList<>();
        for (int hour = 9; hour <= 17; hour++) {
            String slot = LocalTime.of(hour, 0).toString();
            if (!bookedSlots.contains(slot)) allSlots.add(slot);
        }

        return allSlots;
    }

    /**
     * Save a new doctor.
     */
    public int saveDoctor(Doctor doctor) {
        if (doctorRepository.findByEmail(doctor.getEmail()) != null) {
            return -1; // Already exists
        }
        try {
            doctorRepository.save(doctor);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    /**
     * Update an existing doctor.
     */
    public int updateDoctor(Doctor doctor) {
        if (!doctorRepository.existsById(doctor.getId())) return -1;
        try {
            doctorRepository.save(doctor);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    /**
     * Retrieve all doctors.
     */
    public List<Doctor> getDoctors() {
        return doctorRepository.findAll();
    }

    /**
     * Delete a doctor by ID.
     */
    public int deleteDoctor(long id) {
        if (!doctorRepository.existsById(id)) return -1;
        try {
            appointmentRepository.deleteAllByDoctorId(id);
            doctorRepository.deleteById(id);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    /**
     * Validate login credentials.
     */
    public ResponseEntity<Map<String, String>> validateDoctor(Login login) {
        Map<String, String> response = new HashMap<>();
        Doctor doctor = doctorRepository.findByEmail(login.getIdentifier());
        if (doctor == null || !doctor.getPassword().equals(login.getPassword())) {
            response.put("message", "Invalid credentials");
            return ResponseEntity.badRequest().body(response);
        }
        String token = tokenService.generateToken(doctor.getEmail(), "DOCTOR");
        response.put("token", token);
        return ResponseEntity.ok(response);
    }

    /**
     * Find doctors by name (partial match).
     */
    public Map<String, Object> findDoctorByName(String name) {
        Map<String, Object> response = new HashMap<>();
        List<Doctor> doctors = doctorRepository.findByNameLike(name);
        response.put("doctors", doctors);
        return response;
    }

    /**
     * Filter doctors by name, specialty, and AM/PM availability.
     */
    public Map<String, Object> filterDoctorsByNameSpecilityandTime(String name, String specialty, String amOrPm) {
        Map<String, Object> response = new HashMap<>();
        List<Doctor> doctors = doctorRepository.findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase(name, specialty);
        List<Doctor> filtered = filterDoctorByTime(doctors, amOrPm);
        response.put("doctors", filtered);
        return response;
    }

    /**
     * Filter doctors by name and AM/PM availability.
     */
    public Map<String, Object> filterDoctorByNameAndTime(String name, String amOrPm) {
        Map<String, Object> response = new HashMap<>();
        List<Doctor> doctors = doctorRepository.findByNameLike(name);
        List<Doctor> filtered = filterDoctorByTime(doctors, amOrPm);
        response.put("doctors", filtered);
        return response;
    }

    /**
     * Filter doctors by name and specialty.
     */
    public Map<String, Object> filterDoctorByNameAndSpecility(String name, String specialty) {
        Map<String, Object> response = new HashMap<>();
        List<Doctor> doctors = doctorRepository.findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase(name, specialty);
        response.put("doctors", doctors);
        return response;
    }

    /**
     * Filter doctors by specialty and AM/PM availability.
     */
    public Map<String, Object> filterDoctorByTimeAndSpecility(String specialty, String amOrPm) {
        Map<String, Object> response = new HashMap<>();
        List<Doctor> doctors = doctorRepository.findBySpecialtyIgnoreCase(specialty);
        List<Doctor> filtered = filterDoctorByTime(doctors, amOrPm);
        response.put("doctors", filtered);
        return response;
    }

    /**
     * Filter doctors by specialty.
     */
    public Map<String, Object> filterDoctorBySpecility(String specialty) {
        Map<String, Object> response = new HashMap<>();
        List<Doctor> doctors = doctorRepository.findBySpecialtyIgnoreCase(specialty);
        response.put("doctors", doctors);
        return response;
    }

    /**
     * Filter doctors by AM/PM availability.
     */
    public Map<String, Object> filterDoctorsByTime(String amOrPm) {
        Map<String, Object> response = new HashMap<>();
        List<Doctor> doctors = doctorRepository.findAll();
        List<Doctor> filtered = filterDoctorByTime(doctors, amOrPm);
        response.put("doctors", filtered);
        return response;
    }

    /**
     * Private helper method to filter doctors by time of day.
     */
    private List<Doctor> filterDoctorByTime(List<Doctor> doctors, String amOrPm) {
        return doctors.stream().filter(d -> {
            if (d.getAvailability() == null || d.getAvailability().isEmpty()) return false;
            for (String slot : d.getAvailability()) {
                int hour = Integer.parseInt(slot.split(":")[0]);
                if ("AM".equalsIgnoreCase(amOrPm) && hour < 12) return true;
                if ("PM".equalsIgnoreCase(amOrPm) && hour >= 12) return true;
            }
            return false;
        }).collect(Collectors.toList());
    }
}
