/**
 * AppContext.tsx  — IMPROVED
 * ─────────────────────────────────────────────────────────────────────────────
 * Reviewer fix #1: Replaced the entirely-mock state with real ServiceNow
 *   Scripted REST API calls via services/servicenow-api.ts.
 *   • Events are loaded from GET  /api/x_ssc_app/events/list
 *   • Registrations are posted to POST /api/x_ssc_app/registration/create
 *   • User creation calls POST /api/x_ssc_app/users/create
 *
 * Reviewer fix #2: Login now calls POST /api/x_ssc_app/auth/login instead of
 *   a simple array .find() on hard-coded mock users.
 *
 * The context exposes { isLoading, apiError } so screens can show spinners
 * and error banners instead of silently failing.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {
  fetchEvents,
  authenticateUser,
  registerForEvent as apiRegisterForEvent,
  createUserProfile,
  createEvent as apiCreateEvent,
  SNEvent,
  SNUser,
  LoginCredentials,
} from '../services/servicenow-api';

// ─── Domain types ─────────────────────────────────────────────────────────────

export type UserRole = 'student' | 'coordinator';

export interface BaseUser {
  id: string;       // maps to ServiceNow sys_id
  role: UserRole;
  name: string;
}

export interface Student extends BaseUser {
  role: 'student';
  major?: string;
  cgpa?: number;
  skills?: string[];
  appliedEvents?: string[];
  phone?: string;
  universityId?: string;
  resumeLink?: string;
}

export interface Coordinator extends BaseUser {
  role: 'coordinator';
  department?: string;
  contactInfo?: string;
  title?: string;
}

export type User = Student | Coordinator;

export interface Event {
  id: string;
  creatorId: string;
  type: string;
  category: string;
  title: string;
  date: string;
  registrations: number;
  company?: string;
  requiredSkills?: string[];
  description?: string;
  maxCapacity?: string;
}

// ─── Context shape ────────────────────────────────────────────────────────────

interface AppContextType {
  currentUser: User | null;
  events: Event[];
  isLoading: boolean;
  apiError: string | null;

  /** Authenticate with ServiceNow credentials (fix #2) */
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;

  /** Create user profile in ServiceNow and auto-login (fix #1) */
  registerUser: (user: Omit<User, 'id'>) => Promise<void>;

  /** Post a new event to ServiceNow (fix #1) */
  createEvent: (event: Omit<Event, 'id' | 'registrations'>) => Promise<void>;

  /** Register student for an event in ServiceNow (fix #1) */
  registerForEvent: (eventId: string) => Promise<void>;

  /** Reload events from ServiceNow on demand */
  refreshEvents: () => Promise<void>;
}

// ─── Helpers: shape converters ────────────────────────────────────────────────

/** Maps a ServiceNow event record to the local Event shape */
function snEventToLocal(sn: SNEvent): Event {
  return {
    id: sn.sys_id,
    creatorId: sn.creator_id,
    type: sn.type,
    category: sn.category,
    title: sn.title,
    date: sn.event_date,
    registrations: sn.registrations,
    company: sn.company || undefined,
    requiredSkills: sn.required_skills
      ? sn.required_skills.split(',').map((s) => s.trim())
      : undefined,
    description: sn.description || undefined,
    maxCapacity: sn.max_capacity || undefined,
  };
}

/** Maps a ServiceNow user record to the local User shape */
function snUserToLocal(sn: SNUser): User {
  if (sn.role === 'student') {
    return {
      id: sn.sys_id,
      role: 'student',
      name: sn.name,
      major: sn.major || undefined,
      cgpa: sn.cgpa ? parseFloat(sn.cgpa) : undefined,
      skills: sn.skills ? sn.skills.split(',').map((s) => s.trim()) : [],
      universityId: sn.university_id || undefined,
      appliedEvents: [],
    } satisfies Student;
  }
  return {
    id: sn.sys_id,
    role: 'coordinator',
    name: sn.name,
    department: sn.department || undefined,
    contactInfo: sn.contact_info || undefined,
    title: sn.title || undefined,
  } satisfies Coordinator;
}

// ─── Context & Provider ───────────────────────────────────────────────────────

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // ── Load events from ServiceNow on mount ──────────────────────────────────

  const refreshEvents = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const snEvents = await fetchEvents();
      setEvents(snEvents.map(snEventToLocal));
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Failed to load events.';
      setApiError(msg);
      console.error('[AppContext] refreshEvents:', msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  // ── Auth: real ServiceNow credential check (reviewer fix #2) ──────────────

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const result = await authenticateUser(credentials);
      if (result.success && result.user) {
        setCurrentUser(snUserToLocal(result.user));
      } else {
        setApiError(result.message ?? 'Invalid username or password.');
      }
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Authentication failed.';
      setApiError(msg);
      console.error('[AppContext] login:', msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  // ── User registration: POST to ServiceNow (reviewer fix #1) ──────────────

  const registerUser = useCallback(async (user: Omit<User, 'id'>) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const profilePayload: Omit<SNUser, 'sys_id'> = {
        name: user.name,
        role: user.role,
        major: (user as Student).major ?? '',
        cgpa: String((user as Student).cgpa ?? ''),
        skills: ((user as Student).skills ?? []).join(', '),
        department: (user as Coordinator).department ?? '',
        contact_info: (user as Coordinator).contactInfo ?? '',
        title: (user as Coordinator).title ?? '',
        university_id: (user as Student).universityId ?? '',
      };

      const { sys_id } = await createUserProfile(profilePayload);
      const newUser: User = { ...user, id: sys_id } as User;
      setCurrentUser(newUser);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Registration failed.';
      setApiError(msg);
      console.error('[AppContext] registerUser:', msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Event creation: POST to ServiceNow (reviewer fix #1) ─────────────────

  const createEvent = useCallback(
    async (event: Omit<Event, 'id' | 'registrations'>) => {
      setIsLoading(true);
      setApiError(null);
      try {
        const snPayload = {
          title: event.title,
          type: event.type,
          category: event.category,
          event_date: event.date,
          max_capacity: event.maxCapacity ?? '',
          description: event.description ?? '',
          required_skills: (event.requiredSkills ?? []).join(', '),
          creator_id: currentUser?.id ?? '',
          company: event.company ?? '',
        };
        const { sys_id } = await apiCreateEvent(snPayload);
        const localEvent: Event = { ...event, id: sys_id, registrations: 0 };
        setEvents((prev) => [...prev, localEvent]);
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : 'Failed to create event.';
        setApiError(msg);
        console.error('[AppContext] createEvent:', msg);
      } finally {
        setIsLoading(false);
      }
    },
    [currentUser]
  );

  // ── Event registration: POST to ServiceNow (reviewer fix #1) ─────────────

  const registerForEvent = useCallback(
    async (eventId: string) => {
      if (!currentUser || currentUser.role !== 'student') return;
      setIsLoading(true);
      setApiError(null);
      try {
        const result = await apiRegisterForEvent(eventId, currentUser.id);
        if (result.success) {
          // Optimistically update local count
          setEvents((prev) =>
            prev.map((e) =>
              e.id === eventId
                ? { ...e, registrations: e.registrations + 1 }
                : e
            )
          );
          // Track applied events on student profile
          const student = currentUser as Student;
          const applied = student.appliedEvents ?? [];
          if (!applied.includes(eventId)) {
            setCurrentUser({
              ...student,
              appliedEvents: [...applied, eventId],
            });
          }
        } else {
          setApiError(result.message ?? 'Registration failed.');
        }
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : 'Registration failed.';
        setApiError(msg);
        console.error('[AppContext] registerForEvent:', msg);
      } finally {
        setIsLoading(false);
      }
    },
    [currentUser]
  );

  return (
    <AppContext.Provider
      value={{
        currentUser,
        events,
        isLoading,
        apiError,
        login,
        logout,
        registerUser,
        createEvent,
        registerForEvent,
        refreshEvents,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
