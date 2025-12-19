function selectRole(role) {
  setRole(role);
  const token = localStorage.getItem('token');

  if (role === "admin") {
    if (token) {
      window.location.href = `http://localhost:8080/adminDashboard`; // Redirect to admin dashboard
    }
  } else if (role === "patient") {
    window.location.href = "/patientDashboard"; // Redirect to patient dashboard
  } else if (role === "doctor") {
    if (token) {
      window.location.href = `http://localhost:8080/doctorDashboard`; // Redirect to doctor dashboard
    }
  } else if (role === "loggedPatient") {
    window.location.href = "/loggedPatientDashboard"; // Redirect to logged-in patient dashboard
  }
}

function renderContent() {
  const role = getRole(); // This can be set using localStorage or session
  if (!role) {
    window.location.href = "/"; // if no role, send to role selection page
    return;
  }

  // Render content based on role
  switch(role) {
    case "admin":
      window.location.href = "/adminDashboard";
      break;
    case "patient":
      window.location.href = "/patientDashboard";
      break;
    case "doctor":
      window.location.href = "/doctorDashboard";
      break;
    case "loggedPatient":
      window.location.href = "/loggedPatientDashboard";
      break;
    default:
      window.location.href = "/";
      break;
  }
}
