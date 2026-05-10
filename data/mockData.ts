export const mockData = {
  currentUser: {
    name: "Shiva Shankar",
    university: "Aditya University",
    major: "B.Tech ECE",
    cgpa: 8.0,
    skills: ["ServiceNow", "React", "Python", "Gen AI", "Node.js"]
  },
  coordinatorUser: {
    name: "Dr. Smith",
    university: "Aditya University",
    department: "Computer Science",
    role: "Coordinator",
    eventsManaged: 5
  },
  communityEvents: [
    {
      id: "e1",
      title: "Project Pace Hackathon",
      type: "Hackathon",
      date: "2026-05-15",
      maxTeamSize: 4,
      openRoles: ["UI Developer", "Backend Dev"]
    },
    {
      id: "e2",
      title: "Annual Sports Meet",
      type: "Sports",
      date: "2026-05-20",
      maxTeamSize: 11,
      openRoles: ["Player"]
    }
  ],
  internships: [
    {
      id: "i1",
      company: "Technical Hub",
      role: "ServiceNow Intern",
      requiredSkills: ["ServiceNow", "JavaScript", "Problem Solving"]
    },
    {
      id: "i2",
      company: "Tech Startup",
      role: "AI/ML Intern",
      requiredSkills: ["Python", "Deep Learning", "Gen AI"]
    }
  ]
};
