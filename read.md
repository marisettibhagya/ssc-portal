# Smart Student Connect

Smart Student Connect is a full-stack web platform designed to centralize **community events**, **skill-development opportunities**, and **internships** for college students.  
The system connects students, teams, clubs, faculty coordinators, and industry partners through a unified and intelligent digital experience.

---

## 🚀 Project Overview

Smart Student Connect helps students:
- Create a digital student profile  
- Discover campus events (hackathons, sports, cultural programs, workshops)  
- Join or create teams for events  
- Explore internships and skill-based opportunities  
- Receive AI-based recommendations for events and internships  

The backend is powered by **ServiceNow**, and the frontend is built with **React**.  
The platform uses **REST APIs** for real-time communication between the web client and ServiceNow.

---

## 🧠 Key Features

### **1. Student Profile**
- Personal info, skills, interests, achievements
- One-time setup, editable anytime
- AI uses the profile for recommendations

### **2. Community Services**
- View all active college events
- Register as **Team Leader** or **Team Member**
- Team Leader approval workflow
- Real-time notifications from ServiceNow

### **3. Skill Services**
- List of internships and skill programs
- Skill-based filtering
- Direct apply + application tracking

### **4. AI Recommendation Engine**
- Suggests suitable events based on skills & interests
- Recommends internships using profile matching  
- Integrated AI chatbot for fast Q&A

### **5. Admin Tools (ServiceNow)**
- Custom tables  
- Access Controls (ACLs)  
- Roles & Permissions  
- Flow Designer workflows  
- Notification engine  
- REST API integration  

---

## 🛠 Tech Stack

### **Frontend**
- React  
- React Router  
- Axios  
- TailwindCSS / Material UI (optional)

### **Backend (ServiceNow)**
- Custom Tables  
- Script Includes  
- Flow Designer  
- Business Rules  
- ACLs  
- ServiceNow REST API  

### **AI**
- Recommendation Logic  
- AI Chat Assistant  
- Skill-Matching Algorithm  

---

## 📐 System Architecture
         ┌────────────────────────────┐
         │        React Frontend       │
         │  - Profile UI               │
         │  - Event & Internship UI    │
         │  - Team Management          │
         │  - AI Assistant             │
         └─────────────▲──────────────┘
                       │ REST API (Axios)
                       ▼
┌──────────────────────────────────────────────────┐
│                ServiceNow Backend                 │
│  - Custom Tables (Student, Events, Teams)        │
│  - Scripted REST APIs                            │
│  - ACL Security                                  │
│  - Flow Designer Workflows                       │
│  - Business Rules                                │
└───────────────▲──────────────────────────────────┘
                │
                ▼
     ┌─────────────────────────┐
     │   AI Recommendation     │
     │ - Skill Matching        │
     │ - Event Suggestion      │
     │ - Internship Ranking    │
     └─────────────────────────┘

## 📁 Folder Structure

smart-student-connect/
│
├── client/ (React)
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── hooks/
│ │ ├── services/
│ │ │ └── api.js
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
└── service-now/ (Backend)
├── tables/
├── script-includes/
├── flows/
├── acl-rules/
└── api-endpoints/


---

## 🧩 ServiceNow Tables

| Table Name | Purpose |
|-----------|---------|
| **u_student_profile** | Student personal and skill info |
| **u_events** | Hackathons, sports, cultural events |
| **u_teams** | Team creation & mapping |
| **u_internships** | Skill services & internships |
| **u_applications** | Internship applications |
| **u_ai_recommendations** | AI suggestion tracking |

---

## 🔐 ACL Setup (Security)

Each table has:
- Read ACL  
- Write ACL  
- Create ACL  
- Delete ACL  
- Script conditions for role-based access  

Example ACL Script:

```javascript
answer = gs.hasRole('student') || gs.hasRole('admin');

🔗 API Endpoints (ServiceNow → React)
Get all events
GET /api/x_smart/events
Create student profile
POST /api/x_smart/student
Join a team
POST /api/x_smart/team/join
Get recommended items
GET /api/x_smart/recommendations
Apply for internship
POST /api/x_smart/internship/apply

⚙️ React Frontend Setup
cd client
npm install
npm start

In api.js:

export const instance = axios.create({
  baseURL: "https://<instance>.service-now.com",
  auth: {
    username: "<user>",
    password: "<pwd>"
  }
});

🚀 Running the Project

1. Configure ServiceNow tables, API, flows, ACLs
2. Connect React using REST API
3. Deploy React on Netlify/Vercel
4. Use ServiceNow as live backend

📌 Why Smart Student Connect?

Removes communication gaps
One-stop solution for all opportunities
Boosts participation and visibility
Industry connection + campus engagement
AI that understands and guides every student

🤝 Contributing

We welcome contributions to make Smart Student Connect better.
How to Contribute
# 1. Fork the repositoryClick on the "Fork" button at the top-right of this repo.
# 2. Create a new feature branchgit checkout -b feature/AmazingFeature
#3. Commit your changesgit commit -m "Add AmazingFeature"
# 4. Push your branchgit push origin feature/AmazingFeature
# 5. Open a Pull RequestSubmit your PR for review.




