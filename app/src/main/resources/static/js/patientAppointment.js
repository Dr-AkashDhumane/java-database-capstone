import { getPatientAppointments, filterAppointments } from "./services/patientServices.js";

const tableBody = document.getElementById("patientTableBody");
const token = localStorage.getItem("token");

let allAppointments = [];
let filteredAppointments = [];
let patientId = null;

document.addEventListener("DOMContentLoaded", initializePage);

async function initializePage() {
  try {
    if (!token) throw new Error("No token found");

    const patient = await getPatientData(token);
    if (!patient) throw new Error("Failed to fetch patient details");

    patientId = patient.id;

    const appointmentData = await getPatientAppointments(patientId, token);
    allAppointments = appointmentData.filter(app => app.patientId === patientId);

    renderAppointments(allAppointments);
  } catch (error) {
    console.error("Error loading appointments:", error);
    alert("❌ Failed to load your appointments.");
  }
}

function renderAppointments(appointments) {
  tableBody.innerHTML = "";

  if (!appointments.length) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No Appointments Found</td></tr>`;
    return;
  }

  appointments.forEach(appointment => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${appointment.patientName || "You"}</td>
      <td>${appointment.doctorName}</td>
      <td>${appointment.appointmentDate}</td>
      <td>${appointment.appointmentTimeOnly}</td>
      <td>${appointment.status == 0 ? `<button data-id="${appointment.id}" class="edit-btn">Edit</button>` : "-"}</td>
    `;

    const actionBtn = tr.querySelector(".edit-btn");
    actionBtn?.addEventListener("click", () => redirectToUpdatePage(appointment));

    tableBody.appendChild(tr);
  });
}

function redirectToUpdatePage(appointment) {
  const queryString = new URLSearchParams({
    appointmentId: appointment.id,
    patientId: appointment.patientId,
    doctorName: appointment.doctorName,
    appointmentDate: appointment.appointmentDate,
    appointmentTime: appointment.appointmentTimeOnly,
  }).toString();

  window.location.href = `/pages/updateAppointment.html?${queryString}`;
