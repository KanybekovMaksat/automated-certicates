// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
// import { Student, Course } from '../types';

// export async function generateCertificatePDF(
//   student: Student,
//   course: Course
// ): Promise<Uint8Array> {
//   let pdfDoc: PDFDocument;

//   if (course.templatePdf) {
//     pdfDoc = await PDFDocument.load(course.templatePdf);
//   } else {
//     pdfDoc = await PDFDocument.create();
//     pdfDoc.addPage([842, 595]);
//   }

//   const page = pdfDoc.getPage(0);
//   const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

//   const { height } = page.getSize();

//   page.drawText(student.fullName, {
//     x: 150,
//     y: height - 180,
//     size: 24,
//     font: helveticaBold,
//     color: rgb(0, 0, 0),
//   });

//   const skills = [
//     { name: course.skills[0], score: student.skill1 },
//     { name: course.skills[1], score: student.skill2 },
//     { name: course.skills[2], score: student.skill3 },
//     { name: course.skills[3], score: student.skill4 },
//     { name: course.skills[4], score: student.skill5 },
//   ];

//   let yPosition = height - 280;
//   skills.forEach((skill, index) => {
//     page.drawText(`${skill.name}: ${skill.score}/10`, {
//       x: 150,
//       y: yPosition - (index * 30),
//       size: 12,
//       font: helvetica,
//       color: rgb(0, 0, 0),
//     });
//   });

//   const avgScore = (
//     (student.skill1 + student.skill2 + student.skill3 + student.skill4 + student.skill5) / 5
//   ).toFixed(1);

//   page.drawText(`Средний балл: ${avgScore}/10`, {
//     x: 150,
//     y: yPosition - (skills.length * 30) - 20,
//     size: 12,
//     font: helveticaBold,
//     color: rgb(0, 0, 0),
//   });

//   const today = new Date().toLocaleDateString('ru-RU');
//   page.drawText(`${today}`, {
//     x: 150,
//     y: 80,
//     size: 11,
//     font: helvetica,
//     color: rgb(0.4, 0.4, 0.4),
//   });

//   const pdfBytes = await pdfDoc.save();
//   return pdfBytes;
// }

// import { PDFDocument, rgb } from 'pdf-lib';
// import fontkit from '@pdf-lib/fontkit';
// import { Student, Course } from '../types';

// export async function generateCertificatePDF(
//   student: Student,
//   course: Course
// ): Promise<Uint8Array> {

//   let pdfDoc: PDFDocument;

//   if (course.templatePdf) {
//     pdfDoc = await PDFDocument.load(course.templatePdf);
//   } else {
//     pdfDoc = await PDFDocument.create();
//     pdfDoc.addPage([842, 595]);
//   }

//   // 🔴 ВАЖНО
//   pdfDoc.registerFontkit(fontkit);

//   const fontRegularBytes = await fetch('/fonts/Roboto-Regular.ttf').then(res => res.arrayBuffer());
//   const fontBoldBytes = await fetch('/fonts/Roboto-Bold.ttf').then(res => res.arrayBuffer());

//   const font = await pdfDoc.embedFont(fontRegularBytes);
//   const fontBold = await pdfDoc.embedFont(fontBoldBytes);

//   const page = pdfDoc.getPage(0);
//   const { height } = page.getSize();

//   page.drawText(student.fullName, {
//     x: 150,
//     y: height - 180,
//     size: 24,
//     font: fontBold,
//     color: rgb(0, 0, 0),
//   });

//   const skills = [
//     { name: course.skills[0], score: student.skill1 },
//     { name: course.skills[1], score: student.skill2 },
//     { name: course.skills[2], score: student.skill3 },
//     { name: course.skills[3], score: student.skill4 },
//     { name: course.skills[4], score: student.skill5 },
//   ];

//   let yPosition = height - 280;
//   skills.forEach((skill, index) => {
//     page.drawText(`${skill.name}: ${skill.score}/10`, {
//       x: 150,
//       y: yPosition - index * 30,
//       size: 12,
//       font,
//       color: rgb(0, 0, 0),
//     });
//   });

//   const avgScore = (
//     (student.skill1 + student.skill2 + student.skill3 + student.skill4 + student.skill5) / 5
//   ).toFixed(1);

//   page.drawText(`Средний балл: ${avgScore}/10`, {
//     x: 150,
//     y: yPosition - skills.length * 30 - 20,
//     size: 12,
//     font: fontBold,
//     color: rgb(0, 0, 0),
//   });

//   const today = new Date().toLocaleDateString('ru-RU');
//   page.drawText(today, {
//     x: 150,
//     y: 80,
//     size: 11,
//     font,
//     color: rgb(0.4, 0.4, 0.4),
//   });

//   return await pdfDoc.save();
// }

import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { Student, Course } from '../types';

export async function generateCertificatePDF(
  student: Student,
  course: Course,
  date: string, // дата из UI
): Promise<Uint8Array> {
  const templateDoc = await PDFDocument.load(course.templatePdf!);

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const [templatePage] = await pdfDoc.copyPages(templateDoc, [0]);
  const page = pdfDoc.addPage(templatePage);

  const fontBytes = await fetch('/fonts/DelaGothicOne-Regular.ttf').then((r) =>
    r.arrayBuffer(),
  );
  // const fontBoldBytes = await fetch('/fonts/Roboto-Bold.ttf').then(r => r.arrayBuffer());

  const font = await pdfDoc.embedFont(fontBytes);
  // const fontBold = await pdfDoc.embedFont(fontBoldBytes);

  const { height } = page.getSize();

  const textBlue = rgb(0x31 / 255, 0x52 / 255, 0x9a / 255);

  page.drawText(student.fullName, {
    x: 320,
    y: height - 265,
    size: 27,
    font,
    color: textBlue,
  });

  const green = rgb(0x89 / 255, 0xc7 / 255, 0x23 / 255);
  const gray = rgb(0.85, 0.85, 0.85);

  const skills = course.skills ?? [];
  // Берем только те значения навыков студента, которые соответствуют курсу
  const skillScores = [student.skill1, student.skill2, student.skill3].slice(
    0,
    skills.length,
  );

  const startX = 310; // левая граница блока навыков
  const startY = height - 370;
  const rowGap = 36; // расстояние между строками
  const textSize = 15;

  const boxSize = 22;
  const boxSizeHeight = 10;
  const boxGap = 4;
  const textToBoxesGap = 12; // отступ между текстом и квадратиками

  const skillFontSize = 18;

  // skillScores.forEach((score, index) => {
  //   const y = startY - index * rowGap;

  //   const skillName = course.skills?.[index] ?? '';

  //   // Текст навыка
  //   page.drawText(skillName, {
  //     x: startX,
  //     y,
  //     size: skillFontSize,
  //     font,
  //     color: textBlue,
  //   });

  //   // Ширина текста с правильным fontSize
  //   const textWidth = font.widthOfTextAtSize(skillName, skillFontSize);

  //   // немного сдвигаем вправо
  //   const boxesStartX = startX + textWidth + textToBoxesGap + 10;

  //   // Центрирование по вертикали относительно текста
  //   const textHeight = font.heightAtSize(skillFontSize);
  //   // const boxY = y + textHeight / 2 - boxSizeHeight / 2 - 2;
  //   const boxY = y - boxSizeHeight / 2 + 4; // чуть выше центра для лучшего визуала

  //   for (let i = 0; i < 10; i++) {
  //     page.drawRectangle({
  //       x: boxesStartX + i * (boxSize + boxGap),
  //       y: boxY,
  //       width: boxSize,
  //       height: boxSizeHeight,
  //       color: i < score ? green : gray,
  //     });
  //   }
  // });

  skillScores.forEach((score, index) => {
    const y = startY - index * rowGap;
    const skillName = skills[index];

    if (!skillName) return;
    // Текст навыка
    page.drawText(skillName, {
      x: startX,
      y,
      size: skillFontSize,
      font,
      color: textBlue,
    });

    const textWidth = font.widthOfTextAtSize(skillName, skillFontSize);
    const boxesStartX = startX + textWidth + textToBoxesGap + 10;

    const boxY = y - boxSizeHeight / 2 + 4;

    for (let i = 0; i < 10; i++) {
      const isFilled = i < (score ?? 0);

      if (isFilled) {
        // Заполненный квадратик
        page.drawRectangle({
          x: boxesStartX + i * (boxSize + boxGap),
          y: boxY,
          width: boxSize,
          height: boxSizeHeight,
          color: green,
        });
      } else {
        // Пустой квадратик: заливка белая, граница светло-серая
        page.drawRectangle({
          x: boxesStartX + i * (boxSize + boxGap),
          y: boxY,
          width: boxSize,
          height: boxSizeHeight,
          color: rgb(1, 1, 1), // белый фон
          borderColor: green, // рамка
          borderWidth: 1, // ширина рамки
        });
      }
    }
  });

  page.drawText(date, {
    x: 705,
    y: height - 50,
    size: 11,
    font,
    color: textBlue,
  });

  return await pdfDoc.save();
}

async function addStudentPage(
  pdfDoc: PDFDocument,
  templatePage: any,
  font: any,
  student: Student,
  course: Course,
  date: string,
) {
  const page = pdfDoc.addPage(templatePage); // копируем шаблон
  const { height } = page.getSize();
  const textBlue = rgb(0x31 / 255, 0x52 / 255, 0x9a / 255);

  // ФИО студента
  page.drawText(student.fullName ?? '', {
    x: 320,
    y: height - 265,
    size: 27,
    font,
    color: textBlue,
  });

  // Навыки
  const green = rgb(0x89 / 255, 0xc7 / 255, 0x23 / 255);
  const gray = rgb(0.85, 0.85, 0.85);
  const skills = course.skills ?? [];
  const skillScores = [student.skill1, student.skill2, student.skill3].slice(
    0,
    skills.length,
  );

  const startX = 310;
  const startY = height - 370;
  const rowGap = 36;
  const boxSize = 20;
  const boxSizeHeight = 10;
  const boxGap = 4;
  const textToBoxesGap = 12;
  const skillFontSize = 18;

  skillScores.forEach((score, index) => {
    const y = startY - index * rowGap;
    const skillName = skills[index];
    if (!skillName) return;

    page.drawText(skillName, {
      x: startX,
      y,
      size: skillFontSize,
      font,
      color: textBlue,
    });

    const textWidth = font.widthOfTextAtSize(skillName, skillFontSize);
    const boxesStartX = startX + textWidth + textToBoxesGap + 10;
    const boxY = y - boxSizeHeight / 2 + 4;


        for (let i = 0; i < 10; i++) {
      const isFilled = i < (score ?? 0);

      if (isFilled) {
        // Заполненный квадратик
        page.drawRectangle({
          x: boxesStartX + i * (boxSize + boxGap),
          y: boxY,
          width: boxSize,
          height: boxSizeHeight,
          color: green,
        });
      } else {
        // Пустой квадратик: заливка белая, граница светло-серая
        page.drawRectangle({
          x: boxesStartX + i * (boxSize + boxGap),
          y: boxY,
          width: boxSize,
          height: boxSizeHeight,
          color: rgb(1, 1, 1), // белый фон
          borderColor: green, // рамка
          borderWidth: 1, // ширина рамки
        });
      }
    }

  });

  page.drawText(date, {
    x: 705,
    y: height - 50,
    size: 11,
    font,
    color: textBlue,
  });
}

export async function generateGroupPDF(
  students: Student[],
  course: Course,
  date: string,
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  // Шаблон и шрифт
  const templateDoc = await PDFDocument.load(course.templatePdf!);
  const fontBytes = await fetch('/fonts/DelaGothicOne-Regular.ttf').then((r) =>
    r.arrayBuffer(),
  );
  const font = await pdfDoc.embedFont(fontBytes);

  for (const student of students) {
    // Копируем страницу шаблона для каждого студента
    const [templatePageCopy] = await pdfDoc.copyPages(templateDoc, [0]);
    await addStudentPage(pdfDoc, templatePageCopy, font, student, course, date);
  }

  return await pdfDoc.save();
}
