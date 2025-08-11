import type { Incentive, Resource } from './types';

export const incentives: Incentive[] = [
  {
    title: 'Arts & Culture Grant',
    description: 'Funding for projects that promote arts and culture within the community.',
    category: 'Arts & Culture',
    eligibility: ['Non-profits', 'Individual Artists', 'Cultural Organizations'],
    link: '#',
  },
  {
    title: 'Green Business Certification',
    description: 'Recognition and benefits for businesses that adopt sustainable practices.',
    category: 'Sustainability',
    eligibility: ['All business types', 'Minimum 1 year in operation'],
    link: '#',
  },
  {
    title: 'Small Business Loan Program',
    description: 'Low-interest loans for small businesses looking to expand or start up.',
    category: 'Small Business',
    eligibility: ['Under 50 employees', 'Located in West Hollywood'],
    link: '#',
  },
  {
    title: 'Community Improvement Fund',
    description: 'Grants for projects that directly benefit local neighborhoods.',
    category: 'Community',
    eligibility: ['Community Groups', 'Local Businesses'],
    link: '#',
  },
  {
    title: 'Public Art Installation Grant',
    description: 'Support for creating and installing public art.',
    category: 'Arts & Culture',
    eligibility: ['Artists', 'Designer Teams'],
    link: '#',
  },
  {
    title: 'Energy Efficiency Rebates',
    description: 'Rebates for upgrading to energy-efficient appliances and systems.',
    category: 'Sustainability',
    eligibility: ['Commercial property owners', 'Business tenants'],
    link: '#',
  },
];

export const resources: Resource[] = [
  {
    name: 'Jane Doe',
    title: 'Business Development Manager',
    department: 'Economic Development',
    email: 'jane.doe@weho.org',
    phone: '(323) 848-6400',
    avatar: 'https://placehold.co/100x100.png',
  },
  {
    name: 'John Smith',
    title: 'Permit Specialist',
    department: 'Planning & Development Services',
    email: 'john.smith@weho.org',
    phone: '(323) 848-6475',
    avatar: 'https://placehold.co/100x100.png',
  },
  {
    name: 'Emily White',
    title: 'Arts Grant Coordinator',
    department: 'Arts and Cultural Affairs',
    email: 'emily.white@weho.org',
    phone: '(323) 848-6377',
    avatar: 'https://placehold.co/100x100.png',
  },
  {
    name: 'Michael Brown',
    title: 'Sustainability Coordinator',
    department: 'Environmental Services',
    email: 'michael.brown@weho.org',
    phone: '(323) 848-6894',
    avatar: 'https://placehold.co/100x100.png',
  },
];
