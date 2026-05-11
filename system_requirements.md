SMART STUDENT CONNECT - SYSTEM REQUIREMENTS

1️⃣ Functional Requirements

These describe what the system must do.

1. User Management
The system shall allow Students, Faculty, and Admins to register/login.
The system shall verify users with authentication and optional role-based access.
The system shall allow Admin to manage user roles and permissions.

2. Student Request Module
The system shall allow students to submit new requests (academic issues, facility issues, mentoring needs).
The system shall validate mandatory fields: category, description, priority.
The system shall auto-generate a unique request number.
The system shall send notifications upon request creation, assignment, and resolution.

3. Faculty Task Assignment
The system shall allow Admin/Coordinator to assign requests to faculty.
The system shall notify faculty when a task is assigned.
The system shall allow faculty to update status (In Progress, On Hold, Resolved).

4. Real-Time Dashboard
The system shall display student request counts, open/closed tasks, priority distribution.
The system shall allow filtering by date, problem category, priority, and faculty name.
The system shall show trend charts for performance and workload.

5. Communication / Notifications
The system shall send email and in-app notifications for:
Request submission
Faculty assignment
Status updates
Request resolution
Feedback requests

6. Feedback Collection
The system shall allow students to submit feedback after resolution.
The system shall store feedback for analytics.

7. Reporting Module
The system shall generate reports for:
Request status summary
Faculty workload
Resolution time analysis
Category-wise problem distribution
Reports shall support PDF/CSV export.

2️⃣ Non-Functional Requirements

These describe how the system should operate.

1. Performance
The system shall load dashboards within 3 seconds.
The system shall process request submissions within 1 second.

3. Scalability
The system shall support growth to 10,000 student records.
APIs shall be scalable to handle concurrent requests without degradation.

4. Security
The system shall enforce role-based access using ACLs.
Sensitive data like student details shall be encrypted at rest.
All API calls shall require authentication tokens.

5. Reliability
The system shall maintain 99% uptime.
The system shall allow restoring data from backup in case of failure.

6. Usability
The system shall be accessible on mobile, tablet, and desktop.
The system UI shall follow consistent design and navigation principles.
7. Maintainability
The system shall follow modular architecture for easy updates.
All business rules, UI actions, and flows shall be documented for maintainability.

3️⃣ System Architecture Requirements

These describe how components interact.

1. Frontend (React Web Application)
The frontend shall use REST API to connect with ServiceNow.
The frontend shall include:
Student Portal
Faculty Dashboard
Admin Control Panel

3. Backend (ServiceNow)
ServiceNow shall store all data in custom tables:
u_student_request
u_faculty_task
u_feedback
u_user_profile
ServiceNow shall handle:
Workflows
Notifications
ACLs
Reports & Dashboards
Business Rules

4. API Requirements
The system shall expose ServiceNow REST APIs:
Table API
Query API
Import API (optional)
All calls shall use Basic Auth or OAuth tokens.
All responses shall be in JSON format.

4️⃣ Integration Requirements
1. React ↔ ServiceNow Integration
The system shall connect using the ServiceNow Table API endpoint:
/api/now/table/u_student_request
The system shall use:
GET (fetch data)
POST (create request)
PUT/PATCH (update status)
The system shall store API base URL and credentials in environment variables.
2. Email Integration
The system shall use ServiceNow OOB email system to send notifications.
3. Authentication Integration
The system shall use ServiceNow user table (sys_user) for login validation.

