import { Course, COURSES } from '../types';

interface CourseSelectorProps {
  selectedCourse: Course | null;
  onSelectCourse: (course: Course) => void;
}

export default function CourseSelector({ selectedCourse, onSelectCourse }: CourseSelectorProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">Выберите курс</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {COURSES.map((course) => (
          <button
            key={course.id}
            onClick={() => onSelectCourse(course)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedCourse?.id === course.id
                ? 'border-blue-500 bg-blue-900 text-white'
                : 'border-gray-600 bg-gray-700 text-gray-200 hover:border-blue-400 hover:bg-gray-650'
            }`}
          >
            <h3 className="font-bold text-lg mb-2">{course.name}</h3>
            <div className="text-sm opacity-75">
              {course.skills.map((skill, index) => (
                <span key={index} className="inline-block mr-2 mb-1">
                  • {skill}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
