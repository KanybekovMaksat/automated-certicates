// import { PDFDocument, rgb } from 'pdf-lib';
// import fontkit from '@pdf-lib/fontkit';
// import { Student, Course } from '../types';

// const TEXT_BLUE = rgb(0x31 / 255, 0x52 / 255, 0x9a / 255);
// const GREEN = rgb(0x89 / 255, 0xc7 / 255, 0x23 / 255);
// const WHITE = rgb(1, 1, 1);

// const START_X = 310;
// const START_Y_OFFSET = 355; 
// const ROW_GAP = 36;
// const BOX_SIZE = 22;
// const BOX_HEIGHT = 10;
// const BOX_GAP = 4;
// const TEXT_TO_BOXES_GAP = 12;
// const SKILL_FONT_SIZE = 18;
// const BOXES_END_X = 760; // правая граница, подгони под шаблон

// async function drawStudentPage(
//   page: any,
//   font: any,
//   student: Student,
//   course: Course,
//   date: string,
//   height: number,
// ) {
//   page.drawText(student.fullName ?? '', {
//     x: 320,
//     y: height - 265,
//     size: 27,
//     font,
//     color: TEXT_BLUE,
//   });


//   const skills = course.skills ?? [];
//   const startY = height - START_Y_OFFSET;

//   skills.forEach((skillName, index) => {
//     const score = student.skills[skillName] ?? 5;
//     const y = startY - index * ROW_GAP;

//     // Текст навыка
// page.drawText(skillName, {
//   x: START_X,
//   y,
//   size: SKILL_FONT_SIZE,
//   font,
//   color: TEXT_BLUE,
// });

// const totalBoxesWidth = 10 * BOX_SIZE + 9 * BOX_GAP;
// const boxesStartX = BOXES_END_X - totalBoxesWidth;

// const boxY = y - BOX_HEIGHT / 2 + 4;

// for (let i = 0; i < 10; i++) {
//   const isFilled = i < score;

//   page.drawRectangle({
//     x: boxesStartX + i * (BOX_SIZE + BOX_GAP),
//     y: boxY,
//     width: BOX_SIZE,
//     height: BOX_HEIGHT,
//     color: isFilled ? GREEN : WHITE,
//     borderColor: GREEN,
//     borderWidth: isFilled ? 0 : 1,
//   });
// }

//   //   // Текст навыка
//   //   page.drawText(skillName, {
//   //     x: START_X,
//   //     y,
//   //     size: SKILL_FONT_SIZE,
//   //     font,
//   //     color: TEXT_BLUE,
//   //   });

//   //   const textWidth = font.widthOfTextAtSize(skillName, SKILL_FONT_SIZE);
//   //   const boxesStartX = START_X + textWidth + TEXT_TO_BOXES_GAP + 10;
//   //   const boxY = y - BOX_HEIGHT / 2 + 4;

//   //   for (let i = 0; i < 10; i++) {
//   //     const isFilled = i < score;

//   //     if (isFilled) {
//   //       page.drawRectangle({
//   //         x: boxesStartX + i * (BOX_SIZE + BOX_GAP),
//   //         y: boxY,
//   //         width: BOX_SIZE,
//   //         height: BOX_HEIGHT,
//   //         color: GREEN,
//   //       });
//   //     } else {
//   //       page.drawRectangle({
//   //         x: boxesStartX + i * (BOX_SIZE + BOX_GAP),
//   //         y: boxY,
//   //         width: BOX_SIZE,
//   //         height: BOX_HEIGHT,
//   //         color: WHITE,
//   //         borderColor: GREEN,
//   //         borderWidth: 1,
//   //       });
//   //     }
//   //   }
//   // });

//   page.drawText(date, {
//     x: 705,
//     y: height - 50,
//     size: 11,
//     font,
//     color: TEXT_BLUE,
//   });
// }

// export async function generateCertificatePDF(
//   student: Student,
//   course: Course,
//   date: string,
// ): Promise<Uint8Array> {
//   if (!course.templatePdf) {
//     throw new Error('PDF шаблон не загружен');
//   }

//   const templateDoc = await PDFDocument.load(course.templatePdf);
//   const pdfDoc = await PDFDocument.create();
//   pdfDoc.registerFontkit(fontkit);

//   const [templatePage] = await pdfDoc.copyPages(templateDoc, [0]);
//   const page = pdfDoc.addPage(templatePage);

//   const fontBytes = await fetch('/fonts/DelaGothicOne-Regular.ttf').then((r) =>
//     r.arrayBuffer(),
//   );
//   const font = await pdfDoc.embedFont(fontBytes);

//   const { height } = page.getSize();

//   await drawStudentPage(page, font, student, course, date, height);

//   return await pdfDoc.save();
// }

// export async function generateGroupPDF(
//   students: Student[],
//   course: Course,
//   date: string,
// ): Promise<Uint8Array> {
//   if (!course.templatePdf) {
//     throw new Error('PDF шаблон не загружен');
//   }

//   const pdfDoc = await PDFDocument.create();
//   pdfDoc.registerFontkit(fontkit);

//   const templateDoc = await PDFDocument.load(course.templatePdf);
//   const fontBytes = await fetch('/fonts/DelaGothicOne-Regular.ttf').then((r) =>
//     r.arrayBuffer(),
//   );
//   const font = await pdfDoc.embedFont(fontBytes);

//   for (const student of students) {
//     const [templatePageCopy] = await pdfDoc.copyPages(templateDoc, [0]);
//     const page = pdfDoc.addPage(templatePageCopy);
//     const { height } = page.getSize();

//     await drawStudentPage(page, font, student, course, date, height);
//   }

//   return await pdfDoc.save();
// }

import { PDFDocument, rgb, PDFPage, PDFFont } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { Student, Course } from '../types';

const TEXT_BLUE = rgb(0x31 / 255, 0x52 / 255, 0x9a / 255);
const GREEN = rgb(0x89 / 255, 0xc7 / 255, 0x23 / 255);
const WHITE = rgb(1, 1, 1);

const START_X = 310;
const START_Y_OFFSET = 355;
const ROW_GAP = 36;

const BOX_SIZE = 22;
const BOX_HEIGHT = 10;
const BOX_GAP = 4;

const SKILL_FONT_SIZE = 18;

// Правая граница шкалы (ВСЕ шкалы заканчиваются тут)
const BOXES_END_X = 760;

async function drawStudentPage(
  page: PDFPage,
  font: PDFFont,
  student: Student,
  course: Course,
  date: string,
  pageHeight: number,
) {
  // ===== Имя студента =====
  page.drawText(student.fullName ?? '', {
    x: 320,
    y: pageHeight - 265,
    size: 27,
    font,
    color: TEXT_BLUE,
  });

  const skills = course.skills ?? [];
  const startY = pageHeight - START_Y_OFFSET;

  const totalBoxesWidth = 10 * BOX_SIZE + 9 * BOX_GAP;
  const boxesStartX = BOXES_END_X - totalBoxesWidth;

  skills.forEach((skillName, index) => {
    const score = student.skills?.[skillName] ?? 5;
    const y = startY - index * ROW_GAP;

    // ===== Название навыка =====
    page.drawText(skillName, {
      x: START_X,
      y,
      size: SKILL_FONT_SIZE,
      font,
      color: TEXT_BLUE,
    });

    const boxY = y - BOX_HEIGHT / 2 + 4;

    // ===== Шкала из 10 квадратиков =====
    for (let i = 0; i < 10; i++) {
      const isFilled = i < score;

      page.drawRectangle({
        x: boxesStartX + i * (BOX_SIZE + BOX_GAP),
        y: boxY,
        width: BOX_SIZE,
        height: BOX_HEIGHT,
        color: isFilled ? GREEN : WHITE,
        borderColor: GREEN,
        borderWidth: isFilled ? 0 : 1,
      });
    }
  });

  // ===== Дата =====
  page.drawText(date, {
    x: 705,
    y: pageHeight - 50,
    size: 11,
    font,
    color: TEXT_BLUE,
  });
}

export async function generateCertificatePDF(
  student: Student,
  course: Course,
  date: string,
): Promise<Uint8Array> {
  if (!course.templatePdf) {
    throw new Error('PDF шаблон не загружен');
  }

  const templateDoc = await PDFDocument.load(course.templatePdf);
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const [templatePage] = await pdfDoc.copyPages(templateDoc, [0]);
  const page = pdfDoc.addPage(templatePage);

  const fontBytes = await fetch('/fonts/DelaGothicOne-Regular.ttf').then(r =>
    r.arrayBuffer(),
  );
  const font = await pdfDoc.embedFont(fontBytes);

  const { height } = page.getSize();

  await drawStudentPage(page, font, student, course, date, height);

  return await pdfDoc.save();
}

export async function generateGroupPDF(
  students: Student[],
  course: Course,
  date: string,
): Promise<Uint8Array> {
  if (!course.templatePdf) {
    throw new Error('PDF шаблон не загружен');
  }

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const templateDoc = await PDFDocument.load(course.templatePdf);

  const fontBytes = await fetch('/fonts/DelaGothicOne-Regular.ttf').then(r =>
    r.arrayBuffer(),
  );
  const font = await pdfDoc.embedFont(fontBytes);

  for (const student of students) {
    const [templatePageCopy] = await pdfDoc.copyPages(templateDoc, [0]);
    const page = pdfDoc.addPage(templatePageCopy);

    const { height } = page.getSize();

    await drawStudentPage(page, font, student, course, date, height);
  }

  return await pdfDoc.save();
}
