// Imports
import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors, saveDoctor } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

// Open Add Doctor modal
document.getElementById("addDocBtn")?.addEventListener("click", () => {
    openModal("addDoctor");
});

// Load doctors on page load
document.addEventListener("DOMContentLoaded", () => {
    loadDoctorCards();

    document.getElementById("searchBar")?.addEventListener("input", filterDoctorsOnChange);
    document.getElementById("filterTime")?.addEventListener("change", filterDoctorsOnChange);
    document.getElementById("filterSpecialty")?.addEventListener("change", filterDoctorsOnChange);
});

// Fetch and render all doctors
async function loadDoctorCards() {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "";

    const doctors = await getDoctors();
    renderDoctorCards(doctors);
}

// Render doctor cards
function renderDoctorCards(doctors) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "";

    if (!doctors || doctors.length === 0) {
        contentDiv.innerHTML = "<p>No doctors found</p>";
        return;
    }

    doctors.forEach(doctor => {
        contentDiv.appendChild(createDoctorCard(doctor));
    });
}

// Search & filter handler
async function filterDoctorsOnChange() {
    const name = document.getElementById("searchBar")?.value || "";
    const time = document.getElementById("filterTime")?.value || "";
    const specialty = document.getElementById("filterSpecialty")?.value || "";

    const doctors = await filterDoctors(name, time, specialty);
    renderDoctorCards(doctors);
}

// Add doctor handler (called from modal submit)
window.adminAddDoctor = async function () {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Unauthorized access!");
            return;
        }

        const doctor = {
            name: document.getElementById("docName").value,
            specialty: document.getElementById("docSpecialty").value,
            email: document.getElementById("docEmail").value,
            password: document.getElementById("docPassword").value,
            mobile: document.getElementById("docMobile").value,
            availability: Array.from(
                document.querySelectorAll("input[name='availability']:checked")
            ).map(cb => cb.value)
        };

        const result = await saveDoctor(doctor, token);

        if (result.success) {
            alert(result.message);
            location.reload();
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert("Failed to add doctor");
        console.error(error);
    }
};