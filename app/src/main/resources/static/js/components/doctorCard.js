import { deleteDoctor } from "../services/doctorServices.js";
import { getPatientData } from "../services/patientServices.js";
import { showBookingOverlay } from "./modals.js";

export function createDoctorCard(doctor) {
  /* Main Card */
  const card = document.createElement("div");
  card.classList.add("doctor-card");

  /* Get User Role */
  const role = localStorage.getItem("userRole");

  /* Doctor Info Section */
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("doctor-info");

  const name = document.createElement("h3");
  name.textContent = doctor.name;

  const specialization = document.createElement("p");
  specialization.textContent = `Specialty: ${doctor.specialization}`;

  const email = document.createElement("p");
  email.textContent = `Email: ${doctor.email}`;

  const availability = document.createElement("p");
  availability.textContent = `Available: ${doctor.availability?.join(", ")}`;

  infoDiv.appendChild(name);
  infoDiv.appendChild(specialization);
  infoDiv.appendChild(email);
  infoDiv.appendChild(availability);

  /* Actions Section */
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("card-actions");

  // Admin: Delete Doctor
  if (role === "admin") {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", async () => {
      if (!confirm("Are you sure you want to delete this doctor?")) return;

      try {
        await deleteDoctor(doctor.id);
        card.remove();
      } catch (error) {
        alert("Failed to delete doctor");
        console.error(error);
      }
    });

    actionsDiv.appendChild(deleteBtn);
  }

  // Patient (not logged in)
  else if (role === "patient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";

    bookNow.addEventListener("click", () => {
      alert("Patient needs to login first.");
    });

    actionsDiv.appendChild(bookNow);
  }

  // Logged-in Patient
  else if (role === "loggedPatient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";

    bookNow.addEventListener("click", async (e) => {
      try {
        const token = localStorage.getItem("token");
        const patientData = await getPatientData(token);
        showBookingOverlay(e, doctor, patientData);
      } catch (error) {
        alert("Unable to start booking");
        console.error(error);
      }
    });

    actionsDiv.appendChild(bookNow);
  }

  /* Final Assembly */
  card.appendChild(infoDiv);
  card.appendChild(actionsDiv);

  /* Return the Card */
  return card;
}
