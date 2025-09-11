const navItems = [
    { name: 'Home', path: '#' },
    { name: 'Benifits', path: '#benifits' },
    { name: 'Dotors', path: '#doctors' },
]

const navItemsForDashboard = [
    { name: 'Home', path: '/dashboard' },
    { name: 'History', path: '/history' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Profile', path: '/profile' },
]

const doctors = [
  {
    name: "Dr. Arjun Gupta",
    imageUrl: "https://res.cloudinary.com/dhxwyq122/image/upload/v1757259647/doctor2_nbaiq3.png",
    specialization: "Cardiologist",
    description: "Experienced cardiologist with 15+ years in treating heart conditions, preventive care, and lifestyle management.",
    agentPrompt: "Provide expert advice on heart health, cardiovascular symptoms, and lifestyle tips for a healthy heart."
  },
  {
    name: "Dr. Emily Johnson",
    imageUrl: "https://res.cloudinary.com/dhxwyq122/image/upload/v1757259647/doctor4_na3lqc.png",
    specialization: "Dermatologist",
    description: "Specialist in skin care, cosmetic treatments, and management of chronic skin conditions.",
    agentPrompt: "Offer guidance on skincare routines, acne treatment, and cosmetic dermatology queries."
  },
  {
    name: "Dr. Michael Brown",
    imageUrl: "https://res.cloudinary.com/dhxwyq122/image/upload/v1757259647/doctor10_r4rn8y.png",
    specialization: "Neurologist",
    description: "Expert in brain and nervous system disorders, focusing on migraines, epilepsy, and neurodegenerative diseases.",
    agentPrompt: "Assist with neurological concerns, brain disorder symptoms, and healthy lifestyle modifications."
  },
  {
    name: "Dr. Sarah Davis",
    imageUrl: "https://res.cloudinary.com/dhxwyq122/image/upload/v1757259647/doctor5_rgrz2i.png",
    specialization: "Pediatrician",
    description: "Dedicated pediatrician focusing on child growth, immunizations, and preventive healthcare for children.",
    agentPrompt: "Help with child health concerns, vaccinations, nutrition, and common pediatric conditions."
  },
  {
    name: "Dr. James Wilson",
    imageUrl: "https://res.cloudinary.com/dhxwyq122/image/upload/v1757259647/doctor3_lqoqju.png",
    specialization: "Psychiatrist",
    description: "Compassionate psychiatrist specializing in mental health, therapy, and stress management.",
    agentPrompt: "Support users with mental health concerns, therapy guidance, and stress management techniques."
  },
  {
    name: "Dr. Olivia Miller",
    imageUrl: "https://res.cloudinary.com/dhxwyq122/image/upload/v1757259646/doctor6_ven8i7.png",
    specialization: "Gynecologist",
    description: "Specialist in women’s health, pregnancy care, and reproductive system disorders.",
    agentPrompt: "Provide advice on women’s health, prenatal care, and gynecological conditions."
  },
  {
    name: "Dr. William Taylor",
    imageUrl: "https://res.cloudinary.com/dhxwyq122/image/upload/v1757259646/doctor9_nsbxk1.png",
    specialization: "Orthopedic Surgeon",
    description: "Orthopedic expert treating bone, joint, and spine conditions with surgical and non-surgical methods.",
    agentPrompt: "Guide users on bone health, fractures, arthritis, and orthopedic surgery options."
  },
  {
    name: "Dr. Sophia Anderson",
    imageUrl: "https://res.cloudinary.com/dhxwyq122/image/upload/v1757259646/doctor7_mqm40b.png",
    specialization: "Oncologist",
    description: "Cancer specialist with expertise in chemotherapy, targeted therapy, and palliative care.",
    agentPrompt: "Offer information about cancer treatment, prevention, and coping strategies."
  },
  {
    name: "Dr. Grace Thompson",
    imageUrl: "https://res.cloudinary.com/dhxwyq122/image/upload/v1757259646/doctor8_egksss.png",
    specialization: "Endocrinologist",
    description: "Expert in hormone-related conditions, including diabetes, thyroid disorders, and metabolic issues.",
    agentPrompt: "Help with diabetes management, thyroid health, and endocrine system concerns."
  },
    {
    name: "Dr. David Clark", 
    imageUrl: "https://res.cloudinary.com/dhxwyq122/image/upload/v1757439968/doctor1_1_bsroaw.png",
    specialization: "General Physician",
    description: "General practitioner providing comprehensive care, routine checkups, and treatment for common illnesses.",
    agentPrompt: "Assist with general health advice, routine medical concerns, and preventive healthcare tips."
  }
];

 const symptomSpecializationMap = {
  "chest pain": "Cardiologist",
  "skin rash": "Dermatologist",
  "headache": "Neurologist",
  "child fever": "Pediatrician",
  "anxiety": "Psychiatrist",
  "pregnancy": "Gynecologist",
  "joint pain": "Orthopedic Surgeon",
  "cancer": "Oncologist",
  "diabetes": "Endocrinologist",
  "cough": "General Physician",
  // Add more mappings as needed
};


export { navItems ,navItemsForDashboard,doctors,symptomSpecializationMap};