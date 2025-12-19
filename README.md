# 🏥 Smart Clinic Management System

A **backend project for managing clinics**, built with **Spring Boot**, **Java 17**, **Maven**, **MySQL**, **MongoDB**, and **Docker**.  
It supports secure management of **doctors, patients, appointments, and prescriptions**, using both **REST APIs** and **Thymeleaf dashboards**.

---

## 🚀 Features

- 🔐 **Admin, Doctor, and Patient roles** with JWT authentication  
- 📡 **RESTful APIs** for:
  - Appointments
  - Patients
  - Doctors
  - Prescriptions
- 🖥️ **Thymeleaf dashboards** for Admin and Doctor
- 🗄️ **MySQL** for structured data (patients, doctors, appointments, admin)
- 📄 **MongoDB** for prescription storage
- 🐳 **Docker support** for easy deployment

---

## 📁 Project Structure

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


---

## 🛠️ Technology Stack

- **Java 17**
- **Spring Boot 3.x**
- **Spring Data JPA** (MySQL)
- **Spring Data MongoDB**
- **Thymeleaf**
- **JWT Authentication**
- **Docker**

---

## 🗃️ Database Design

### MySQL
- patients  
- doctors  
- appointments  
- admin  
- payments  

### MongoDB
- prescriptions collection

---

## 🧱 Architecture

- **MVC + REST**
  - Thymeleaf for dashboards
  - REST APIs for integration
- **Service Layer**
  - Business logic and validation
- **Repository Layer**
  - JPA for MySQL
  - MongoRepository for MongoDB

---

## 👤 User Stories

See **`user_stories.md`** for detailed requirements for Admin, Doctor, and Patient roles.

---

## 🐳 Docker Usage

### Build the image
```bash
docker build -t java-database-capstone .
