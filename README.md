# Smart Clinic Management System

A backend project for managing clinics, built with **Spring Boot**, **Java 17**, **Maven**, **MySQL**, **MongoDB**, and **Docker**.  
It supports secure management of doctors, patients, appointments, and prescriptions, with both **REST APIs** and **Thymeleaf dashboards**.

---

## Features

- Admin, Doctor, and Patient roles with JWT authentication
- RESTful APIs for appointments, patients, doctors, and prescriptions
- Thymeleaf dashboards for Admin and Doctor
- MySQL for structured data (patients, doctors, appointments, admin)
- MongoDB for prescription storage
- Docker support for easy deployment

---

## Project Structure

```text
app/
├── Dockerfile
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── project/
│   │   │           └── back_end/
│   │   │               ├── config/
│   │   │               ├── controllers/
│   │   │               ├── models/
│   │   │               ├── repo/
│   │   │               ├── services/
│   │   │               └── BackEndApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── static/
│   │       └── templates/
│   └── test/
└── README.md
