// Departments
export const departments = [
  { id: 'dept-1', name: 'Executive', parentId: null },
  { id: 'dept-2', name: 'Engineering', parentId: null },
  { id: 'dept-3', name: 'Product', parentId: null },
  { id: 'dept-4', name: 'Design', parentId: 'dept-2' },
  { id: 'dept-5', name: 'Frontend', parentId: 'dept-2' },
  { id: 'dept-6', name: 'Backend', parentId: 'dept-2' },
  { id: 'dept-7', name: 'QA', parentId: 'dept-2' },
  { id: 'dept-8', name: 'Human Resources', parentId: null },
  { id: 'dept-9', name: 'Finance', parentId: null },
  { id: 'dept-10', name: 'Marketing', parentId: null },
  { id: 'dept-11', name: 'Sales', parentId: null },
  { id: 'dept-12', name: 'Customer Support', parentId: null },
  { id: 'dept-13', name: 'Operations', parentId: null }
];

// Designations
export const designations = [
  { id: 'desig-1', name: 'CEO', level: 1 },
  { id: 'desig-2', name: 'CTO', level: 2 },
  { id: 'desig-3', name: 'VP of Engineering', level: 3 },
  { id: 'desig-4', name: 'Engineering Manager', level: 4 },
  { id: 'desig-5', name: 'Senior Software Engineer', level: 5 },
  { id: 'desig-6', name: 'Software Engineer', level: 6 },
  { id: 'desig-7', name: 'Associate Software Engineer', level: 7 },
  { id: 'desig-8', name: 'Product Manager', level: 4 },
  { id: 'desig-9', name: 'UI/UX Designer', level: 6 },
  { id: 'desig-10', name: 'QA Engineer', level: 6 },
  { id: 'desig-11', name: 'HR Manager', level: 4 },
  { id: 'desig-12', name: 'HR Executive', level: 6 },
  { id: 'desig-13', name: 'Finance Manager', level: 4 },
  { id: 'desig-14', name: 'Accountant', level: 6 },
  { id: 'desig-15', name: 'Marketing Manager', level: 4 },
  { id: 'desig-16', name: 'Sales Executive', level: 6 },
  { id: 'desig-17', name: 'Support Executive', level: 6 }
];

// Skills
export const skills = [
  { id: 'skill-1', name: 'JavaScript', category: 'Technical' },
  { id: 'skill-2', name: 'React', category: 'Technical' },
  { id: 'skill-3', name: 'Node.js', category: 'Technical' },
  { id: 'skill-4', name: 'Python', category: 'Technical' },
  { id: 'skill-5', name: 'Java', category: 'Technical' },
  { id: 'skill-6', name: 'SQL', category: 'Technical' },
  { id: 'skill-7', name: 'AWS', category: 'Technical' },
  { id: 'skill-8', name: 'Docker', category: 'Technical' },
  { id: 'skill-9', name: 'Agile', category: 'Methodology' },
  { id: 'skill-10', name: 'Scrum', category: 'Methodology' },
  { id: 'skill-11', name: 'Project Management', category: 'Management' },
  { id: 'skill-12', name: 'Team Leadership', category: 'Management' },
  { id: 'skill-13', name: 'Communication', category: 'Soft Skills' },
  { id: 'skill-14', name: 'Problem Solving', category: 'Soft Skills' },
  { id: 'skill-15', name: 'UI/UX Design', category: 'Design' },
  { id: 'skill-16', name: 'Data Analysis', category: 'Analytics' },
  { id: 'skill-17', name: 'Machine Learning', category: 'AI/ML' },
  { id: 'skill-18', name: 'DevOps', category: 'Technical' },
  { id: 'skill-19', name: 'Cybersecurity', category: 'Security' },
  { id: 'skill-20', name: 'Cloud Architecture', category: 'Technical' }
];

// Employee data
export const employees = [
  // Executive Team
  {
    id: 'emp-1',
    employeeId: 'CEO001',
    firstName: 'Rajesh',
    lastName: 'Sharma',
    email: 'rajesh.sharma@company.com',
    phone: '+91 9876543210',
    dateOfBirth: '1975-05-15',
    dateOfJoining: '2015-01-10',
    departmentId: 'dept-1',
    designationId: 'desig-1',
    managerId: null,
    role: 'admin',
    status: 'active',
    workLocation: 'Mumbai',
    employmentType: 'full-time',
    skills: ['skill-11', 'skill-12', 'skill-13'],
    address: {
      street: '1001 Oberoi Skyline',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400053'
    },
    emergencyContact: {
      name: 'Priya Sharma',
      relationship: 'Spouse',
      phone: '+91 9876543211'
    },
    education: [
      {
        degree: 'MBA',
        institution: 'IIM Ahmedabad',
        year: 2000,
        grade: 'A+'
      },
      {
        degree: 'B.Tech',
        institution: 'IIT Bombay',
        year: 1998,
        grade: '9.2/10'
      }
    ],
    experience: [
      {
        company: 'Tech Solutions Inc.',
        position: 'CEO',
        duration: '2010-2015',
        description: 'Led company growth from startup to market leader'
      },
      {
        company: 'Global Corp',
        position: 'VP of Operations',
        duration: '2005-2010',
        description: 'Managed international operations across 5 countries'
      }
    ],
    documents: [
      { name: 'Resume.pdf', type: 'resume', uploaded: '2023-01-15' },
      { name: 'Degree_Certificate.pdf', type: 'education', uploaded: '2023-01-15' }
    ],
    leaveBalance: {
      casual: 7,
      sick: 12,
      privilege: 15,
      paternity: 15
    },
    projects: [
      { id: 'proj-1', name: 'Digital Transformation', role: 'Sponsor', status: 'In Progress' },
      { id: 'proj-2', name: 'Market Expansion', role: 'Sponsor', status: 'Planning' }
    ],
    performance: {
      lastReview: '2023-06-15',
      rating: 5,
      feedback: 'Exceptional leadership and vision',
      goals: [
        { id: 'goal-1', description: 'Expand to 3 new markets', status: 'In Progress' },
        { id: 'goal-2', description: 'Increase revenue by 30%', status: 'On Track' }
      ]
    },
    reports: [
      { id: 'emp-2', name: 'Anjali Mehta', title: 'CTO' },
      { id: 'emp-8', name: 'Priya Singh', title: 'VP of HR' },
      { id: 'emp-15', name: 'Amit Patel', title: 'CFO' }
    ]
  },
  
  // CTO
  {
    id: 'emp-2',
    employeeId: 'TECH001',
    firstName: 'Anjali',
    lastName: 'Mehta',
    email: 'anjali.mehta@company.com',
    phone: '+91 9876543212',
    dateOfBirth: '1980-08-22',
    dateOfJoining: '2016-03-15',
    departmentId: 'dept-2',
    designationId: 'desig-2',
    managerId: 'emp-1',
    role: 'admin',
    status: 'active',
    workLocation: 'Bangalore',
    employmentType: 'full-time',
    skills: ['skill-1', 'skill-2', 'skill-3', 'skill-11', 'skill-12'],
    address: {
      street: '45 Tech Park Residency',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      pincode: '560037'
    },
    emergencyContact: {
      name: 'Rahul Mehta',
      relationship: 'Spouse',
      phone: '+91 9876543213'
    },
    education: [
      {
        degree: 'M.Tech',
        institution: 'IIT Delhi',
        year: 2002,
        grade: '9.0/10'
      },
      {
        degree: 'B.Tech',
        institution: 'NIT Surat',
        year: 2000,
        grade: '8.8/10'
      }
    ],
    experience: [
      {
        company: 'Tech Innovators',
        position: 'VP of Engineering',
        duration: '2012-2016',
        description: 'Led engineering team of 100+ developers'
      },
      {
        company: 'Digital Solutions',
        position: 'Engineering Manager',
        duration: '2008-2012',
        description: 'Managed multiple product teams'
      }
    ],
    documents: [
      { name: 'Resume_Anjali.pdf', type: 'resume', uploaded: '2023-02-10' },
      { name: 'Masters_Degree.pdf', type: 'education', uploaded: '2023-02-10' }
    ],
    leaveBalance: {
      casual: 5,
      sick: 10,
      privilege: 12,
      maternity: 0
    },
    projects: [
      { id: 'proj-3', name: 'Platform Modernization', role: 'Lead', status: 'In Progress' },
      { id: 'proj-4', name: 'AI Integration', role: 'Sponsor', status: 'Planning' }
    ],
    performance: {
      lastReview: '2023-06-20',
      rating: 4.8,
      feedback: 'Strong technical leadership and vision',
      goals: [
        { id: 'goal-3', description: 'Improve engineering productivity by 25%', status: 'In Progress' },
        { id: 'goal-4', description: 'Implement new architecture standards', status: 'On Track' }
      ]
    },
    reports: [
      { id: 'emp-3', name: 'Rahul Verma', title: 'VP of Engineering' },
      { id: 'emp-4', name: 'Neha Gupta', title: 'Engineering Manager' },
      { id: 'emp-5', name: 'Vikram Singh', title: 'Engineering Manager' }
    ]
  },
  
  // Add more employees...
  // Engineering Manager - Frontend
  {
    id: 'emp-4',
    employeeId: 'ENG004',
    firstName: 'Neha',
    lastName: 'Gupta',
    email: 'neha.gupta@company.com',
    phone: '+91 9876543216',
    dateOfBirth: '1988-11-05',
    dateOfJoining: '2019-07-22',
    departmentId: 'dept-5', // Frontend
    designationId: 'desig-4', // Engineering Manager
    managerId: 'emp-3', // VP of Engineering
    role: 'employee',
    status: 'active',
    workLocation: 'Bangalore',
    employmentType: 'full-time',
    skills: ['skill-1', 'skill-2', 'skill-9', 'skill-12', 'skill-13'],
    address: {
      street: '78 Green Valley',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      pincode: '560066'
    },
    emergencyContact: {
      name: 'Rohan Gupta',
      relationship: 'Spouse',
      phone: '+91 9876543217'
    },
    education: [
      {
        degree: 'B.Tech',
        institution: 'BITS Pilani',
        year: 2010,
        grade: '8.5/10'
      }
    ],
    experience: [
      {
        company: 'WebTech Solutions',
        position: 'Senior Frontend Engineer',
        duration: '2015-2019',
        description: 'Led frontend development for multiple products'
      },
      {
        company: 'Digital Creations',
        position: 'Frontend Developer',
        duration: '2012-2015',
        description: 'Developed responsive web applications'
      }
    ],
    documents: [
      { name: 'Resume_Neha.pdf', type: 'resume', uploaded: '2023-03-05' },
      { name: 'Degree_Neha.pdf', type: 'education', uploaded: '2023-03-05' }
    ],
    leaveBalance: {
      casual: 6,
      sick: 11,
      privilege: 14,
      maternity: 0
    },
    projects: [
      { id: 'proj-5', name: 'UI Component Library', role: 'Manager', status: 'In Progress' },
      { id: 'proj-6', name: 'Performance Optimization', role: 'Lead', status: 'Completed' }
    ],
    performance: {
      lastReview: '2023-06-25',
      rating: 4.5,
      feedback: 'Strong leadership and technical skills',
      goals: [
        { id: 'goal-5', description: 'Reduce frontend load time by 30%', status: 'In Progress' },
        { id: 'goal-6', description: 'Mentor junior developers', status: 'On Track' }
      ]
    },
    reports: [
      { id: 'emp-6', name: 'Amit Kumar', title: 'Senior Frontend Developer' },
      { id: 'emp-7', name: 'Priya Nair', title: 'Frontend Developer' }
    ]
  },
  
  // Add more employees as needed...
];

// Helper functions
export const getEmployeeById = (id) => {
  return employees.find(emp => emp.id === id);
};

export const getEmployeesByManager = (managerId) => {
  return employees.filter(emp => emp.managerId === managerId);
};

export const getEmployeesByDepartment = (deptId) => {
  return employees.filter(emp => emp.departmentId === deptId);
};

export const searchEmployees = (query) => {
  if (!query) return [];
  const searchTerm = query.toLowerCase();
  return employees.filter(emp => 
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm) ||
    emp.email.toLowerCase().includes(searchTerm) ||
    emp.employeeId.toLowerCase().includes(searchTerm)
  );
};

export const getDepartmentById = (id) => {
  return departments.find(dept => dept.id === id);
};

export const getDesignationById = (id) => {
  return designations.find(desig => desig.id === id);
};

export const getSkillById = (id) => {
  return skills.find(skill => skill.id === id);
};
