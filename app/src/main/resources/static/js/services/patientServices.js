// Import API base URL
import { API_BASE_URL } from "../config/config.js";

// Patient base API endpoint
const PATIENT_API = API_BASE_URL + "/patient";

/**
 * Patient Signup
 */
export async function patientSignup(data) {
    try {
        const response = await fetch(`${PATIENT_API}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        return {
            success: response.ok,
            message: result.message
        };
    } catch (error) {
        console.error("Signup error:", error);
        return {
            success: false,
            message: "Signup failed. Please try again."
        };
    }
}

/**
 * Patient Login
 */
export async function patientLogin(data) {
    try {
        console.log("Patient login data:", data); // remove in production

        const response = await fetch(`${PATIENT_API}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

/**
 * Get logged-in patient data
 */
export async function getPatientData(token) {
    try {
        const response = await fetch(`${PATIENT_API}/me`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch patient data");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching patient data:", error);
        return null;
    }
}

/**
 * Get patient appointments (Patient & Doctor dashboards)
 */
export async function getPatientAppointments(id, token, user) {
    try {
        const response = await fetch(
            `${PATIENT_API}/appointments/${id}?user=${user}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch appointments");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return null;
    }
}

/**
 * Filter appointments
 */
export async function filterAppointments(condition, name, token) {
    try {
        const queryParams = new URLSearchParams({
            condition: condition || "",
            name: name || ""
        });

        const response = await fetch(
            `${PATIENT_API}/appointments/filter?${queryParams}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Failed to filter appointments");
        }

        return await response.json();
    } catch (error) {
        console.error("Error filtering appointments:", error);
        alert("Unable to filter appointments.");
        return [];
    }
}
