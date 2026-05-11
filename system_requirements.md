1️⃣ Functional Requirements

1. User Management
Students must be able to:
Create/login to their account
View upcoming events
Register for events
View their registered events
View internship opportunities
Coordinators must be able to:
Login with coordinator role
Create new events
Update existing events
Delete events
View list of registered students

2. Events Management

The system must allow:

Student Side:

✔ Browse all events
✔ Filter events by type (Technical / Cultural / Hackathon / Sports)
✔ View event details
✔ Register for events

Coordinator Side:

✔ Create events with fields:

Event name
Description
Date
Time
Venue
Department
Max participants
Registration status (Open/Closed)

✔ Edit events
✔ Delete events

3. Registrations Module

System should support:

Student → event registration
Prevent duplicate registrations
Show success/failure message
Store all registrations in ServiceNow
Coordinator can view registration list

4. Internship Module
Fetch internship details from ServiceNow table
Display internships in the app
Show:
Position
Company
Stipend
Duration
Apply link

5. REST API Integration

The mobile app must consume ServiceNow REST APIs.

Required APIs:
GET /events/list
Returns all event records
POST /events/create
For coordinators to create a new event
PUT /events/update/{sys_id}
For editing event
DELETE /events/delete/{sys_id}
For removing event
POST /registration/create
Stores student registration
GET /internships/list
Returns internship entries

2️⃣ Non-Functional Requirements

1. Performance Requirements
API response time must be < 2 seconds
UI screens should load under 1 second
Database queries must be optimized
2. Security Requirements
ServiceNow ACLs must restrict data access
Role-based access:
Students cannot create/edit/delete events
Coordinators cannot modify student personal data
API must use HTTPS only
API credentials must not be stored in plain text
3. Reliability Requirements
System must handle offline mode gracefully
Sync should retry if network fails
Error screens must show proper messages
4. Usability Requirements
Mobile app should have simple and intuitive UI
All screens must follow consistent theme
Navigation must be smooth and predictable
5. Compatibility Requirements
Should run on Android 8+
Should support iOS 12+
API should work with all ServiceNow releases (Tokyo / Utah / Vancouver)

3️⃣ ServiceNow Backend Requirements
Tables to Create
Table	Purpose
x_uceims_events	Stores events
x_uceims_students	Student profile data
x_uceims_registrations	Stores event registrations
x_uceims_coordinators	Coordinator details
x_uceims_internships	Internship postings
Roles to Create
Role	Privileges
student	View & register events
coordinator	Create/update/delete events
admin	Full access
ACL Requirements
Students → read events, create registration
Coordinators → create/update/delete events
Only admin → modify roles, tables, API keys
Workflow Requirements

Flow Designer must automate:

Email notification on event creation
Notification when registration happens
Reminder 24 hours before an event

4️⃣ Frontend (React Native) Requirements
UI Screens Needed
Student Screens:
Login screen
Events list screen
Event details screen
Registration confirmation screen
My registrations screen
Internship list screen
Coordinator Screens:
Login screen
Dashboard
Create event screen
Edit event screen
View registrations screen
Frontend Technical Requirements
Use Context API for state management
Use Axios/fetch for API calls
Use Expo Router for navigation
Use TypeScript interfaces for data models
No hardcoded mock data (replace with API data)

5️⃣ API & Data Requirements
Request Format

JSON must be used.

Example:

{
  "event_name": "Hackathon 2025",
  "description": "24-hour coding event",
  "department": "CSE"
}
Response Format

ServiceNow default JSON response:

{
  "result": [
    {
      "sys_id": "123abc",
      "event_name": "Hackathon 2025"
    }
  ]
}
