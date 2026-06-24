export interface Project {
  id: string;
  title: string;
  category: 'graphic' | 'short-form' | 'long-form';
  description: string;
  imageUrl: string;
  client?: string;
  year?: string;
  tags?: string[];
  videoUrl?: string; // For embedding or external link
  duration?: string;
  views?: string;
  aspectRatio?: '9:16' | '16:9' | '1:1' | 'auto';
  role?: string;
}

export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements?: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}
