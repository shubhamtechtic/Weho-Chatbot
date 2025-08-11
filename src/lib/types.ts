
import type { LucideIcon } from 'lucide-react';

export type Incentive = {
  title: string;
  description: string;
  category: 'Arts & Culture' | 'Sustainability' | 'Small Business' | 'Community';
  eligibility: string[];
  link: string;
};

export type Resource = {
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  avatar: string;
};

export type District = {
    name: string;
    description: string;
    image: string;
    link: string;
}
