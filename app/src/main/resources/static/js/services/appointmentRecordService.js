// appointmentRecordService.js
import { API_BASE_URL } from "../config/config.js";
const APPOINTMENT_API = `${API_BASE_URL}/appointments`;

// Helper function for API requests
async function apiRequest(endpoint, method, appointmentData, token) {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: appointmentData ? JSON.stringify(appointmentData) : undefined
  };

  try {
    const response = await fetch(`${APPOINTMENT_API}/${endpoint}/${token}`, options);
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to process the request.");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error during ${method} request to ${endpoint}:`, error);
    return {
      success: false,
      message: error.message ?? "Network error. Please try again later."
    };
  }
}

// Get all appointments
export async function getAllAppointments(date, patientName, token) {
  try {
    const appointments = await apiRequest(`${date}/${patientName}`, "GET", null, token);
    return {
      success: true,
      data: appointments
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// Book an appointment
export async function bookAppointment(appointment, token) {
  return await apiRequest("", "POST", appointment, token);
}

// Update an appointment
export async function updateAppointment(appointment, token) {
  return await apiRequest("", "PUT", appointment, token);
}
