import { useState, useRef, useEffect } from 'react';
import { Student, Course } from '../types';
import { Trash2, Plus, Users, Award, X, Upload } from 'lucide-react';

interface StudentTableProps {
  students: Student[];
  course: Course;
  onUpdateStudent: (id: string, field: string, value: string | number) => void;
  onAddStudent: () => void;
  onRemoveStudent: (id: string) => void;
  onBulkAddStudents: (names: string[]) => void;
  onSetAllMaxScores: () => void;
  onUpdateSkillScore: (studentId: string, skillName: string, score: number) => void;
}

export default function StudentTable({
  students,
  course,
  onUpdateStudent,
  onAddStudent,
  onRemoveStudent,
  onBulkAddStudents,
  onSetAllMaxScores,
  onUpdateSkillScore,
}: StudentTableProps) {
  const [bulkInput, setBulkInput] = useState('');
  const [showBulkInput, setShowBulkInput] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  useEffect(() => {
    const newValues: Record<string, string> = {};
    students.forEach(student => {
      Object.entries(student.skills).forEach(([skill, score]) => {
        newValues[`${student.id}-${skill}`] = String(score);
      });
    });
    setInputValues(prev => ({ ...prev, ...newValues }));
  }, [students]);

  const handleScoreChange = (studentId: string, skillName: string, value: string) => {
    const key = `${studentId}-${skillName}`;
    setInputValues(prev => ({ ...prev, [key]: value }));
    const num = parseInt(value);
    if (!isNaN(num) && num >= 1 && num <= 10) {
      onUpdateSkillScore(studentId, skillName, num);
    }
  };

  const handleScoreBlur = (studentId: string, skillName: string) => {
    const key = `${studentId}-${skillName}`;
    const value = inputValues[key];
    const num = parseInt(value) || 5;
    const clamped = Math.max(1, Math.min(10, num));

    setInputValues(prev => ({ ...prev, [key]: String(clamped) }));
    onUpdateSkillScore(studentId, skillName, clamped);
  };

  const handleBulkSubmit = () => {
    const names = bulkInput
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    if (names.length > 0) {
      onBulkAddStudents(names);
      setBulkInput('');
      setShowBulkInput(false);
    }
  };

  // const handlePaste = (e: React.ClipboardEvent) => {
  //   e.preventDefault();
  //   const pastedText = e.clipboardData.getData('text');
  //   const names = pastedText
  //     .split(/[\n,]/)
  //     .map(name => name.trim())
  //     .filter(name => name.length > 0);
    
  //   if (names.length > 0) {
  //     onBulkAddStudents(names);
  //   }
  // };

  if (course.skills.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 shadow-xl text-center">
        <div className="text-gray-500 mb-2">
          <Award size={48} className="mx-auto opacity-50" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Навыки не настроены</h3>
        <p className="text-gray-400">Добавьте навыки в редакторе выше, чтобы начать заполнять таблицу</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      {/* Заголовок с кнопками */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
        <h2 className="text-2xl font-bold text-white">Список студентов</h2>
        
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setShowBulkInput(!showBulkInput)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Upload size={20} />
            {showBulkInput ? 'Скрыть' : 'Вставить список'}
          </button>

          <button
            onClick={onSetAllMaxScores}
            disabled={students.length === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              students.length === 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-yellow-600 hover:bg-yellow-700 text-white'
            }`}
          >
            <Award size={20} />
            Все 10 баллов
          </button>

          <button
            onClick={onAddStudent}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Добавить
          </button>
        </div>
      </div>
      {showBulkInput && (
        <div className="mb-6 p-4 bg-gray-700 rounded-lg border border-gray-600 animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Users size={18} />
              Массовый ввод студентов
            </h3>
            <button 
              onClick={() => setShowBulkInput(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
          <textarea
            ref={textareaRef}
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            // onPaste={handlePaste}
            placeholder="Вставьте ФИО студентов (каждое с новой строки)..."
            className="w-full h-32 bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-gray-400 text-sm">
              Будет добавлено: {bulkInput.split('\n').filter(n => n.trim()).length} чел.
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setBulkInput('')}
                className="px-3 py-1 text-gray-400 hover:text-white text-sm"
              >
                Очистить
              </button>
              <button
                onClick={handleBulkSubmit}
                disabled={!bulkInput.trim()}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg text-sm font-medium"
              >
                Добавить в таблицу
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-200">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 w-8 text-center">#</th>
              <th className="px-4 py-3 min-w-[200px]">ФИО студента</th>
              {course.skills.map((skill) => (
                <th key={skill} className="px-2 py-3 w-24 text-center text-sm">
                  {skill}
                </th>
              ))}
              <th className="px-4 py-3 w-16 text-center">✕</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={student.id} className="border-b border-gray-700 hover:bg-gray-750/50 transition-colors">
                <td className="px-4 py-3 text-gray-400 text-center">{idx + 1}</td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={student.fullName}
                    onChange={(e) => onUpdateStudent(student.id, 'fullName', e.target.value)}
                    placeholder="Введите ФИО"
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </td>
                {course.skills.map((skill) => {
                  const key = `${student.id}-${skill}`;
                  const currentValue = inputValues[key] ?? String(student.skills[skill] ?? 5);
                  
                  return (
                    <td key={skill} className="px-2 py-3">
                      <input
                        type="text" 
                        inputMode="numeric" 
                        pattern="[0-9]*"
                        value={currentValue}
                        onChange={(e) => handleScoreChange(student.id, skill, e.target.value)}
                        onBlur={() => handleScoreBlur(student.id, skill)}
                        onFocus={(e) => e.target.select()} 
                        className="w-16 mx-auto block bg-gray-700 border border-gray-600 rounded px-2 py-2 text-white text-center focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      />
                    </td>
                  );
                })}
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onRemoveStudent(student.id)}
                    className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-900/30 rounded-lg"
                    title="Удалить студента"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {students.length === 0 && (
        <div className="text-center py-12 text-gray-400 bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-700">
          <Users size={48} className="mx-auto mb-3 opacity-50" />
          <p className="text-lg mb-1">Нет студентов</p>
          <p className="text-sm text-gray-500">Добавьте студентов вручную или вставьте списом</p>
        </div>
      )}
      <div className="mt-4 flex justify-between items-center text-sm">
        <span className="text-gray-400">
          Всего: {students.length} {students.length === 1 ? 'студент' : students.length < 5 ? 'студента' : 'студентов'}
        </span>
        {students.length > 0 && (
          <span className="text-gray-500">
            Навыков в курсе: {course.skills.length}
          </span>
        )}
      </div>
    </div>
  );
}