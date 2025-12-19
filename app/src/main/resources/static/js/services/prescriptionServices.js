// prescriptionServices.js
import { API_BASE_URL } from "../config/config.js";

const PRESCRIPTION_API = `${API_BASE_URL}/prescription`;

// Helper function to handle API requests
async function apiRequest(endpoint, method = 'GET', body = null, token = '') {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` })  // Add token if present
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`${PRESCRIPTION_API}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed.");
    }

    return { success: true, data };  // Return success and the response data
  } catch (error) {
    console.error("Error with API request:", error);
    return { success: false, message: error.message };  // Return error message on failure
  }
}

// Save prescription for a patient
export async function savePrescription(prescription, token) {
  const result = await apiRequest(`/${token}`, 'POST', prescription, token);
  if (result.success) {
    return { success: true, message: result.data.message };  // Return success message
  }
  return { success: false, message: result.message || "Failed to save prescription." };
}

// Get prescription for a specific appointment
export async function getPrescription(appointmentId, token) {
  const result = await apiRequest(`/${appointmentId}/${token}`, 'GET', null, token);
  if (result.success) {
    return { success: true, data: result.data };  // Return prescription data
  }
  return { success: false, message: result.message || "Unable to fetch prescription" };
}
