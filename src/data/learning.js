// Learning categories
export const learningCategories = [
  { id: 'tech', name: 'Technology', description: 'Technical skills development' },
  { id: 'leadership', name: 'Leadership', description: 'Leadership and management training' },
  { id: 'soft-skills', name: 'Soft Skills', description: 'Communication and interpersonal skills' },
  { id: 'compliance', name: 'Compliance', description: 'Mandatory compliance training' },
  { id: 'product', name: 'Product Knowledge', description: 'Product and service training' },
  { id: 'safety', name: 'Health & Safety', description: 'Workplace safety training' },
  { id: 'diversity', name: 'Diversity & Inclusion', description: 'Promoting inclusive workplace' },
  { id: 'wellness', name: 'Wellness', description: 'Health and wellbeing programs' }
];

// Learning resources
export const learningResources = [
  // Technology
  {
    id: 'learn-1',
    title: 'React Fundamentals',
    category: 'tech',
    type: 'course',
    duration: '8 hours',
    level: 'Beginner',
    provider: 'Internal Academy',
    description: 'Learn the fundamentals of React including components, state, props, and hooks.',
    content: {
      modules: [
        { id: 'mod-1', title: 'Introduction to React', duration: '45 min' },
        { id: 'mod-2', title: 'Components and Props', duration: '1 hour' },
        { id: 'mod-3', title: 'State and Lifecycle', duration: '1.5 hours' },
        { id: 'mod-4', title: 'Hooks in Depth', duration: '2 hours' },
        { id: 'mod-5', title: 'Building a Complete App', duration: '3 hours' }
      ],
      resources: [
        { type: 'video', title: 'React Crash Course', duration: '2 hours' },
        { type: 'document', title: 'React Cheat Sheet', format: 'PDF' },
        { type: 'lab', title: 'Interactive Coding Exercise' }
      ]
    },
    skills: ['skill-1', 'skill-2'],
    prerequisites: ['Basic JavaScript knowledge'],
    certification: true,
    rating: 4.8,
    enrolled: 124,
    lastUpdated: '2023-06-10',
    image: '/images/learning/react-fundamentals.jpg'
  },
  
  // Leadership
  {
    id: 'learn-2',
    title: 'Effective Team Leadership',
    category: 'leadership',
    type: 'course',
    duration: '6 hours',
    level: 'Intermediate',
    provider: 'Leadership Institute',
    description: 'Develop essential leadership skills to guide and motivate your team effectively.',
    content: {
      modules: [
        { id: 'mod-6', title: 'Leadership Styles', duration: '45 min' },
        { id: 'mod-7', title: 'Effective Communication', duration: '1 hour' },
        { id: 'mod-8', title: 'Conflict Resolution', duration: '1.5 hours' },
        { id: 'mod-9', title: 'Performance Management', duration: '2 hours' },
        { id: 'mod-10', title: 'Team Building', duration: '1 hour' }
      ],
      resources: [
        { type: 'video', title: 'Leadership Case Studies', duration: '1.5 hours' },
        { type: 'document', title: 'Leadership Assessment', format: 'PDF' },
        { type: 'worksheet', title: 'Leadership Development Plan' }
      ]
    },
    skills: ['skill-11', 'skill-12', 'skill-13'],
    prerequisites: ['Management role or leadership aspirations'],
    certification: true,
    rating: 4.9,
    enrolled: 87,
    lastUpdated: '2023-05-15',
    image: '/images/learning/leadership.jpg'
  },
  
  // Compliance
  {
    id: 'learn-3',
    title: 'Workplace Harassment Prevention',
    category: 'compliance',
    type: 'training',
    duration: '2 hours',
    level: 'All',
    provider: 'HR Compliance Team',
    description: 'Mandatory training on preventing and addressing workplace harassment.',
    content: {
      modules: [
        { id: 'mod-11', title: 'Understanding Harassment', duration: '30 min' },
        { id: 'mod-12', title: 'Company Policies', duration: '30 min' },
        { id: 'mod-13', title: 'Bystander Intervention', duration: '30 min' },
        { id: 'mod-14', title: 'Reporting Procedures', duration: '30 min' }
      ],
      resources: [
        { type: 'video', title: 'Harassment Scenarios', duration: '45 min' },
        { type: 'document', title: 'Policy Handbook', format: 'PDF' },
        { type: 'quiz', title: 'Knowledge Check' }
      ]
    },
    skills: ['skill-13'],
    prerequisites: [],
    certification: true,
    mandatory: true,
    dueDate: '2023-12-31',
    rating: 4.2,
    enrolled: 0, // Everyone is enrolled in mandatory training
    lastUpdated: '2023-01-05',
    image: '/images/learning/harassment-prevention.jpg'
  },
  
  // Add more learning resources...
  // Technology - Advanced
  {
    id: 'learn-4',
    title: 'Advanced Node.js Patterns',
    category: 'tech',
    type: 'course',
    duration: '10 hours',
    level: 'Advanced',
    provider: 'Internal Academy',
    description: 'Master advanced Node.js patterns including streams, worker threads, and microservices.',
    content: {
      modules: [
        { id: 'mod-15', title: 'Advanced Asynchronous Patterns', duration: '2 hours' },
        { id: 'mod-16', title: 'Streams and Buffers', duration: '2 hours' },
        { id: 'mod-17', title: 'Worker Threads', duration: '2 hours' },
        { id: 'mod-18', title: 'Building Microservices', duration: '3 hours' },
        { id: 'mod-19', title: 'Performance Optimization', duration: '1 hour' }
      ],
      resources: [
        { type: 'video', title: 'Node.js Performance', duration: '1.5 hours' },
        { type: 'document', title: 'Code Examples', format: 'ZIP' },
        { type: 'lab', title: 'Microservices Project' }
      ]
    },
    skills: ['skill-3', 'skill-7', 'skill-18'],
    prerequisites: ['Node.js Fundamentals', 'JavaScript ES6+'],
    certification: true,
    rating: 4.7,
    enrolled: 56,
    lastUpdated: '2023-06-28',
    image: '/images/learning/nodejs-advanced.jpg'
  },
  
  // Soft Skills
  {
    id: 'learn-5',
    title: 'Effective Communication',
    category: 'soft-skills',
    type: 'workshop',
    duration: '4 hours',
    level: 'All',
    provider: 'Professional Development Inc.',
    description: 'Enhance your communication skills for better workplace interactions.',
    content: {
      modules: [
        { id: 'mod-20', title: 'Active Listening', duration: '45 min' },
        { id: 'mod-21', title: 'Nonverbal Communication', duration: '45 min' },
        { id: 'mod-22', title: 'Written Communication', duration: '1 hour' },
        { id: 'mod-23', title: 'Difficult Conversations', duration: '1.5 hours' }
      ],
      resources: [
        { type: 'video', title: 'Communication Styles', duration: '30 min' },
        { type: 'worksheet', title: 'Self-Assessment' },
        { type: 'template', title: 'Email Templates' }
      ]
    },
    skills: ['skill-13'],
    prerequisites: [],
    certification: false,
    rating: 4.6,
    enrolled: 92,
    lastUpdated: '2023-04-10',
    image: '/images/learning/communication.jpg'
  },
  
  // Product Knowledge
  {
    id: 'learn-6',
    title: 'Product Suite Overview',
    category: 'product',
    type: 'training',
    duration: '3 hours',
    level: 'Beginner',
    provider: 'Product Team',
    description: 'Comprehensive overview of our product suite and features.',
    content: {
      modules: [
        { id: 'mod-24', title: 'Product Architecture', duration: '45 min' },
        { id: 'mod-25', title: 'Key Features', duration: '1 hour' },
        { id: 'mod-26', title: 'Use Cases', duration: '45 min' },
        { id: 'mod-27', title: 'Competitive Landscape', duration: '30 min' }
      ],
      resources: [
        { type: 'video', title: 'Product Demo', duration: '45 min' },
        { type: 'document', title: 'Product Catalog', format: 'PDF' },
        { type: 'sandbox', title: 'Interactive Demo' }
      ]
    },
    skills: [],
    prerequisites: [],
    certification: true,
    mandatory: true,
    dueDate: '2023-09-30',
    rating: 4.4,
    enrolled: 0, // Everyone is enrolled in mandatory training
    lastUpdated: '2023-03-15',
    image: '/images/learning/product-overview.jpg'
  },
  
  // Add more learning resources as needed...
];

// User learning progress
export const userLearningProgress = [
  {
    userId: 'emp-1',
    items: [
      { resourceId: 'learn-3', status: 'completed', progress: 100, completedOn: '2023-06-15', score: 95 },
      { resourceId: 'learn-6', status: 'in-progress', progress: 60, startedOn: '2023-07-10', dueDate: '2023-09-30' },
      { resourceId: 'learn-2', status: 'not-started', progress: 0 }
    ]
  },
  {
    userId: 'emp-2',
    items: [
      { resourceId: 'learn-1', status: 'completed', progress: 100, completedOn: '2023-05-20', score: 98 },
      { resourceId: 'learn-3', status: 'completed', progress: 100, completedOn: '2023-06-10', score: 92 },
      { resourceId: 'learn-4', status: 'in-progress', progress: 30, startedOn: '2023-07-05' },
      { resourceId: 'learn-6', status: 'not-started', progress: 0, dueDate: '2023-09-30' }
    ]
  },
  // Add more user progress entries...
];

// Helper functions
export const getLearningResourceById = (id) => {
  return learningResources.find(resource => resource.id === id);
};

export const getLearningResourcesByCategory = (categoryId) => {
  if (categoryId === 'all') return learningResources;
  return learningResources.filter(resource => resource.category === categoryId);
};

export const getUserProgress = (userId) => {
  const userProgress = userLearningProgress.find(progress => progress.userId === userId);
  return userProgress ? userProgress.items : [];
};

export const getRecommendedResources = (userId, count = 3) => {
  // In a real app, this would use ML to recommend based on user's role, skills, etc.
  // For now, return most popular resources not yet completed by user
  const completedItems = getUserProgress(userId)
    .filter(item => item.status === 'completed')
    .map(item => item.resourceId);
    
  return learningResources
    .filter(resource => !completedItems.includes(resource.id))
    .sort((a, b) => b.rating - a.rating || b.enrolled - a.enrolled)
    .slice(0, count);
};

export const searchLearningResources = (query) => {
  if (!query) return [];
  const searchTerm = query.toLowerCase();
  return learningResources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm) ||
    resource.description.toLowerCase().includes(searchTerm) ||
    resource.skills.some(skillId => {
      const skill = skills.find(s => s.id === skillId);
      return skill ? skill.name.toLowerCase().includes(searchTerm) : false;
    })
  );
};
