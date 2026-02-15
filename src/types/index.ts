export interface Student {
  id: string;
  fullName: string;
  skills: Record<string, number>;
}

export interface Course {
  id: string;
  name: string;
  skills: string[]; 
  templatePdf?: Uint8Array;
}

export const COURSES: Course[] = [
  {
    id: 'skills',
    name: 'Навыки',
    skills: [],
  },
];

export const PRESET_SKILLS = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Startup',
  'Python',
  'Scratch',
  'Roblox',
  'Git',
  'Figma',
];

