import fs from 'node:fs/promises';
import path from 'node:path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const DOCS_DIR = path.resolve(process.cwd(), 'public/docs');

const documentsToCreate = [
  {
    filename: 'reglamento-institucional.pdf',
    title: 'REGLAMENTO INSTITUCIONAL Y DE ALUMNOS',
    subtitle: 'Universidad de Antequera · Oaxaca de Juárez, Oaxaca',
    updated: 'Edición Vigente: Noviembre 2026',
    sections: [
      {
        heading: 'CAPÍTULO I. DISPOSICIONES GENERALES',
        body: 'El presente reglamento establece las normas que rigen la vida académica, administrativa y de convivencia de la comunidad estudiantil de la Universidad de Antequera. Su cumplimiento garantiza un entorno de respeto, excelencia académica e integridad.',
      },
      {
        heading: 'CAPÍTULO II. DERECHOS Y OBLIGACIONES DE LOS ESTUDIANTES',
        body: 'Los estudiantes tienen derecho a recibir formación académica de calidad, tutoría personalizada, acceso a la biblioteca, instalaciones y participación en eventos académicos. Son obligaciones asistir puntualmente a clases (mínimo 80% de asistencia), respetar a la comunidad universitaria y cumplir con el código de ética.',
      },
      {
        heading: 'CAPÍTULO III. EVALUACIÓN Y ACREDITACIÓN',
        body: 'La escala de calificaciones es numérica de 0 a 10, siendo 6.0 la calificación mínima aprobatoria. Cada semestre contempla evaluaciones parciales, proyectos integradores y evaluación final conforme al calendario escolar vigente.',
      },
      {
        heading: 'CAPÍTULO IV. TITULACIÓN Y BECAS',
        body: 'La institución ofrece modalidades de titulación por excelencia académica, proyecto integrador, tesis profesional o memoria de experiencia práctica. Las becas institucionales se otorgan con base en desempeño académico y estudio socioeconómico.',
      },
    ],
  },
  {
    filename: 'calendario-escolar-2026-2027.pdf',
    title: 'CALENDARIO ESCOLAR OFICIAL 2026–2027',
    subtitle: 'Universidad de Antequera · Ciclo Fundacional',
    updated: 'Aprobado por el Consejo Académico · Noviembre 2026',
    sections: [
      {
        heading: 'PROCESO DE ADMISIÓN Y REGISTRO',
        body: '• Registro de aspirantes: 20 de noviembre de 2026 al 15 de junio de 2027.\n• Evaluación diagnóstica y entrevista vocacional: 26 y 27 de junio de 2027.\n• Publicación de resultados oficiales: 5 de julio de 2027.\n• Inscripciones formales en Servicios Escolares: 12 al 23 de julio de 2027.',
      },
      {
        heading: 'SEMESTRE OTOÑO 2027 (AGOSTO – DICIEMBRE)',
        body: '• Semana de inducción y bienvenida: 16 al 20 de agosto de 2027.\n• Primer periodo de evaluaciones parciales: 27 de septiembre al 1 de octubre de 2027.\n• Segundo periodo de evaluaciones parciales: 8 al 12 de noviembre de 2027.\n• Evaluaciones finales y cierre de actas: 6 al 14 de diciembre de 2027.',
      },
      {
        heading: 'DÍAS INHÁBILES OFICIALES',
        body: '• 16 de septiembre (Independencia de México)\n• 2 de noviembre (Día de Muertos)\n• 16 de noviembre (Conmemoración de la Revolución Mexicana)\n• Receso invernal: 18 de diciembre de 2027 al 6 de enero de 2028.',
      },
    ],
  },
  {
    filename: 'plan-de-estudios-lige.pdf',
    title: 'PLAN DE ESTUDIOS OFICIAL',
    subtitle: 'Licenciatura en Innovación y Gestión Empresarial (LIGE)',
    updated: 'Duración: 8 Semestres · Modalidad Escolarizada Presencial',
    sections: [
      {
        heading: 'OBJETIVO DEL PROGRAMA EDUCATIVO',
        body: 'Formar profesionistas capaces de dirigir, innovar y transformar organizaciones públicas, privadas y sociales mediante liderazgo ético, análisis financiero, transformación digital y enfoque en el desarrollo sostenible de Oaxaca y México.',
      },
      {
        heading: 'PRIMER A CUARTO SEMESTRE (FORMACIÓN FUNDAMENTAL)',
        body: 'Semestre 1: Fundamentos de Administración, Matemáticas Aplicadas, Contabilidad Básica, Comunicación Académica, Entorno Socioeconómico.\nSemestre 2: Microeconomía, Estadística, Costos y Presupuestos, Derecho Mercantil, Design Thinking.\nSemestre 3: Macroeconomía, Mercadotecnia Estratégica, Talento Humano, Sistemas de Información, Ética.\nSemestre 4: Finanzas Corporativas I, Operaciones, Comportamiento Organizacional, Analítica de Datos, Régimen Fiscal.',
      },
      {
        heading: 'QUINTO A OCTAVO SEMESTRE (ESPECIALIZACIÓN Y DIRECCIÓN)',
        body: 'Semestre 5: Planeación Estratégica, Ecosistemas Digitales, Finanzas II, Gestión de Calidad, Inglés de Negocios I.\nSemestre 6: Evaluación de Proyectos, Economía Circular, Negociación, IA Aplicada a la Gestión, Inglés II.\nSemestre 7: Consultoría Empresarial, Comercio Exterior, Gobierno Corporativo, Seminario de Investigación I, Optativa I.\nSemestre 8: Simulador de Alta Dirección, Incubación de Empresas, Seminario de Titulación, Práctica Profesional, Optativa II.',
      },
    ],
  },
  {
    filename: 'convocatoria-admision-2026.pdf',
    title: 'CONVOCATORIA DE ADMISIÓN 2026–2027',
    subtitle: 'Licenciatura en Innovación y Gestión Empresarial · Generación Fundacional',
    updated: 'Oaxaca de Juárez, Oaxaca · Registro Abierto',
    sections: [
      {
        heading: '1. BASES DE PARTICIPACIÓN',
        body: 'Podrán participar las y los egresados de bachillerato o estudiantes que cursen el último semestre de educación media superior, con interés en formarse como líderes empresariales e innovadores.',
      },
      {
        heading: '2. DOCUMENTACIÓN REQUERIDA',
        body: '• Acta de nacimiento actualizada (original y 2 copias).\n• Certificado de bachillerato legalizado o constancia vigente.\n• CURP en formato actualizado.\n• Identificación oficial vigente (INE o pasaporte).\n• Comprobante de domicilio reciente y 4 fotografías tamaño infantil.',
      },
      {
        heading: '3. PROCEDIMIENTO DE INSCRIPCIÓN',
        body: 'Paso 1: Solicita tu registro en el portal web o vía WhatsApp.\nPaso 2: Entrega tu expediente documental en Admisiones.\nPaso 3: Asiste a tu entrevista vocacional y evaluación diagnóstica.\nPaso 4: Recibe tu carta de aceptación y concluye tu inscripción formal.',
      },
      {
        heading: '4. INFORMES Y ATENCIÓN A ASPIRANTES',
        body: 'Calz. Porfirio Díaz 418, Col. Reforma, Oaxaca de Juárez, Oax.\nTeléfono: +52 (951) 501 2480 | Correo: admisiones@universidadantequera.edu.mx\nHorario: Lunes a Viernes de 08:30 a 18:00 h y Sábados de 09:00 a 13:00 h.',
      },
    ],
  },
];

function wrapText(text, maxChars) {
  const lines = [];
  for (const paragraph of text.split('\n')) {
    const words = paragraph.split(' ');
    let current = '';
    for (const word of words) {
      if ((current + ' ' + word).trim().length > maxChars) {
        if (current) lines.push(current.trim());
        current = word;
      } else {
        current = (current + ' ' + word).trim();
      }
    }
    if (current) lines.push(current.trim());
  }
  return lines;
}

async function generateAll() {
  await fs.mkdir(DOCS_DIR, { recursive: true });

  for (const docSpec of documentsToCreate) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]); // US Letter
    const { width, height } = page.getSize();

    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const navy = rgb(12 / 255, 30 / 255, 53 / 255);
    const gold = rgb(198 / 255, 157 / 255, 72 / 255);
    const slate = rgb(72 / 255, 92 / 255, 114 / 255);
    const ivory = rgb(250 / 255, 248 / 255, 244 / 255);

    // Header band
    page.drawRectangle({
      x: 0,
      y: height - 135,
      width,
      height: 135,
      color: navy,
    });

    // Gold accent line
    page.drawRectangle({
      x: 0,
      y: height - 139,
      width,
      height: 4,
      color: gold,
    });

    // Header text
    page.drawText('UNIVERSIDAD DE ANTEQUERA · OAXACA', {
      x: 48,
      y: height - 44,
      size: 9,
      font: fontBold,
      color: gold,
    });

    page.drawText(docSpec.title, {
      x: 48,
      y: height - 76,
      size: 17,
      font: fontBold,
      color: rgb(1, 1, 1),
    });

    page.drawText(docSpec.subtitle, {
      x: 48,
      y: height - 100,
      size: 10.5,
      font: fontRegular,
      color: rgb(0.86, 0.89, 0.94),
    });

    page.drawText(docSpec.updated, {
      x: 48,
      y: height - 120,
      size: 9,
      font: fontRegular,
      color: gold,
    });

    // Subtle body card background
    page.drawRectangle({
      x: 36,
      y: 66,
      width: width - 72,
      height: height - 228,
      color: ivory,
      borderColor: rgb(0.89, 0.86, 0.8),
      borderWidth: 1,
    });

    let y = height - 190;
    for (const sec of docSpec.sections) {
      page.drawText(sec.heading, {
        x: 54,
        y,
        size: 11,
        font: fontBold,
        color: navy,
      });
      y -= 18;

      const lines = wrapText(sec.body, 82);
      for (const line of lines) {
        page.drawText(line, {
          x: 54,
          y,
          size: 9.8,
          font: fontRegular,
          color: slate,
        });
        y -= 14.5;
      }
      y -= 14;
    }

    // Footer
    page.drawLine({
      start: { x: 48, y: 46 },
      end: { x: width - 48, y: 46 },
      thickness: 0.75,
      color: gold,
    });
    page.drawText(
      'Documento institucional oficial · Universidad de Antequera · Oaxaca de Juárez, Oaxaca · www.universidadantequera.edu.mx',
      {
        x: 48,
        y: 30,
        size: 8,
        font: fontRegular,
        color: slate,
      }
    );

    const bytes = await pdfDoc.save();
    await fs.writeFile(path.join(DOCS_DIR, docSpec.filename), bytes);
    console.log(`Generated ${docSpec.filename}`);
  }
}

generateAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
