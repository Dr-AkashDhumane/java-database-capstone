// patientRecordRow.js
export function createPatientRecordRow(patient) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td class="appointment-date">${patient.appointmentDate}</td>
    <td class="patient-id">${patient.id}</td>
    <td class="patient-id">${patient.patientId}</td>
    <td>
      <img src="../assets/images/addPrescriptionIcon/addPrescription.png" 
           alt="Add Prescription" 
           class="prescription-btn" 
           data-id="${patient.id}">
    </td>
  `;

  // Attach click event listener to the prescription button
  const prescriptionBtn = tr.querySelector(".prescription-btn");
  prescriptionBtn.addEventListener("click", () => {
    window.location.href = `/pages/addPrescription.html?mode=view&appointmentId=${patient.id}`;
  });

  return tr;
}
