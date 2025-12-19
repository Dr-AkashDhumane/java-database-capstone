// Imports
import { createDoctorCard } from "./components/doctorCard.js";
import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors } from "./services/doctorServices.js";
import { patientLogin, patientSignup } from "./services/patientServices.js";

// Load doctors on page load
document.addEventListener("DOMContentLoaded", () => {
    loadDoctorCards();

    document.getElementById("searchBar")?.addEventListener("input", filterDoctorsOnChange);
    document.getElementById("filterTime")?.addEventListener("change", filterDoctorsOnChange);
    document.getElementById("filterSpecialty")?.addEventListener("change", filterDoctorsOnChange);

    document.getElementById("patientSignup")?.addEventListener("click", () => {
        openModal("patientSignup");
    });

    document.getElementById("patientLogin")?.addEventListener("click", () => {
        openModal("patientLogin");
    });
});

// Load all doctors
async function loadDoctorCards() {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "";

    const doctors = await getDoctors();
    renderDoctorCards(doctors);
}

// Render utility
function renderDoctorCards(doctors) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "";

    if (!doctors || doctors.length === 0) {
        contentDiv.innerHTML = "<p>No doctors found.</p>";
        return;
    }

    doctors.forEach(doc => {
        contentDiv.appendChild(createDoctorCard(doc));
    });
}

// Filter handler
async function filterDoctorsOnChange() {
    const name = document.getElementById("searchBar").value || "";
    const time = document.getElementById("filterTime").value || "";
    const specialty = document.getElementById("filterSpecialty").value || "";

    const doctors = await filterDoctors(name, time, specialty);
    renderDoctorCards(doctors);
}

// Patient signup
window.signupPatient = async function () {
    const data = {
        name: document.getElementById("signupName").value,
        email: document.getElementById("signupEmail").value,
        password: document.getElementById("signupPassword").value,
        phone: document.getElementById("signupPhone").value,
        address: document.getElementById("signupAddress").value
    };

    const result = await patientSignup(data);

    if (result.success) {
        alert(result.message);
        location.reload();
    } else {
        alert(result.message);
    }
};

// Patient login
window.loginPatient = async function () {
    const credentials = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
    };

    try {
        const response = await patientLogin(credentials);

        if (!response.ok) {
            alert("Invalid credentials");
            return;
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        window.location.href = "loggedPatientDashboard.html";
    } catch (error) {
        alert("Login failed");
        console.error(error);
    }
};