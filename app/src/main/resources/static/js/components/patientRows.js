// patientRows.js
export function createPatientRow(patient, appointmentId, doctorId) {
  const tr = document.createElement("tr");
  
  // Log the doctorId for debugging purposes
  console.log("CreatePatientRow :: doctorId =", doctorId);

  tr.innerHTML = `
    <td class="patient-id">${patient.id}</td>
    <td>${patient.name}</td>
    <td>${patient.phone}</td>
    <td>${patient.email}</td>
    <td>
      <img src="../assets/images/addPrescriptionIcon/addPrescription.png" 
           alt="Add Prescription" 
           class="prescription-btn" 
           data-id="${patient.id}">
    </td>
  `;

  // Event listener for patient ID to view their records
  const patientIdCell = tr.querySelector(".patient-id");
  patientIdCell.addEventListener("click", () => {
    window.location.href = `/pages/patientRecord.html?id=${patient.id}&doctorId=${doctorId}`;
  });

  // Event listener for the prescription button
  const prescriptionBtn = tr.querySelector(".prescription-btn");
  prescriptionBtn.addEventListener("click", () => {
    window.location.href = `/pages/addPrescription.html?appointmentId=${appointmentId}&patientName=${patient.name}`;
  });

  return tr;
}
