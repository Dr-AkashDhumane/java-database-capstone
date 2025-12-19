// updateAppointment.js
import { updateAppointment } from "../js/services/appointmentRecordService.js";
import { getDoctors } from "../js/services/doctorServices.js";

document.addEventListener("DOMContentLoaded", initializePage);

async function initializePage() {
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  const urlParams = new URLSearchParams(window.location.search);
  
  const appointmentId = urlParams.get("appointmentId");
  const patientId = urlParams.get("patientId");
  const doctorId = urlParams.get("doctorId");
  const patientName = urlParams.get("patientName");
  const doctorName = urlParams.get("doctorName");
  const appointmentDate = urlParams.get("appointmentDate");
  const appointmentTime = urlParams.get("appointmentTime");

  if (!token || !patientId) {
    alert("Missing session data, redirecting to appointments page.");
    window.location.href = "/pages/patientAppointments.html";
    return;
  }

  try {
    // Fetch the list of doctors and filter the doctor by the given ID
    const doctors = await getDoctors();
    const doctor = doctors.find(d => d.id === doctorId);
    
    if (!doctor) {
      alert("Doctor not found.");
      return;
    }

    // Fill the form with appointment details
    populateFormFields(patientName, doctorName, appointmentDate, appointmentTime);

    // Populate available time slots for the selected doctor
    populateAvailableTimes(doctor.availableTimes);

    // Event listener for form submission
    document.getElementById("updateAppointmentForm").addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevent default form submission

      const date = document.getElementById("appointmentDate").value;
      const time = document.getElementById("appointmentTime").value;
      const startTime = time.split('-')[0];

      if (!date || !time) {
        alert("Please select both date and time.");
        return;
      }

      const updatedAppointment = {
        id: appointmentId,
        doctor: { id: doctor.id },
        patient: { id: patientId },
        appointmentTime: `${date}T${startTime}:00`,
        status: 0
      };

      try {
        const updateResponse = await updateAppointment(updatedAppointment, token);

        if (updateResponse.success) {
          alert("Appointment updated successfully!");
          window.location.href = "/pages/patientAppointments.html"; // Redirect back to the appointments page
        } else {
          alert("❌ Failed to update appointment: " + updateResponse.message);
        }
      } catch (error) {
        console.error("Error updating appointment:", error);
        alert("❌ An error occurred while updating the appointment.");
      }
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    alert("❌ Failed to load doctor data.");
  }
}

// Function to populate form fields with current appointment data
function populateFormFields(patientName, doctorName, appointmentDate, appointmentTime) {
  document.getElementById("patientName").value = patientName || "You";
  document.getElementById("doctorName").value = doctorName;
  document.getElementById("appointmentDate").value = appointmentDate;
  document.getElementById("appointmentTime").value = appointmentTime;
}

// Function to populate available time options for the doctor
function populateAvailableTimes(availableTimes) {
  const timeSelect = document.getElementById("appointmentTime");
  availableTimes.forEach(time => {
    const option = document.createElement("option");
    option.value = time;
    option.textContent = time;
    timeSelect.appendChild(option);
  });
}
