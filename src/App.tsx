import { useState } from 'react';
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
  const [loadedTemplates, setLoadedTemplates] = useState<Record<string, string>>({});

  const createStudentWithSkills = (fullName: string = ''): Student => {
    const skills: Record<string, number> = {};
    selectedCourse?.skills.forEach(skill => {
      skills[skill] = 5; 
    });
    
    return {
      id: `student-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      fullName,
      skills,
    };
  };

  const handleAddStudent = () => {
    setStudents(prev => [...prev, createStudentWithSkills()]);
  };

  const handleBulkAddStudents = (names: string[]) => {
    const newStudents = names.map(name => createStudentWithSkills(name));
    setStudents(prev => [...prev, ...newStudents]);
  };

  const handleUpdateSkillScore = (studentId: string, skillName: string, score: number) => {
    setStudents(prev => prev.map(student => {
      if (student.id !== studentId) return student;
      return {
        ...student,
        skills: {
          ...student.skills,
          [skillName]: score
        }
      };
    }));
  };

  const handleSetAllMaxScores = () => {
    setStudents(prev => prev.map(student => {
      const maxSkills: Record<string, number> = {};
      Object.keys(student.skills).forEach(skill => {
        maxSkills[skill] = 10;
      });
      return { ...student, skills: maxSkills };
    }));
  };

  const handleRemoveStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const handleUpdateStudent = (id: string, field: keyof Student, value: string | number) => {
    setStudents(prev => prev.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };
  const handleSkillsChange = (newSkills: string[]) => {
    if (!selectedCourse) return;
    const updatedCourse = { ...selectedCourse, skills: newSkills };
    setSelectedCourse(updatedCourse);
    setCourses(prev => prev.map(c => 
      c.id === selectedCourse.id ? updatedCourse : c
    ));
    setStudents(prev => prev.map(student => {
      const updatedSkills: Record<string, number> = {};
      newSkills.forEach(skill => {
        updatedSkills[skill] = student.skills[skill] ?? 5;
      });
      
      return { ...student, skills: updatedSkills };
    }));
  };

  const handleSelectCourse = (course: Course) => {
    const courseWithTemplate = courses.find(c => c.id === course.id);
    const finalCourse = courseWithTemplate || course;
    setSelectedCourse(finalCourse);
    setStudents([]); 
  };

  const handleTemplateLoad = (courseId: string, template: Uint8Array, fileName: string) => {
    setCourses(prev => prev.map(c => 
      c.id === courseId 
        ? { ...c, templatePdf: template.length > 0 ? template : undefined }
        : c
    ));

    setLoadedTemplates(prev => {
      const updated = { ...prev };
      if (fileName) {
        updated[courseId] = fileName;
      } else {
        delete updated[courseId];
      }
      return updated;
    });

    if (selectedCourse?.id === courseId) {
      setSelectedCourse(prev => prev 
        ? { ...prev, templatePdf: template.length > 0 ? template : undefined }
        : null
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex flex-col items-center justify-center gap-3 mb-2">
            <img src="/images/codify-full-logo.svg" alt="" />
            <h1 className="text-4xl font-bold text-white">Генератор сертификатов</h1>
          </div>
          <p className="text-gray-400 text-lg">разработано специально для Отдела Заботы 💙</p>
        </header>
        <div className="space-y-6">
          <TemplateUploader
            courses={courses}
            onTemplateLoad={handleTemplateLoad}
            loadedTemplates={loadedTemplates}
          />

          <CourseSelector
            courses={courses}
            selectedCourse={selectedCourse}
            onSelectCourse={handleSelectCourse}
          />

          {selectedCourse && (
            <>
              <SkillEditor
                skills={selectedCourse.skills}
                onChange={handleSkillsChange}
              />

              <StudentTable
                students={students}
                course={selectedCourse}
                onUpdateStudent={handleUpdateStudent}
                onAddStudent={handleAddStudent}
                onRemoveStudent={handleRemoveStudent}
                onBulkAddStudents={handleBulkAddStudents}
                onSetAllMaxScores={handleSetAllMaxScores}
                onUpdateSkillScore={handleUpdateSkillScore}
              />

              {students.length > 0 && selectedCourse.skills.length > 0 && (
                <GenerateButtons 
                  students={students} 
                  course={selectedCourse}
                />
              )}
            </>
          )}

          {!selectedCourse && (
            <div className="bg-gray-800 rounded-lg p-12 text-center">
              <p className="text-gray-400 text-xl">Выберите курс для начала работы</p>
            </div>
          )}
        </div>
        <footer>
          <p className="mt-12 text-center text-gray-500 text-sm">
            idea by <a href="https://instagram.com/maksat.up" target="_blank" rel="noopener noreferrer">Maksat</a> &
            <a href="https://t.me/deniza_kkk" target="_blank" rel="noopener noreferrer"> Deniza</a> 
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;