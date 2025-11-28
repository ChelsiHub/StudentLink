## 🏆 StudentLink: MERN Stack Student Networking & Academic Platform


> **A full-stack MERN web platform built to streamline student networking, academic collaboration, and resource sharing. Designed with clean architecture, secure authentication, reusable components, and scalable backend APIs — demonstrating capability for MNC-level Full-Stack Developer roles.**


---

## ✨ Core Feature Showcase

This project simulates a real-world social-academic environment, demonstrating expertise in full-stack feature implementation:

### 👤 Student & User Management
* 🔐 **Secure Authentication:** Implemented robust user registration and login using **JWT** (JSON Web Tokens) for session management and **bcrypt** for secure password hashing.
* 🤝 **Networking & Profiles:** Users can create, update, and customize detailed student profiles and connect with peers.
* 📚 **Academic Resource Sharing:** Functionality to share and upload study materials with real-time feedback and updates.

### 🧑‍💼 Administrative & Design
* 📊 **Professional UI/UX:** Built with **Material UI** and custom CSS for a modern, responsive, and clean dashboard interface.
* 📱 **Fully Responsive:** Tested and optimized for flawless performance across all mobile, tablet, and desktop viewports.
* 👥 **Admin Management:** Dedicated (or planned) features for account management and moderation of shared resources.

---

## 🛠️ Production-Ready Tech Stack

This solution utilizes the industry-standard **MERN Stack**, highlighting proficiency in building scalable and decoupled applications.

### 💻 Frontend (The Presentation Layer)
| Tech | Detail | Badge |
| :--- | :--- | :--- |
| **React.js** | Used for the component-based UI architecture. | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) |
| **React Router** | For client-side routing and seamless page navigation. | ![Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) |
| **Axios** | Efficient HTTP client for API interaction. | ![Axios](https://img.shields.io/badge/Axios-5a29e4?style=for-the-badge&logo=axios&logoColor=white) |
| **Material UI** | Comprehensive UI component library for consistent design. | ![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white) |

### ⚙️ Backend (The Application Layer)
| Tech | Detail | Badge |
| :--- | :--- | :--- |
| **Node.js** | Asynchronous, event-driven runtime for performance. | ![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) |
| **Express.js** | Minimalist web framework for building **RESTful API architecture**. | ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) |
| **Mongoose** | Elegant MongoDB object modeling. | ![Mongoose](https://img.shields.io/badge/Mongoose-800?style=for-the-badge&logo=mongoose&logoColor=white) |
| **MongoDB Atlas** | Distributed NoSQL database for flexible data modeling. | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) |

### 🛡 Security & Architecture
| Concept | Implementation |
| :--- | :--- |
| **Authentication** | JWT (JSON Web Tokens) for Stateless API Security |
| **Hashing** | bcrypt for Password Security |
| **Validation** | Data validation and sanitization for clean data integrity |
| **Architecture** | **Modular Folder Structure** for high maintainability and low coupling |

---

## 🏗️ Architecture & Organization

The codebase follows a structured, modular organization to ensure scalability and ease of debugging—a key requirement for large team environments.
## 📁 Project Structure — StudentLink
```text
StudentLink/
│
├── backend/
│   ├── controllers/   # Business Logic
│   ├── models/        # Data Schemas (Mongoose)
│   ├── routes/        # API Endpoints (Express Router)
│   ├── config/        # Environment and DB connection
│   └── server.js      # Entry Point
│
├── frontend/
│   ├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Screen-level views
│   └── index.js       # React Entry
│
├── .env.example
└── package.json
```
---

## ⚙️ Installation & Local Setup

Follow the steps below to run **StudentLink** on your local machine.



### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ChelsiHub/StudentLink.git
cd StudentLink
```

### 2️⃣ Backend Setup & Environment Variables

Navigate to the backend folder and install all dependencies:

```bash
cd backend
npm install
```
Create a **.env** file inside the `backend` directory and add the following environment variables:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=a_long_complex_secret_key
PORT=5000
```
Start the server:

```bash
npm start
```
The server will be running at:

👉 **http://localhost:5000**
### 3️⃣ Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```
Start the client application:

```bash
npm start
```
The frontend will open automatically at:

👉 **http://localhost:3000**

---

## 🔗 API Endpoints (RESTful Design)

A clean and intuitive RESTful structure ensures predictable and maintainable API interactions:
| Method | Endpoint | Description | Requires Auth |
|--------|---------|------------|---------------|
| POST   | /api/auth/register | Register New Student Account | No |
| POST   | /api/auth/login    | Authenticate and Receive JWT Token | No |
| GET    | /api/students     | Fetch All Student Profiles | Yes |
| PUT    | /api/profile/update | Update Authenticated User's Profile | Yes |
| POST   | /api/resources    | Upload New Academic Resources | Yes |

---

## 📸 Screenshots (Visual Proof of Concept)

These visuals showcase the modern UI/UX and professional data presentation standards used in the application:

![Dashboard View](./screenshots/dashboard.png)
![Student Profile](./screenshots/profile.png)
![Resource Upload](./screenshots/resource-upload.png)

---

## 👩‍💻 Developer & Contact

**Chelsi Patoliya | Full-Stack MERN Developer**

Showcasing proficiency in building scalable, secure, and well-architected web applications.

**Contact Information:**

- 📧 Email: chelsipatoliya@gmail.com  
- 📱 Phone: +91 9313373532  
- 🔗 LinkedIn: [https://www.linkedin.com/in/chelsipatoliya0316](https://www.linkedin.com/in/chelsipatoliya0316)  
- 💻 GitHub: [https://github.com/ChelsiHub](https://github.com/ChelsiHub)  

---

## 🤝 Contributions

Open to suggestions, feature requests, and improvements.  
Please feel free to fork the repository and submit a **Pull Request**!
