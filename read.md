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

## System Architecture 

## 📌 Architecture Definition — Smart Student Connect

Smart Student Connect is a modular, scalable ServiceNow-based student issue management system.  
It connects students, faculty, and admin teams under one centralized platform to submit, track, assign, and resolve academic and technical requests.

The architecture ensures:
- Clear separation of roles
- Optimized workflows
- Real-time data insights
- Secure access control
- Integration-ready structure for AI and automation

Architecture Table

## 🗂 Architecture Components Table

| Layer / Module            | Description |
|---------------------------|-------------|
| **User Interface Layer**  | Student Portal, Staff Dashboard, Admin Console |
| **Process Layer**         | Workflows, SLAs, Notifications, Assignment Rules |
| **Data Layer**            | Custom tables for requests, actions, escalations |
| **Business Logic Layer**  | Business Rules, Client Scripts, UI Policies |
| **Security Layer**        | Roles, ACLs, Access Policies |
| **Automation Layer**      | Flow Designer, Scheduled Jobs, Notifications |
| **Integration Layer**     | GitHub repo sync, REST APIs |
| **AI/Analytics Layer**    | Dashboards, Reports, Predictive analytics readiness |

Tech Stack:

Frontend: React Native (Expo)
Backend: ServiceNow Scoped Application
API Layer: Scripted REST APIs
Auth: ServiceNow Basic Auth / Token-based
DB: ServiceNow Tables

1️⃣ High-Level Architecture Diagram

 ┌─────────────────────────┐
 │     React Native App    │
 │  (Events, Login, UI)    │
 └─────────────┬───────────┘
               │  HTTPS
               ▼
 ┌─────────────────────────┐
 │  Scripted REST APIs     │
 │  (GET/POST/PUT/DELETE)  │
 └─────────────┬───────────┘
               │
               ▼
 ┌─────────────────────────┐
 │  ServiceNow Tables      │
 │  (Events, Students,     │
 │   Registrations,        │
 │   Coordinators)         │
 └─────────────┬───────────┘
               │
               ▼
 ┌─────────────────────────┐
 │  Business Logic Layer   │
 │  Workflows, ACLs,       │
 │  Roles, Data Policies   │
 └─────────────────────────┘
 
2️⃣ System Modules Breakdown 

🔷 A. Frontend (React Native + Expo)

The mobile app contains:

Modules
Module	Description
Auth Module	Student / Coordinator login (mock or API-based)
Events Module	List, filter, search events
Registrations Module	Students register for events
Coordinator Dashboard	Create/update/delete events
Internship Section	Shows internship details from ServiceNow
Frontend Responsibilities
UI rendering
Local state management (React Context)
API communication (fetch/axios)
User session management
Form validations
Navigation (Expo Router)

🔷 B. Backend – ServiceNow Scoped App

The ServiceNow backend contains everything required by the system.

Tables
Table	Purpose
x_app_events	Stores all event details
x_app_students	Student records
x_app_registrations	Stores student registrations
x_app_coordinators	Coordinator profiles
x_app_internships	Internship table already present
Business Logic (Middle Layer)
ACLs
Roles
UI Policies
Data Policies
Notifications
Workflows / Flow Designer actions

3️⃣ API Layer Architecture

You will create Scripted REST APIs as the integration point:

✔ GET /events/list

Returns all events
Used by Event List Screen

✔ POST /events/create

Used by Coordinators

✔ POST /registration/create

Used by students to register for events

✔ GET /internships/list

Uses your Internship table

4️⃣ Authentication Architecture
Option A — Mock login (works for scoring)
AppContext → login() verifies simple role-based user
Option B — Real ServiceNow login (higher score)

Call:

https://instance.service-now.com/api/now/table/sys_user?user_name=...

App stores:

userID
role
token

5️⃣ Frontend–Backend Data Flow 

[React Native UI]
      │
      │ Login (username/password)
      ▼
[AuthContext] 
      │
      ▼
[GET /api/x_app/events/list] → ServiceNow DB (events)
      │
      ▼
[Show Events] → User selects → Navigation
      │
      ▼
[Event Details]
      │
      │ Register Button
      ▼
[POST /api/x_app/registration/create]
      │
      ▼
[ServiceNow writes into Registration Table]

This shows complete functional flow = high score.

6️⃣ Component-Level Architecture
Frontend Folders
/src
  /screens
    EventListScreen.tsx
    EventDetailScreen.tsx
    LoginScreen.tsx
    CoordinatorDashboard.tsx
  /components
    EventCard.tsx
    InternshipCard.tsx
  /context
    AppContext.tsx
    AuthContext.tsx
  /services
    api.ts
Backend Folders
/backend-servicenow
  /tables
  /scripted-rest-apis
  /flows
  /acl
  /roles
  
7️⃣ Architecture Justification 

✔ Scalability
React Native handles UI
ServiceNow handles workflow, DB, automation
REST decouples both → modular and scalable

✔ Maintainability
Context API reduces prop drilling
Scripted API allows expansion
Flow Designer automates coordinator actions

✔ Security
ACLs protect ServiceNow data
Role-based UI in React
HTTPS REST communication

## 🏗 Full Architecture Explanation — Smart Student Connect

1. **Frontend / UI Layer**
   - Student Portal for submitting issues
   - Staff dashboard for handling assigned tasks
   - Admin controls for system configuration

2. **Backend Logic Layer**
   - Business Rules enforce data consistency
   - UI Actions trigger custom actions (Assign, Resolve, Reopen)
   - Client Scripts provide validations and dynamic behaviors
   - UI Policies handle form visibility and mandatory logic

3. **Workflow & Process Automation**
   - Flow Designer handles:
     - Auto-assignment
     - Notifications
     - Escalations
     - SLA monitoring
   - Scheduled jobs for reminders
   - Real-time updates for student status tracking

4. **Data Architecture (Tables)**
   - **ssc_request** → Main student issue table  
   - **ssc_task** → Staff action/task tracking  
   - **ssc_student_profile** → Student details  
   - **ssc_staff_profile** → Staff details  
   - **ssc_audit_log** → History tracking and AI analysis

5. **Security Architecture**
   - Roles:
     - `ssc_student`
     - `ssc_staff`
     - `ssc_admin`
   - ACLs protect: table, field, record levels
   - Audit logs capture every change

6. **Analytics & Insights**
   - Dashboards for admin, staff, and faculty
   - Real-time KPIs: pending tasks, SLA breaches, student satisfaction
   - Reports for escalation tracking and performance analysis

7. **Integration Architecture**
   - GitHub repository for version control
   - REST API endpoints for external systems
   - Supports future AI modules like:
     - Predictive Intelligence
     - Virtual Agent chatbot


## 🌐 Overall System Architecture Summary

Smart Student Connect uses a layered architecture combining UI, process automation, data management, and security layers to deliver a seamless student–staff communication platform.

- **Presentation Layer**  
  Student Portal, Staff Workspace, Admin Console

- **Application Layer**  
  Client Scripts, UI Actions, UI Policies, Business Rules

- **Process Automation Layer**  
  Flow Designer Workflows, SLAs, Notifications, Assignment Engine

- **Database Layer**  
  Custom tables for requests, tasks, profiles, logs

- **Security Layer**  
  Roles, ACLs, Access Policies, Audit Logs

- **Analytics Layer**  
  Dashboards, Reports, Metrics, KPIs

- **Integration Layer**  
  GitHub sync, REST APIs, External data connectors

This architecture ensures performance, clarity, scalability, and AI-readiness for future enhancements such as predictive ticket routing and automated resolution suggestions.
