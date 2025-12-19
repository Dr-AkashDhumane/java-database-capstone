// Imports
import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";

// Global variables
const tableBody = document.getElementById("patientTableBody");
let selectedDate = new Date().toISOString().split("T")[0];
let token = localStorage.getItem("token");
let patientName = null;

// Search bar
document.getElementById("searchBar")?.addEventListener("input", (e) => {
    patientName = e.target.value || null;
    loadAppointments();
});

// Today button
document.getElementById("todayButton")?.addEventListener("click", () => {
    selectedDate = new Date().toISOString().split("T")[0];
    document.getElementById("datePicker").value = selectedDate;
    loadAppointments();
});

// Date picker
document.getElementById("datePicker")?.addEventListener("change", (e) => {
    selectedDate = e.target.value;
    loadAppointments();
});

// Load appointments
async function loadAppointments() {
    try {
        tableBody.innerHTML = "";

        const appointments = await getAllAppointments(
            selectedDate,
            patientName,
            token
        );

        if (!appointments || appointments.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6">No Appointments found for today</td>
                </tr>`;
            return;
        }

        appointments.forEach(app => {
            tableBody.appendChild(createPatientRow(app));
        });
    } catch (error) {
        console.error(error);
        tableBody.innerHTML = `
            <tr>
                <td colspan="6">Failed to load appointments</td>
            </tr>`;
    }
}

// Initial load
document.addEventListener("DOMContentLoaded", () => {
    loadAppointments();
});