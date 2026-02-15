import { Download, File, FileArchive, Loader2 } from 'lucide-react';
import { Student, Course } from '../types';
import {
  generateCertificatePDF,
  generateGroupPDF,
} from '../utils/pdfGenerator';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useState } from 'react';
import RussianDatePicker from './RussianDataPicker';

interface GenerateButtonsProps {
  students: Student[];
  course: Course;
}

export default function GenerateButtons({
  students,
  course,
}: GenerateButtonsProps) {
  const [certificateDate, setCertificateDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const isDisabled =
    loading ||
    students.length === 0 ||
    students.some((s) => !s.fullName.trim()) ||
    !course.templatePdf ||
    !certificateDate;

  const formattedDate = certificateDate?.toLocaleDateString('ru-RU');

  const generateSingleCertificate = async (student: Student) => {
    if (!formattedDate) return;

    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const generateAllCertificates = async () => {
    if (!formattedDate || !course.templatePdf) return;

    try {
      setLoading(true);
      setProgress(0);

      const zip = new JSZip();
      const folder = zip.folder('Сертификаты');

      for (let i = 0; i < students.length; i++) {
        const student = students[i];

        const pdfBytes = await generateCertificatePDF(
          student,
          course,
          formattedDate,
        );

        const fileName = `Сертификат_${student.fullName.replace(/\s+/g, '_')}.pdf`;
        folder?.file(fileName, pdfBytes);

        setProgress(Math.round(((i + 1) / students.length) * 100));
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });

      const zipFileName = `Сертификаты_${course.name.replace(
        /\s+/g,
        '_',
      )}_${new Date().toLocaleDateString('ru-RU').replace(/\./g, '-')}.zip`;

      saveAs(zipBlob, zipFileName);
    } catch (error) {
      console.error(error);
      alert('Ошибка генерации архива');
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const generateAllCertificatesPDF = async () => {
    if (!formattedDate || !course.templatePdf) return;

    try {
      setLoading(true);

      const pdfBytes = await generateGroupPDF(students, course, formattedDate);

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });

      const fileName = `Сертификаты_группы_${course.name.replace(
        /\s+/g,
        '_',
      )}.pdf`;

      saveAs(blob, fileName);
    } catch (error) {
      console.error(error);
      alert('Ошибка генерации PDF');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-5">
        Генерация сертификатов
      </h2>
      <RussianDatePicker
        value={certificateDate}
        onChange={(date) => setCertificateDate(date)}
      />
      {loading && progress > 0 && (
        <div className="w-full bg-gray-700 rounded mt-4 overflow-hidden">
          <div
            className="bg-green-500 h-2 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <div className="space-y-4 mt-5">
        <button
          onClick={generateAllCertificates}
          disabled={isDisabled}
          className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold text-lg transition-all ${
            isDisabled
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
          }`}
        >
          {loading ? <Loader2 className="animate-spin" /> : <FileArchive />}
          Скачать все (ZIP)
        </button>
        <button
          onClick={generateAllCertificatesPDF}
          disabled={isDisabled}
          className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold text-lg transition-all ${
            isDisabled
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
          }`}
        >
          {loading ? <Loader2 className="animate-spin" /> : <File />}
          Скачать одним PDF
        </button>

        {/* SINGLE */}
        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-lg font-semibold text-white mb-3">
            Индивидуальные сертификаты
          </h3>

          <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => generateSingleCertificate(student)}
                disabled={!student.fullName.trim() || loading}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  !student.fullName.trim() || loading
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                <span className="truncate">
                  {student.fullName || 'Без имени'}
                </span>

                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Download size={18} />
                )}
              </button>
            ))}
          </div>

          {students.length === 0 && (
            <div className="text-center py-6 text-gray-400">
              Добавьте студентов
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
