// appointmentRow.js
export function getAppointments(appointment) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td class="patient-id">${appointment.patientName}</td>
    <td>${appointment.doctorName}</td>
    <td>${appointment.date}</td>
    <td>${appointment.time}</td>
    <td>
      <img 
        src="../assets/images/edit/edit.png" 
        alt="Edit Prescription" 
        class="prescription-btn" 
        data-id="${appointment.id}"
      />
    </td>
  `;

  const prescriptionBtn = tr.querySelector(".prescription-btn");

  // Attach click event
  prescriptionBtn.addEventListener("click", () => {
    window.location.href = `addPrescription.html?id=${appointment.id}`;
  });

  return tr;
}
