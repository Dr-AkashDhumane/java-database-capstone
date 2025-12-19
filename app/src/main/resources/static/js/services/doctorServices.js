// Import API base URL
import { API_BASE_URL } from "../config/config.js";

// Doctor base API endpoint
const DOCTOR_API = API_BASE_URL + "/doctor";

/**
 * Fetch all doctors
 * Used by Admin and Patient dashboards
 */
export async function getDoctors() {
    try {
        const response = await fetch(DOCTOR_API);

        if (!response.ok) {
            throw new Error("Failed to fetch doctors");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return [];
    }
}

/**
 * Delete a doctor (Admin only)
 * @param {number} id - Doctor ID
 * @param {string} token - Auth token
 */
export async function deleteDoctor(id, token) {
    try {
        const response = await fetch(`${DOCTOR_API}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        return {
            success: response.ok,
            message: data.message || "Doctor deleted successfully"
        };
    } catch (error) {
        console.error("Error deleting doctor:", error);
        return {
            success: false,
            message: "Unable to delete doctor"
        };
    }
}

/**
 * Save (Add) a new doctor (Admin only)
 * @param {object} doctor - Doctor details
 * @param {string} token - Auth token
 */
export async function saveDoctor(doctor, token) {
    try {
        const response = await fetch(DOCTOR_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(doctor)
        });

        const data = await response.json();

        return {
            success: response.ok,
            message: data.message || "Doctor added successfully"
        };
    } catch (error) {
        console.error("Error saving doctor:", error);
        return {
            success: false,
            message: "Failed to save doctor"
        };
    }
}

/**
 * Filter doctors by name, time, and specialty
 */
export async function filterDoctors(name, time, specialty) {
    try {
        const queryParams = new URLSearchParams({
            name: name || "",
            time: time || "",
            specialty: specialty || ""
        });

        const response = await fetch(`${DOCTOR_API}/filter?${queryParams}`);

        if (!response.ok) {
            throw new Error("Failed to filter doctors");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error filtering doctors:", error);
        alert("Unable to filter doctors. Please try again.");
        return [];
    }
}
