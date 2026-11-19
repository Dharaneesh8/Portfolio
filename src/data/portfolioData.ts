export interface ProjectItem {
  id: string;
  title: string;
  stack: string[];
  summary: string;
  highlights: string[];
  repoUrl: string;
  accentLabel: string;
}

export interface TechStackItem {
  name: string;
  role: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  mode: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  category: string;
  title: string;
  issuer: string;
  details: string;
  courses?: string[];
  yearOrScope: string;
}

export const PROFILE = {
  name: 'Dharaneesh J',
  title: 'AI & Data Science',
  location: 'Tiruppur, Tamil Nadu, India',
  email: 'dharaneeshj8@gmail.com',
  phone: '+91 7867920207',
  photoUrl: '/assets/aistudio/Dharaneeshpfp_55f79b60.jpeg',
  resumeUrl: '/assets/aistudio/Dharaneesh_J_s_Resume_de4edafd.pdf',
  objective:
    'Dedicated Artificial Intelligence and Data Science student seeking to apply analytical, programming and machine learning skills to develop data-driven solutions that support business objectives, while contributing to organizational growth and enhancing technical expertise in a dynamic environment.',
  socials: {
    github: 'https://github.com/Dharaneesh8',
    linkedin: 'https://www.linkedin.com/in/dharaneesh-j-226601290/',
    leetcode: 'https://leetcode.com/u/dharaneesh_8/',
  },
};

export const TECH_STACK_ITEMS: TechStackItem[] = [
  { name: 'Python', role: 'Programming' },
  { name: 'Java', role: 'Programming' },
  { name: 'SQL', role: 'Programming' },
  { name: 'NumPy', role: 'Data Analysis' },
  { name: 'Pandas', role: 'Data Analysis' },
  { name: 'Matplotlib', role: 'Data Analysis' },
  { name: 'SciPy', role: 'Data Analysis' },
  { name: 'Seaborn', role: 'Data Analysis' },
  { name: 'Scikit-learn', role: 'Machine Learning' },
  { name: 'PyTorch', role: 'Machine Learning' },
  { name: 'Power BI', role: 'Visualization' },
  { name: 'Grafana', role: 'Visualization' },
  { name: 'Git', role: 'Tools & System' },
  { name: 'GitHub', role: 'Tools & System' },
  { name: 'VS Code', role: 'Tools & System' },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'solar-power',
    title: 'Solar Power Predicting System',
    stack: ['Python', 'Grafana', 'ML'],
    summary:
      'Predictive energy forecasting pipeline built on the NIT Puducherry solar dataset with real-time predicted vs. actual telemetry.',
    highlights: [
      'Developed a predictive model for solar energy output using the NIT Puducherry dataset.',
      'Integrated a real-time monitoring dashboard via Grafana for predicted vs. actual output visualization.',
    ],
    repoUrl: 'https://github.com/Dharaneesh8/Solar-Power-Prediction',
    accentLabel: 'Energy Forecasting',
  },
  {
    id: 'workforce-analytics',
    title: 'AI-Powered Workforce Analytics & Talent Intelligence Dashboard',
    stack: ['Python', 'ML', 'React', 'AWS'],
    summary:
      'Interactive workforce intelligence platform analyzing employee performance, satisfaction indices, and attrition risk.',
    highlights: [
      'Developed an AI-powered workforce dashboard to analyze employee performance, satisfaction, and attrition risk.',
      'Implemented machine learning models to predict employee risk and provide actionable HR insights.',
    ],
    repoUrl:
      'https://github.com/Dharaneesh8/AI-Powered-Workforce-Analytics-Talent-Intelligence-Dashboard',
    accentLabel: 'People Intelligence',
  },
  {
    id: 'image-prediction',
    title: 'Image Prediction with E-Mail Notification',
    stack: ['Python', 'Google Teachable Machine'],
    summary:
      'Automated image recognition workflow using Teachable Machine and Keras models with email and text-to-speech alerts.',
    highlights: [
      'Learned image recognition concepts using Google Teachable Machine and Keras models.',
      'Understood notification mechanisms using email and text-to-speech for prediction output.',
    ],
    repoUrl: 'https://github.com/Dharaneesh8/Image-prediction-with-email-notification',
    accentLabel: 'Computer Vision',
  },
];

export const INTERNSHIPS: ExperienceItem[] = [
  {
    id: 'infosys',
    role: 'Infosys Springboard Virtual Internship 7.0',
    organization: 'Infosys Springboard',
    period: '06/2026 – 08/2026',
    mode: 'Remote',
    highlights: [
      'Learned fundamentals of Power BI, including data loading, transformation, and data modeling.',
      'Gained understanding of dashboard design, visualizations, KPIs, and basic business analysis concepts.',
    ],
  },
  {
    id: 'svasti',
    role: 'Machine Learning Intern',
    organization: 'Svasti Solutions',
    period: '07/2025 – 06/2026',
    mode: 'Madurai, India',
    highlights: [
      'Learned machine learning fundamentals and key classification and regression algorithms.',
      'Studied computer vision basics, including object detection and image recognition workflows.',
      'Gained knowledge of time-series prediction, databases, and data visualization using monitoring tools.',
    ],
  },
];

export const EDUCATION = [
  {
    degree: 'B.Tech in Artificial Intelligence & Data Science',
    institution: 'Velalar College of Engineering and Technology',
    period: '2027',
    score: 'CGPA: 8.10',
  },
  {
    degree: 'Higher Secondary Education (HSC)',
    institution: 'Kathiravan Matriculation Higher Secondary School',
    period: '2023',
    score: 'XII: 86%',
  },
];

export const CERTIFICATIONS_AND_ACTIVITIES: CertificationItem[] = [
  {
    id: 'hackathons',
    category: 'Hackathons',
    title: 'Smart India Hackathon 2024 & 24 Hours Hackathon - VIT, Chennai',
    issuer: 'Ministry of Education · VIT Chennai',
    details:
      'Collaborated in rapid prototyping sprints solving real-world engineering problem statements under 24-hour constraints.',
    yearOrScope: 'National & Collegiate',
  },
  {
    id: 'hackerrank',
    category: 'HackerRank',
    title: 'SQL (Intermediate) Certification',
    issuer: 'HackerRank',
    details:
      'Verified proficiency in complex joins, aggregations, subqueries, and relational analytical query optimization.',
    yearOrScope: 'Verified Credential',
  },
  {
    id: 'nptel',
    category: 'NPTEL Certification',
    title: 'Three Certified NPTEL Courses',
    issuer: 'IIT / NPTEL Online',
    details: 'Completed certified coursework across three core engineering domains:',
    courses: [
      'Privacy and Security in Online Social Media',
      'Software Engineering',
      'Introduction to Industry 4.0 and Industrial Internet of Things',
    ],
    yearOrScope: '3 NPTEL Courses',
  },
  {
    id: 'thrivein',
    category: 'Executive Member',
    title: 'Former Member in ThriveIn AI Club',
    issuer: 'Velalar College of Engineering & Technology',
    details:
      'Former executive team member organizing peer machine learning sessions, technical showcases, and student AI initiatives.',
    yearOrScope: 'Leadership Role',
  },
  {
    id: 'paper-presentation',
    category: 'Paper Presentation',
    title: 'AI in Gaming & Generative AI',
    issuer: 'Technical Symposium Presentation',
    details:
      'Presented technical papers exploring adaptive intelligence systems in interactive gaming and generative AI architectures.',
    yearOrScope: 'Research & Speaking',
  },
  {
    id: 'workshops',
    category: 'Workshop',
    title: 'Large Language Model & Data Analytics using Power BI',
    issuer: 'Hands-on Technical Training',
    details:
      'Completed intensive workshops covering modern Large Language Model workflows and interactive Power BI data analytics.',
    yearOrScope: 'Applied Training',
  },
];
