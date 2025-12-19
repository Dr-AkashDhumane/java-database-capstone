document.addEventListener("DOMContentLoaded", initializePage);

async function initializePage() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get("id");
    const doctorId = urlParams.get("doctorId");

    const response = await fetch(`/api/appointments/patient/${patientId}/doctor/${doctorId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const appointmentData = await response.json();
    renderAppointments(appointmentData);
  } catch (error) {
    console.error("Error loading appointments:", error);
    alert("❌ Failed to load your appointments.");
  }
}

function renderAppointments(appointments) {
  const tableBody = document.getElementById("patientTableBody");

  if (!appointments.length) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No Appointments Found</td></tr>`;
    return;
  }

  appointments.forEach(appointment => {
    const row = createPatientRecordRow(appointment);
    tableBody.appendChild(row);
  });
}

function createPatientRecordRow(appointment) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${appointment.doctor.name}</td>
    <td>${appointment.appointmentDateTime}</td>
    <td>${appointment.appointmentTime}</td>
    <td>${appointment.status}</td>
    <td>
      <button class="view-btn" data-id="${appointment.id}">View</button>
    </td>
  `;

  const viewBtn = row.querySelector(".view-btn");
  viewBtn.addEventListener("click", () => {
    window.location.href = `/appointmentDetails?id=${appointment.id}`;
  });

  return row;
}
