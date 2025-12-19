// modals.js
export function openModal(type) {
  const modalBody = document.getElementById("modal-body");
  const modal = document.getElementById("modal");
  let modalContent = "";

  switch (type) {
    case "addDoctor":
      modalContent = `
        <h2>Add Doctor</h2>
        <input type="text" id="doctorName" placeholder="Doctor Name" class="input-field">

        <select id="specialization" class="input-field select-dropdown">
          <option value="">Specialization</option>
          <option value="cardiologist">Cardiologist</option>
          <option value="dermatologist">Dermatologist</option>
          <option value="neurologist">Neurologist</option>
          <option value="pediatrician">Pediatrician</option>
          <option value="orthopedic">Orthopedic</option>
          <option value="gynecologist">Gynecologist</option>
          <option value="psychiatrist">Psychiatrist</option>
          <option value="dentist">Dentist</option>
          <option value="ophthalmologist">Ophthalmologist</option>
          <option value="ent">ENT Specialist</option>
          <option value="urologist">Urologist</option>
          <option value="oncologist">Oncologist</option>
          <option value="gastroenterologist">Gastroenterologist</option>
          <option value="general">General Physician</option>
        </select>

        <input type="email" id="doctorEmail" placeholder="Email" class="input-field">
        <input type="password" id="doctorPassword" placeholder="Password" class="input-field">
        <input type="text" id="doctorPhone" placeholder="Mobile No." class="input-field">

        <div class="availability-container">
          <label class="availabilityLabel">Select Availability:</label>
          <div class="checkbox-group">
            <label><input type="checkbox" name="availability" value="09:00-10:00"> 9:00 AM - 10:00 AM</label>
            <label><input type="checkbox" name="availability" value="10:00-11:00"> 10:00 AM - 11:00 AM</label>
            <label><input type="checkbox" name="availability" value="11:00-12:00"> 11:00 AM - 12:00 PM</label>
            <label><input type="checkbox" name="availability" value="12:00-13:00"> 12:00 PM - 1:00 PM</label>
          </div>
        </div>

        <button class="dashboard-btn" id="saveDoctorBtn">Save</button>
      `;
      break;

    case "patientLogin":
      modalContent = `
        <h2>Patient Login</h2>
        <input type="email" id="email" placeholder="Email" class="input-field">
        <input type="password" id="password" placeholder="Password" class="input-field">
        <button class="dashboard-btn" id="loginBtn">Login</button>
      `;
      break;

    case "patientSignup":
      modalContent = `
        <h2>Patient Signup</h2>
        <input type="text" id="name" placeholder="Name" class="input-field">
        <input type="email" id="email" placeholder="Email" class="input-field">
        <input type="password" id="password" placeholder="Password" class="input-field">
        <input type="text" id="phone" placeholder="Phone" class="input-field">
        <input type="text" id="address" placeholder="Address" class="input-field">
        <button class="dashboard-btn" id="signupBtn">Signup</button>
      `;
      break;

    case "adminLogin":
      modalContent = `
        <h2>Admin Login</h2>
        <input type="text" id="username" placeholder="Username" class="input-field">
        <input type="password" id="password" placeholder="Password" class="input-field">
        <button class="dashboard-btn" id="adminLoginBtn">Login</button>
      `;
      break;

    case "doctorLogin":
      modalContent = `
        <h2>Doctor Login</h2>
        <input type="email" id="email" placeholder="Email" class="input-field">
        <input type="password" id="password" placeholder="Password" class="input-field">
        <button class="dashboard-btn" id="doctorLoginBtn">Login</button>
      `;
      break;

    default:
      return;
  }

  // Inject modal content and show modal
  modalBody.innerHTML = modalContent;
  modal.style.display = "block";

  // Close modal handler
  document.getElementById("closeModal").onclick = () => {
    modal.style.display = "none";
  };

  // Attach action handlers
  attachModalHandlers(type);
}

// Attach handlers based on modal type
function attachModalHandlers(type) {
  const handlers = {
    patientSignup: () =>
      document.getElementById("signupBtn")?.addEventListener("click", signupPatient),

    patientLogin: () =>
      document.getElementById("loginBtn")?.addEventListener("click", loginPatient),

    addDoctor: () =>
      document.getElementById("saveDoctorBtn")?.addEventListener("click", adminAddDoctor),

    adminLogin: () =>
      document.getElementById("adminLoginBtn")?.addEventListener("click", adminLoginHandler),

    doctorLogin: () =>
      document.getElementById("doctorLoginBtn")?.addEventListener("click", doctorLoginHandler)
  };

  handlers[type]?.();
}
