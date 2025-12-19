# 🏥 Smart Clinic Management System  
## Architecture Design

---

## 🧩 1️⃣ Architecture Overview

The **Smart Clinic Management System** is built using **Spring Boot** and follows a **hybrid architecture** that combines:

- **MVC (Model–View–Controller)** for server-rendered web dashboards  
- **RESTful APIs** for data-driven modules and external clients

### 🎨 Presentation Layer
- **Admin Dashboard** → Thymeleaf (HTML rendering)
- **Doctor Dashboard** → Thymeleaf
- **Patient Modules & Appointments** → REST APIs (JSON)

### 🗄️ Data Storage Strategy
The system integrates **two databases** to balance structure and flexibility:

| Database | Purpose |
|--------|--------|
| **MySQL** | Structured data (patients, doctors, appointments, admins) |
| **MongoDB** | Flexible documents (prescriptions, doctor notes) |

### 🏗️ Layered Design
All incoming requests follow a clean layered flow:

**Controller → Service → Repository → Database**

- Controllers handle request routing
- Services manage business logic
- Repositories abstract database operations
- Databases store persistent data

---

## 🔄 2️⃣ Data & Control Flow (Step-by-Step)

### ① User Interaction
Users interact with the system via:
- Web dashboards (Admin / Doctor)
- REST clients (mobile apps, frontend modules)

---

### ② Controller Layer
Handles incoming requests:

- **MVC Controllers**
  - Return Thymeleaf `.html` templates
- **REST Controllers**
  - Return JSON responses

---

### ③ Service Layer
The heart of the application:

- Business rules & validations
- Appointment workflows
- Patient and doctor logic
- Transaction management

---

### ④ Repository Layer
Responsible for data access:

- **Spring Data JPA**
  - Communicates with MySQL
- **Spring Data MongoDB**
  - Communicates with MongoDB

---

### ⑤ Databases
- **MySQL**
  - Relational integrity
  - Foreign keys & transactions
- **MongoDB**
  - Schema-less, flexible prescription data

---

### ⑥ Model Binding
Data is mapped to Java models:

| Database | Annotation |
|--------|------------|
| MySQL | `@Entity` |
| MongoDB | `@Document` |

---

### ⑦ Response to Client
- **MVC Flow**
  - Model → Thymeleaf → HTML
- **REST Flow**
  - Model / DTO → JSON API response

---

## 🌟 Key Architectural Benefits

✅ Clear separation of concerns  
✅ Scalable and maintainable codebase  
✅ Supports both web UI and API consumers  
✅ Optimized for structured and unstructured data  
✅ Easy to extend with security, caching, or microservices  

---

> 💡 This architecture ensures flexibility, performance, and long-term scalability while keeping the codebase clean and easy to manage.

