1. Admin Login
Title:
As an admin, I want to log into the portal using my username and password, so that I can manage the platform securely.

Acceptance Criteria:

Admin can enter a valid username and password
System authenticates credentials successfully
Admin is redirected to the admin dashboard
Priority: High

Story Points: 3

Notes:

Invalid credentials should display an error message

2. Admin Logout
Title:
As an admin, I want to log out of the portal, so that system access remains protected.

Acceptance Criteria:

Admin can log out from any page
Session is terminated after logout
Admin is redirected to the login page
Priority: Medium

Story Points: 2

Notes:

Logout should invalidate the session token

3. Add Doctor Profile
Title:
As an admin, I want to add doctors to the portal, so that patients can book appointments with them.

Acceptance Criteria:

Admin can enter doctor details (name, specialization, contact)
Doctor profile is saved successfully
Newly added doctor appears in the doctor list
Priority: High

Story Points: 5

Notes:

Doctor email should be unique

4. Delete Doctor Profile
Title:
As an admin, I want to delete a doctor’s profile from the portal, so that inactive doctors are removed.

Acceptance Criteria:

Admin can select a doctor profile
System confirms deletion before removing
Doctor profile is no longer visible after deletion
Priority: Medium

Story Points: 3

Notes:

Deletion should not remove historical appointment data

5. View Monthly Appointment Statistics
Title:
As an admin, I want to run a stored procedure in the MySQL CLI to retrieve the number of appointments per month, so that I can track usage statistics.

Acceptance Criteria:

Stored procedure executes successfully in MySQL CLI
Monthly appointment counts are returned accurately
Results can be used for reporting purposes
Priority: Low

Story Points: 5

Notes:

Stored procedure should handle months with zero appointments

6. View Doctors Without Login
Title:
As a patient, I want to view a list of doctors without logging in, so that I can explore options before registering.

Acceptance Criteria:

Doctor list is accessible without authentication
Doctor details include name and specialization
Patient is prompted to sign up when attempting to book
Priority: Medium

Story Points: 3

Notes:

Booking actions should require login

7. Patient Sign Up
Title:
As a patient, I want to sign up using my email and password, so that I can book appointments.

Acceptance Criteria:

Patient can register using a valid email and password
Duplicate email registrations are prevented
Successful registration confirmation is displayed
Priority: High

Story Points: 5

Notes:

Password must meet security requirements

8. Patient Login
Title:
As a patient, I want to log into the portal, so that I can manage my bookings.

Acceptance Criteria:

Patient can log in using valid credentials
Patient is redirected to the dashboard
Invalid login attempts show an error message
Priority: High

Story Points: 3

Notes:

Account lockout after multiple failed attempts (optional)

9. Patient Logout
Title:
As a patient, I want to log out of the portal, so that my account remains secure.

Acceptance Criteria:

Patient can log out from any page
Session is terminated successfully
Patient is redirected to the login page
Priority: Medium

Story Points: 2

Notes:

Logout should invalidate the session token

10. Book Doctor Appointment
Title:
As a patient, I want to log in and book an hour-long appointment with a doctor, so that I can consult with them.

Acceptance Criteria:

Patient can select a doctor and available time slot
Appointment duration is fixed at one hour
Booking confirmation is displayed
Priority: High

Story Points: 5

Notes:

Double-booking should be prevented

11. View Upcoming Appointments
Title:
As a patient, I want to view my upcoming appointments, so that I can prepare accordingly.

Acceptance Criteria:

Patient can see a list of upcoming appointments
Appointment date, time, and doctor name are displayed
Past appointments are excluded from the list
Priority: Medium

Story Points: 3

Notes:

Appointments should be sorted by date

12. Doctor Login
Title:
As a doctor, I want to log into the portal, so that I can manage my appointments.

Acceptance Criteria:

Doctor can log in using valid credentials
Doctor is redirected to the dashboard
Invalid login attempts display an error message
Priority: High

Story Points: 3

Notes:

Access should be limited to doctor role only

13. Doctor Logout
Title:
As a doctor, I want to log out of the portal, so that my data remains protected.

Acceptance Criteria:

Doctor can log out from any page
Session is terminated successfully
Doctor is redirected to the login page
Priority: Medium

Story Points: 2

Notes:

Logout should invalidate the session token

14. View Appointment Calendar
Title:
As a doctor, I want to view my appointment calendar, so that I can stay organized.

Acceptance Criteria:

Doctor can view a calendar of scheduled appointments
Appointment times and patient names are visible
Calendar updates in real time when appointments change
Priority: High

Story Points: 5

Notes:

Calendar view can be daily or weekly

15. Mark Doctor Unavailability
Title:
As a doctor, I want to mark my unavailability, so that patients can only see available time slots.

Acceptance Criteria:

Doctor can block unavailable dates or times
Blocked slots are not shown to patients
Changes take effect immediately
Priority: High

Story Points: 5

Notes:

Unavailability should override existing availability

16. Update Doctor Profile
Title:
As a doctor, I want to update my profile with specialization and contact information, so that patients have up-to-date information.

Acceptance Criteria:

Doctor can edit specialization and contact details
Updated information is saved successfully
Changes are visible to patients
Priority: Medium

Story Points: 3

Notes:

Some fields may require admin approval

17. View Patient Details for Appointments
Title:
As a doctor, I want to view patient details for upcoming appointments, so that I can be prepared.

Acceptance Criteria:

Doctor can view patient name and basic details
Information is accessible only for assigned appointments
Data is displayed securely
Priority: Medium

Story Points: 3

Notes:

Medical history access may be read-only
