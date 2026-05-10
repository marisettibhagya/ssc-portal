import React, { createContext, useState, useContext, ReactNode } from 'react';

export type UserRole = 'student' | 'coordinator';

export interface BaseUser {
  id: string;
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

interface AppContextType {
  currentUser: User | null;
  users: User[];
  events: Event[];
  login: (userId: string) => void;
  logout: () => void;
  registerUser: (user: User) => void;
  updateUser: (user: User) => void;
  createEvent: (event: Event) => void;
}

const initialMockState = {
  currentUser: null,
  users: [
    {
      id: "u1",
      role: "student" as const,
      name: "Shiva Shankar",
      major: "B.Tech ECE",
      cgpa: 8.0,
      skills: ["ServiceNow", "React", "Node.js", "Python", "AI"],
      appliedEvents: ["e1"]
    },
    {
      id: "c1",
      role: "coordinator" as const,
      name: "Prof. Sharma",
      department: "Computer Science"
    }
  ],
  events: [
    {
      id: "e1",
      creatorId: "c1",
      type: "Hackathon",
      category: "Community",
      title: "Project Pace Hackathon",
      date: "2026-06-15",
      registrations: 12
    },
    {
      id: "e2",
      creatorId: "c1",
      type: "Blood Donation",
      category: "Community",
      title: "Annual Blood Drive",
      date: "2026-05-20",
      registrations: 45
    },
    {
      id: "e3",
      creatorId: "c1",
      type: "Internship",
      category: "Tech",
      company: "Technical Hub",
      title: "ServiceNow Developer Intern",
      requiredSkills: ["ServiceNow", "JavaScript"],
      registrations: 8
    }
  ]
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(initialMockState.currentUser);
  const [users, setUsers] = useState<User[]>(initialMockState.users);
  const [events, setEvents] = useState<Event[]>(initialMockState.events);

  const login = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    } else {
      console.error("User not found!");
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerUser = (user: User) => {
    setUsers([...users, user]);
    setCurrentUser(user); // auto-login after register/onboarding
  };

  const updateUser = (updatedUser: User) => {
    const updatedUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
    setUsers(updatedUsers);
    if (currentUser?.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
  };

  const createEvent = (event: Event) => {
    setEvents([...events, event]);
  };

  return (
    <AppContext.Provider value={{ currentUser, users, events, login, logout, registerUser, updateUser, createEvent }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
