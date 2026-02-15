import { Download, FileArchive } from 'lucide-react';
import { Student, Course } from '../types';
import { generateCertificatePDF } from '../utils/pdfGenerator';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useState } from 'react';

interface GenerateButtonsProps {
  students: Student[];
  course: Course;
}

export default function GenerateButtons({
  students,
  course,
}: GenerateButtonsProps) {
  const [certificateDate, setCertificateDate] = useState('');
  const isDisabled =
    students.length === 0 ||
    students.some((s) => !s.fullName.trim()) ||
    !course.templatePdf ||
    !certificateDate;
  // const generateSingleCertificate = async (student: Student) => {
  //   if (!course.templatePdf) {
  //     alert(`Для курса "${course.name}" не загружен PDF-шаблон`);
  //     return;
  //   }
  //   try {
  //     const pdfBytes = await generateCertificatePDF(student, course);
  //     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  //     const fileName = `Сертификат_${student.fullName.replace(/\s+/g, '_')}.pdf`;
  //     saveAs(blob, fileName);
  //   } catch (error) {
  //     console.error('Ошибка генерации сертификата:', error);
  //     alert('Ошибка при генерации сертификата');
  //   }
  // };
  const generateSingleCertificate = async (student: Student) => {
    if (!certificateDate) return;

    try {
      const formattedDate = new Date(certificateDate).toLocaleDateString(
        'ru-RU',
      );

      await generateCertificatePDF(student, course, formattedDate);

      const pdfBytes = await generateCertificatePDF(
        student,
        course,
        formattedDate,
      );

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const fileName = `Сертификат_${student.fullName.replace(/\s+/g, '_')}.pdf`;
      saveAs(blob, fileName);
    } catch (error) {
      console.error(error);
      alert('Ошибка генерации сертификата');
    }
  };

  const generateAllCertificates = async () => {
    if (isDisabled) {
      alert('Пожалуйста, заполните ФИО всех студентов');
      return;
    }
    if (!course.templatePdf) {
      alert(`Для курса "${course.name}" не загружен PDF-шаблон`);
      return;
    }

    try {
      const zip = new JSZip();
      const folder = zip.folder('Сертификаты');
      const formattedDate = new Date(certificateDate).toLocaleDateString(
        'ru-RU',
      );
      for (const student of students) {
        const pdfBytes = await generateCertificatePDF(
          student,
          course,
          formattedDate,
        );
        const fileName = `Сертификат_${student.fullName.replace(/\s+/g, '_')}.pdf`;
        folder?.file(fileName, pdfBytes);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const zipFileName = `Сертификаты_${course.name.replace(/\s+/g, '_')}_${new Date().toLocaleDateString('ru-RU').replace(/\./g, '-')}.zip`;
      saveAs(zipBlob, zipFileName);
    } catch (error) {
      console.error('Ошибка генерации архива:', error);
      alert('Ошибка при генерации архива сертификатов');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">
        Генерация сертификатов
      </h2>

      <div className="mb-4">
        <label className="block text-gray-300 text-sm mb-1">
          Дата сертификата
        </label>

        <input
          type="date"
          value={certificateDate}
          onChange={(e) => setCertificateDate(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
        />

        {!certificateDate && (
          <p className="text-xs text-gray-500 mt-1">
            Выберите дату для генерации сертификатов
          </p>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <button
            onClick={generateAllCertificates}
            disabled={isDisabled}
            className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold text-lg transition-all ${
              isDisabled
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            <FileArchive size={24} />
            Скачать все сертификаты (ZIP)
          </button>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-lg font-semibold text-white mb-3">
            Индивидуальные сертификаты
          </h3>
          <div className="max-h-64 overflow-y-auto space-y-2">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => generateSingleCertificate(student)}
                disabled={!student.fullName.trim()}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  !student.fullName.trim()
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                <span className="truncate">
                  {student.fullName || 'Без имени'}
                </span>
                <Download size={18} />
              </button>
            ))}
          </div>

          {students.length === 0 && (
            <div className="text-center py-6 text-gray-400">
              Добавьте студентов для генерации сертификатов
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
