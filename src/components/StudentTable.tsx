// import { Student, Course } from '../types';
// import { Trash2, Plus } from 'lucide-react';

// interface StudentTableProps {
//   students: Student[];
//   course: Course;
//   onUpdateStudent: (id: string, field: keyof Student, value: string | number) => void;
//   onAddStudent: () => void;
//   onRemoveStudent: (id: string) => void;
// }

// export default function StudentTable({
//   students,
//   course,
//   onUpdateStudent,
//   onAddStudent,
//   onRemoveStudent,
// }: StudentTableProps) {
//   const validateScore = (value: string): number => {
//     const num = parseInt(value) || 0;
//     return Math.max(1, Math.min(10, num));
//   };

//   return (
//     <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-white">Список студентов</h2>
//         <button
//           onClick={onAddStudent}
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
//         >
//           <Plus size={20} />
//           Добавить студента
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-left text-gray-200">
//           <thead className="bg-gray-700">
//             <tr>
//               <th className="px-4 py-3 w-8">#</th>
//               <th className="px-4 py-3 min-w-[200px]">ФИО студента</th>
//               {course.skills.map((skill, index) => (
//                 <th key={index} className="px-4 py-3 w-32">
//                   {skill}
//                 </th>
//               ))}
//               <th className="px-4 py-3 w-20">Действия</th>
//             </tr>
//           </thead>
//           {course.skills.map((skill, index) => (
//   <th key={index} className="px-4 py-3 w-32">
//     {skill}
//   </th>
// ))}
//           <tbody>
//             {students.map((student, index) => (
//               <tr key={student.id} className="border-b border-gray-700 hover:bg-gray-750">
//                 <td className="px-4 py-3 text-gray-400">{index + 1}</td>
//                 <td className="px-4 py-3">
//                   <input
//                     type="text"
//                     value={student.fullName}
//                     onChange={(e) => onUpdateStudent(student.id, 'fullName', e.target.value)}
//                     placeholder="Введите ФИО"
//                     className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
//                   />
//                 </td>
//                 <td className="px-4 py-3">
//                   <input
//                     type="number"
//                     min="1"
//                     max="10"
//                     value={student.skill1}
//                     onChange={(e) => onUpdateStudent(student.id, 'skill1', validateScore(e.target.value))}
//                     className="w-20 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
//                   />
//                 </td>
//                 <td className="px-4 py-3">
//                   <input
//                     type="number"
//                     min="1"
//                     max="10"
//                     value={student.skill2}
//                     onChange={(e) => onUpdateStudent(student.id, 'skill2', validateScore(e.target.value))}
//                     className="w-20 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
//                   />
//                 </td>
//                 <td className="px-4 py-3">
//                   <input
//                     type="number"
//                     min="1"
//                     max="10"
//                     value={student.skill3}
//                     onChange={(e) => onUpdateStudent(student.id, 'skill3', validateScore(e.target.value))}
//                     className="w-20 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
//                   />
//                 </td>
//                 <td className="px-4 py-3">
//                   <input
//                     type="number"
//                     min="1"
//                     max="10"
//                     value={student.skill4}
//                     onChange={(e) => onUpdateStudent(student.id, 'skill4', validateScore(e.target.value))}
//                     className="w-20 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
//                   />
//                 </td>
//                 <td className="px-4 py-3">
//                   <input
//                     type="number"
//                     min="1"
//                     max="10"
//                     value={student.skill5}
//                     onChange={(e) => onUpdateStudent(student.id, 'skill5', validateScore(e.target.value))}
//                     className="w-20 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
//                   />
//                 </td>
//                 <td className="px-4 py-3">
//                   <button
//                     onClick={() => onRemoveStudent(student.id)}
//                     className="text-red-400 hover:text-red-300 transition-colors"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {students.length === 0 && (
//         <div className="text-center py-8 text-gray-400">
//           Нажмите "Добавить студента" для начала работы
//         </div>
//       )}

//       <div className="mt-4 text-gray-400 text-sm">
//         Всего студентов: {students.length} / 100+
//       </div>
//     </div>
//   );
// }

import { Student, Course } from '../types';
import { Trash2, Plus } from 'lucide-react';

interface StudentTableProps {
  students: Student[];
  course: Course;
  onUpdateStudent: (id: string, field: string, value: string | number) => void;
  onAddStudent: () => void;
  onRemoveStudent: (id: string) => void;
}

export default function StudentTable({
  students,
  course,
  onUpdateStudent,
  onAddStudent,
  onRemoveStudent,
}: StudentTableProps) {

  const validateScore = (value: string): number => {
    const num = parseInt(value) || 0;
    return Math.max(1, Math.min(10, num));
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      {/* Заголовок */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Список студентов</h2>
        <button
          onClick={onAddStudent}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Добавить студента
        </button>
      </div>

      {/* Таблица */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-200">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 w-8">#</th>
              <th className="px-4 py-3 min-w-[200px]">ФИО студента</th>
              {course.skills.map((skill, idx) => (
                <th key={idx} className="px-4 py-3 w-32">{skill}</th>
              ))}
              <th className="px-4 py-3 w-20">Действия</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, idx) => (
              <tr key={student.id} className="border-b border-gray-700 hover:bg-gray-750">
                <td className="px-4 py-3 text-gray-400">{idx + 1}</td>

                {/* ФИО */}
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={student.fullName}
                    onChange={(e) => onUpdateStudent(student.id, 'fullName', e.target.value)}
                    placeholder="Введите ФИО"
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </td>

                {/* Динамические навыки */}
                {course.skills.map((skill, skillIdx) => {
                  const skillKey = `skill${skillIdx + 1}`;
                  // Если поле не существует у студента, инициализируем 5
                  if (!(skillKey in student)) {
                    student[skillKey as keyof Student] = 5;
                  }

                  return (
                    <td key={skillIdx} className="px-4 py-3">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={student[skillKey as keyof Student] as number}
                        onChange={(e) =>
                          onUpdateStudent(student.id, skillKey, validateScore(e.target.value))
                        }
                        className="w-20 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </td>
                  );
                })}

                {/* Действия */}
                <td className="px-4 py-3">
                  <button
                    onClick={() => onRemoveStudent(student.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Пустой список */}
      {students.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          Нажмите "Добавить студента" для начала работы
        </div>
      )}

      <div className="mt-4 text-gray-400 text-sm">
        Всего студентов: {students.length} / 100+
      </div>
    </div>
  );
}
