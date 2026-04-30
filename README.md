# 💼 InsiderJoobs - A Job Portal Web App

**InsiderJoobs** is a full-featured Job Portal web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It is designed to connect **job seekers** with **recruiters**, allowing users to register, browse jobs, apply, and track applications, while recruiters can post and manage job listings seamlessly.

🌐 **Live Site:** [InsiderJoobs](https://job-portal-app-client-seven.vercel.app/)

---

## 📌 Key Features

### 🧑‍💻 For Job Seekers
- Register and log in to your profile
- View and search job listings
- Filter jobs by category, location, and type
- Apply for jobs and upload resumes
- Track application history

### 🏢 For Recruiters
- Company registration and login
- Create, edit, and delete job postings
- View list of applications for each job
- Manage company profile and listings

### ⚙️ General Features
- Role-based authentication using JWT
- Responsive UI built with **React.js**, **TailwindCSS**, and **ShadCN UI**
- Real-time updates with toast notifications
- RESTful API integration
- Clean and modern UI for a smooth user experience

---

## ⚙️ Tech Stack

| Technology      | Description                      |
|----------------|----------------------------------|
| **React.js**    | Frontend UI Library              |
| **TailwindCSS** | Styling and responsive design    |
| **ShadCN UI**   | Pre-built UI components          |
| **Node.js**     | JavaScript runtime (Backend)     |
| **Express.js**  | Web framework for Node.js        |
| **MongoDB**     | NoSQL Database                   |
| **Mongoose**    | ODM for MongoDB                  |
| **Firebase/Clerk** | (Optional) User auth mgmt     |
| **Axios**       | HTTP client for API calls        |
| **Toastify**    | User-friendly notifications      |

---

## 📂 Folder Structure

InsiderJoobs/
├── client/ # Frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── assets/
│ │ └── App.jsx
├── server/ # Backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
