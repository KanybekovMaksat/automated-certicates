import { useState } from 'react';
import { FileText } from 'lucide-react';
import { Student, Course, COURSES } from './types';
import CourseSelector from './components/CourseSelector';
import StudentTable from './components/StudentTable';
import GenerateButtons from './components/GenerateButtons';
import TemplateUploader from './components/TemplateUploader';
import SkillEditor from './components/SkillEditor';

function App() {
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loadedTemplates, setLoadedTemplates] = useState<
    Record<string, string>
  >({});

  const handleAddStudent = () => {
    const newStudent: Student = {
      id: `student-${Date.now()}`,
      fullName: '',
      skill1: 5,
      skill2: 5,
      skill3: 5,
      skill4: 5,
      skill5: 5,
    };
    setStudents([...students, newStudent]);
  };

  const handleRemoveStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleUpdateStudent = (
    id: string,
    field: keyof Student,
    value: string | number,
  ) => {
    setStudents(
      students.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };

  const handleSelectCourse = (course: Course) => {
    const courseWithTemplate = courses.find((c) => c.id === course.id);
    setSelectedCourse(courseWithTemplate || course);
    setStudents([]);
  };

  const handleTemplateLoad = (
    courseId: string,
    template: Uint8Array,
    fileName: string,
  ) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? { ...c, templatePdf: template.length > 0 ? template : undefined }
          : c,
      ),
    );

    if (fileName) {
      setLoadedTemplates((prev) => ({ ...prev, [courseId]: fileName }));
    } else {
      setLoadedTemplates((prev) => {
        const updated = { ...prev };
        delete updated[courseId];
        return updated;
      });
    }

    if (selectedCourse?.id === courseId) {
      setSelectedCourse((prev) =>
        prev
          ? { ...prev, templatePdf: template.length > 0 ? template : undefined }
          : null,
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex flex-col items-center justify-center gap-3 mb-2">
            <img src="/images/codify-full-logo.svg" alt="" />
            <h1 className="text-4xl font-bold text-white">
              Генератор сертификатов
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            разработано специально для Отдела Забот 💙
          </p>
        </header>

        <div className="space-y-6">
          <TemplateUploader
            courses={courses}
            onTemplateLoad={handleTemplateLoad}
            loadedTemplates={loadedTemplates}
          />

          <CourseSelector
            selectedCourse={selectedCourse}
            onSelectCourse={handleSelectCourse}
          />

          {selectedCourse && (
            <>
              <SkillEditor
                skills={selectedCourse.skills}
                onChange={(updatedSkills) => {
                  setSelectedCourse({
                    ...selectedCourse,
                    skills: updatedSkills,
                  });
                  setCourses((prev) =>
                    prev.map((c) =>
                      c.id === selectedCourse.id
                        ? { ...c, skills: updatedSkills }
                        : c,
                    ),
                  );
                }}
              />

              <StudentTable
                students={students}
                course={selectedCourse}
                onUpdateStudent={handleUpdateStudent}
                onAddStudent={handleAddStudent}
                onRemoveStudent={handleRemoveStudent}
              />

              <GenerateButtons students={students} course={selectedCourse} />
            </>
          )}

          {!selectedCourse && (
            <div className="bg-gray-800 rounded-lg p-12 text-center">
              <p className="text-gray-400 text-xl">
                Выберите курс для начала работы
              </p>
            </div>
          )}
        </div>

        {/* <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>поддержкой и развитией данного сайта занимается  <a href="http://instagram.com/maksat.up" target="_blank" rel="noopener noreferrer">mentor</a></p>
        </footer> */}
      </div>
    </div>
  );
}

export default App;
