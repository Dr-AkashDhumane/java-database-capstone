document.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();
});

// Load doctor cards based on filters
async function loadDoctorCards() {
  const searchBar = document.getElementById("searchBar").value.trim();
  const filterSpecialty = document.getElementById("filterSpecialty").value;
  const filterTime = document.getElementById("filterTime").value;

  try {
    const response = await fetch(`/api/doctors?name=${searchBar}&specialty=${filterSpecialty}&time=${filterTime}`);
    const doctors = await response.json();

    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = '';

    doctors.forEach(doctor => {
      const card = createDoctorCard(doctor);
      contentDiv.appendChild(card);
    });
  } catch (error) {
    console.error('Failed to load doctors:', error);
  }
}

// Create a doctor card
function createDoctorCard(doctor) {
  const card = document.createElement('div');
  card.classList.add('doctor-card');
  card.innerHTML = `
    <h3>${doctor.name}</h3>
    <p>Specialty: ${doctor.specialty}</p>
    <button onclick="openBookingModal(${doctor.id})">Book Appointment</button>
  `;
  return card;
}

// Open the booking modal
function openBookingModal(doctorId) {
  // Open modal, dynamically fetch available times for the doctor
  const modal = document.getElementById('appointmentModal');
  modal.style.display = 'block';

  fetch(`/api/doctors/${doctorId}/availableTimes`)
    .then(response => response.json())
    .then(data => {
      // Populate the modal with the available times and doctor details
      modal.innerHTML = `
        <h2>Book Appointment with ${data.name}</h2>
        <input type="text" value="${data.name}" disabled />
        <input type="text" value="${data.specialty}" disabled />
        <input type="email" value="${data.email}" disabled />
        <input type="date" id="appointment-date" />
        <select id="appointment-time">
          ${data.availableTimes.map(time => `<option value="${time}">${time}</option>`).join('')}
        </select>
        <button class="confirm-booking">Confirm Booking</button>
      `;
    });

  // Confirm the booking
  document.querySelector(".confirm-booking").addEventListener("click", async () => {
    const date = document.querySelector("#appointment-date").value;
    const time = document.querySelector("#appointment-time").value;

    const appointment = {
      doctor: { id: doctorId },
      patient: { id: 123 }, // Replace with actual patient ID
      appointmentTime: `${date}T${time}`,
      status: 0
    };

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
      });

      if (response.ok) {
        alert("Appointment booked successfully!");
        modal.style.display = 'none'; // Close the modal
      } else {
        alert("Failed to book appointment.");
      }
    } catch (error) {
      alert("An error occurred while booking the appointment.");
      console.error("Error booking appointment:", error);
    }
  });
}

// Filter doctors on input change
document.getElementById("searchBar").addEventListener("input", loadDoctorCards);
document.getElementById("filterTime").addEventListener("change", loadDoctorCards);
document.getElementById("filterSpecialty").addEventListener("change", loadDoctorCards);
