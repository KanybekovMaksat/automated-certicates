import { Upload, File, X } from 'lucide-react';
import { Course } from '../types';

interface TemplateUploaderProps {
  courses: Course[];
  onTemplateLoad: (courseId: string, template: Uint8Array, fileName: string) => void;
  loadedTemplates: Record<string, string>;
}

export default function TemplateUploader({
  courses,
  onTemplateLoad,
  loadedTemplates,
}: TemplateUploaderProps) {
  const handleFileChange = async (courseId: string, file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      onTemplateLoad(courseId, uint8Array, file.name);
    } catch (error) {
      console.error('Ошибка загрузки шаблона:', error);
      alert('Ошибка при загрузке PDF-шаблона');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <Upload size={24} className="text-blue-400" />
        <h2 className="text-2xl font-bold text-white">Загрузка PDF-шаблонов</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="border border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-colors">
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileChange(course.id, file);
                  }
                }}
                className="hidden"
                id={`pdf-input-${course.id}`}
              />
              <label
                htmlFor={`pdf-input-${course.id}`}
                className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                  loadedTemplates[course.id]
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-gray-600 hover:border-blue-500 hover:bg-gray-700/50'
                }`}
              >
                {loadedTemplates[course.id] ? (
                  <div className="text-center">
                    <File size={32} className="text-green-400 mx-auto mb-2" />
                    <p className="text-green-400 font-semibold text-sm break-all">
                      {loadedTemplates[course.id]}
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload size={32} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-300 font-medium">Нажмите для загрузки</p>
                    <p className="text-gray-500 text-sm">PDF-файл максимум 10 МБ</p>
                  </div>
                )}
              </label>
            </div>
            {loadedTemplates[course.id] && (
              <button
                onClick={() => onTemplateLoad(course.id, new Uint8Array(), '')}
                className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors text-sm"
              >
                <X size={16} />
                Удалить шаблон
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-blue-300 text-sm">
          Загруженные PDF-шаблоны будут использоваться как основа для сертификатов. ФИО и оценки будут добавлены автоматически.
        </p>
      </div>
    </div>
  );
}
