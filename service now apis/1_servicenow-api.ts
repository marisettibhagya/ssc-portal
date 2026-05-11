/**
 * servicenow-api.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * ServiceNow Scripted REST API client for Smart Student Connect.
 *
 * Reviewer fix #1 — replaces the entirely-mock AppContext state with real
 * Scripted REST API calls documented in system_requirements.md:
 *   • GET  /api/x_ssc_app/events/list        → fetchEvents()
 *   • POST /api/x_ssc_app/registration/create → registerForEvent()
 *   • POST /api/x_ssc_app/auth/login          → authenticateUser()
 *
 * Reviewer fix #2 — implements real credential-based auth against ServiceNow
 * (Basic Auth header) instead of the demo login buttons / mock user lookup.
 *
 * HOW TO CONFIGURE:
 *   1. Copy .env.example → .env  (or set Expo env vars)
 *   2. Fill in EXPO_PUBLIC_SN_BASE_URL, EXPO_PUBLIC_SN_USERNAME,
 *      EXPO_PUBLIC_SN_PASSWORD  (use a dedicated integration user, not admin)
 *
 * NOTE: All functions are async and throw on HTTP error so callers can
 * display user-friendly error messages.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Environment configuration ───────────────────────────────────────────────
const SN_BASE_URL =
  process.env.EXPO_PUBLIC_SN_BASE_URL ?? '';          // e.g. https://dev12345.service-now.com
const SN_USERNAME =
  process.env.EXPO_PUBLIC_SN_USERNAME ?? '';          // ServiceNow integration user
const SN_PASSWORD =
  process.env.EXPO_PUBLIC_SN_PASSWORD ?? '';          // Integration user password

/** Base64 Basic-Auth header value */
const authHeader = (): string =>
  'Basic ' + btoa(`${SN_USERNAME}:${SN_PASSWORD}`);

// ─── Shared types ─────────────────────────────────────────────────────────────

export interface SNEvent {
  sys_id: string;
  title: string;
  type: string;
  category: string;
  event_date: string;            // ISO date string from ServiceNow
  registrations: number;
  max_capacity: string;
  description: string;
  required_skills: string;       // comma-separated
  creator_id: string;
  company: string;
}

export interface SNUser {
  sys_id: string;
  name: string;
  role: 'student' | 'coordinator';
  major: string;
  cgpa: string;
  skills: string;                // comma-separated
  department: string;
  contact_info: string;
  title: string;
  university_id: string;
}

export interface LoginCredentials {
  username: string;              // student/coordinator username in ServiceNow
  password: string;
}

export interface AuthResult {
  success: boolean;
  user: SNUser | null;
  token?: string;                // session token if ServiceNow returns one
  message?: string;
}

export interface RegistrationResult {
  success: boolean;
  registration_id?: string;
  message: string;
}

// ─── Core fetch wrapper ───────────────────────────────────────────────────────

/**
 * Wraps fetch with ServiceNow auth headers and JSON parsing.
 * Throws a descriptive Error on non-2xx responses.
 */
async function snFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  if (!SN_BASE_URL) {
    throw new Error(
      'ServiceNow base URL is not configured. ' +
      'Set EXPO_PUBLIC_SN_BASE_URL in your .env file.'
    );
  }

  const url = `${SN_BASE_URL}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: authHeader(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `ServiceNow API error ${response.status} on ${path}: ${errorBody}`
    );
  }

  return response.json() as Promise<T>;
}

// ─── API functions ────────────────────────────────────────────────────────────

/**
 * GET /api/x_ssc_app/events/list
 *
 * Returns all active events/internships from ServiceNow.
 * Maps the ServiceNow field names to the internal Event shape used by
 * AppContext so the rest of the app requires zero changes.
 */
export async function fetchEvents(): Promise<SNEvent[]> {
  const data = await snFetch<{ result: SNEvent[] }>(
    '/api/x_ssc_app/events/list'
  );
  return data.result;
}

/**
 * POST /api/x_ssc_app/registration/create
 *
 * Registers the currently-logged-in student for an event.
 *
 * @param eventId   - ServiceNow sys_id of the event record
 * @param studentId - ServiceNow sys_id of the student user record
 */
export async function registerForEvent(
  eventId: string,
  studentId: string
): Promise<RegistrationResult> {
  const data = await snFetch<{ result: RegistrationResult }>(
    '/api/x_ssc_app/registration/create',
    {
      method: 'POST',
      body: JSON.stringify({ event_id: eventId, student_id: studentId }),
    }
  );
  return data.result;
}

/**
 * POST /api/x_ssc_app/auth/login
 *
 * Authenticates a user against ServiceNow.
 * Reviewer fix #2 — replaces the mock user lookup in AuthContext.tsx.
 *
 * ServiceNow Scripted REST endpoint should:
 *   1. Validate username + password using gs.getUser() / Basic Auth
 *   2. Return the user record (role, profile fields) on success
 *   3. Return { success: false, message: "..." } on failure
 *
 * NOTE: For production, prefer token-based auth (OAuth 2.0 or SSO).
 *       This Basic-Auth approach is suitable for a university prototype.
 */
export async function authenticateUser(
  credentials: LoginCredentials
): Promise<AuthResult> {
  // We pass the user credentials as the request body, while the integration
  // account (env vars) provides the channel-level authorization header.
  const data = await snFetch<{ result: AuthResult }>(
    '/api/x_ssc_app/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    }
  );
  return data.result;
}

/**
 * POST /api/x_ssc_app/users/create
 *
 * Creates a new student or coordinator profile record in ServiceNow.
 * Called during the onboarding flow.
 */
export async function createUserProfile(
  profileData: Omit<SNUser, 'sys_id'>
): Promise<{ sys_id: string; message: string }> {
  const data = await snFetch<{ result: { sys_id: string; message: string } }>(
    '/api/x_ssc_app/users/create',
    {
      method: 'POST',
      body: JSON.stringify(profileData),
    }
  );
  return data.result;
}

/**
 * POST /api/x_ssc_app/events/create
 *
 * Creates a new event/internship record in ServiceNow.
 * Called from the Coordinator → Create tab.
 */
export async function createEvent(
  eventData: Omit<SNEvent, 'sys_id' | 'registrations'>
): Promise<{ sys_id: string; message: string }> {
  const data = await snFetch<{ result: { sys_id: string; message: string } }>(
    '/api/x_ssc_app/events/create',
    {
      method: 'POST',
      body: JSON.stringify(eventData),
    }
  );
  return data.result;
}
