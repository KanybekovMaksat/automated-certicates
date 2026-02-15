// export interface Student {
//   id: string;
//   fullName: string;
//   skill1: number;
//   skill2: number;
//   skill3: number;
//   skill4: number;
//   skill5: number;
// }

// export interface Course {
//   id: string;
//   name: string;
//   skills: string[];
//   templatePdf?: Uint8Array;
// }

// export const COURSES: Course[] = [
//   {
//     id: 'scratch',
//     name: 'Scratch',
//     skills: ['HTML/CSS', 'JavaScript', 'React', ]
//   },
//   {
//     id: 'roblox',
//     name: 'Roblox',
//     skills: ['Python', 'Статистика', ]
//   },
//   {
//     id: 'teens',
//     name: 'Teens',
//     skills: ['HTML', 'CSS']
//   },
//   {
//     id: 'jst',
//     name: 'JavaScript',
//     skills: ['HTML&CSS', 'Javascript', 'Javascript PRO',]
//   },
//   {
//     id: 'python',
//     name: 'Python',
//     skills: ['Python',]
//   }
// ];
export interface Student {
  id: string;
  fullName: string;
  skill1: number;
  skill2: number;
  skill3: number;
  skill4: number;
  skill5: number;
}

export interface Course {
  id: string;
  name: string;
  skills: string[];
  templatePdf?: Uint8Array;
}

export const COURSES: Course[] = [
  {
    id: 'course1',
    name: 'Курс',
    skills: ['HTML/CSS', 'JavaScript', 'React'],
  },
];
