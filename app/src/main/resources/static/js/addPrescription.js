// src/main/resources/static/js/addPrescription.js
import { savePrescription, getPrescription } from "/js/services/prescriptionServices.js";

document.addEventListener('DOMContentLoaded', async () => {
    const savePrescriptionBtn = document.getElementById("savePrescription");
    const patientNameInput = document.getElementById("patientName");
    const medicinesInput = document.getElementById("medicines");
    const dosageInput = document.getElementById("dosage");
    const notesInput = document.getElementById("notes");
    const heading = document.getElementById("heading");

    const urlParams = new URLSearchParams(window.location.search);
    const appointmentId = urlParams.get("appointmentId");
    const mode = urlParams.get("mode");
    const token = localStorage.getItem("token");
    const patientName = urlParams.get("patientName");

    // Update heading based on mode
    if (heading) {
        heading.innerHTML = mode === "view" ? `View <span>Prescription</span>` : `Add <span>Prescription</span>`;
    }

    // Pre-fill patient name
    if (patientNameInput && patientName) {
        patientNameInput.value = patientName;
    }

    // Fetch existing prescription if available
    if (appointmentId && token) {
        try {
            const response = await getPrescription(appointmentId, token);
            console.log("getPrescription :: ", response);

            if (response.prescription && response.prescription.length > 0) {
                const existingPrescription = response.prescription[0];
                patientNameInput.value = existingPrescription.patientName || "";
                medicinesInput.value = existingPrescription.medication || "";
                dosageInput.value = existingPrescription.dosage || "";
                notesInput.value = existingPrescription.doctorNotes || "";
            }
        } catch (error) {
            console.warn("No existing prescription found or failed to load:", error);
        }
    }

    // Make form read-only in view mode
    if (mode === 'view') {
        [patientNameInput, medicinesInput, dosageInput, notesInput].forEach(input => input.disabled = true);
        savePrescriptionBtn.style.display = "none";
    }

    // Save prescription on button click
    savePrescriptionBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const prescription = {
            patientName: patientNameInput.value,
            medication: medicinesInput.value,
            dosage: dosageInput.value,
            doctorNotes: notesInput.value,
            appointmentId
        };

        const { success, message } = await savePrescription(prescription, token);

        if (success) {
            alert("✅ Prescription saved successfully.");
            window.location.href = "/doctor/dashboard"; // Adjust to your dashboard route
        } else {
            alert("❌ Failed to save prescription. " + message);
        }
    });
});
