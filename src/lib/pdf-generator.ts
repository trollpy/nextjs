import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PDFOptions {
  filename: string;
  title?: string;
  watermark?: {
    text?: string;
    image?: string;
    opacity?: number;
  };
}

export async function generatePDF(
  element: HTMLElement,
  options: PDFOptions
): Promise<void> {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add title if provided
    if (options.title) {
      pdf.setFontSize(16);
      pdf.text(options.title, 105, 15, { align: 'center' });
      position = 20; // Start content below title
      heightLeft = imgHeight - 20;
    }

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Add watermark if provided
    if (options.watermark) {
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        
        if (options.watermark.text) {
          pdf.setFontSize(60);
          pdf.setTextColor(200, 200, 200);
          pdf.setGState(new pdf.GState({ opacity: options.watermark.opacity || 0.1 }));
          pdf.text(options.watermark.text, 105, 150, {
            align: 'center',
            angle: 45,
          });
        }
        
        if (options.watermark.image) {
          // For image watermarks, you would need to add the image to each page
          // This requires additional logic to handle image loading
          console.warn('Image watermarks are not yet implemented');
        }
      }
    }

    pdf.save(`${options.filename}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}

export function formatPDFDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatPDFDateTime(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function createPDFTable(
  pdf: jsPDF,
  data: any[][],
  startY: number,
  options?: {
    margin?: number;
    fontSize?: number;
    rowHeight?: number;
    headerBackground?: string;
  }
): number {
  const margin = options?.margin || 10;
  const fontSize = options?.fontSize || 10;
  const rowHeight = options?.rowHeight || 7;
  const headerBackground = options?.headerBackground || '#f0f0f0';

  const pageWidth = pdf.internal.pageSize.getWidth();
  const tableWidth = pageWidth - 2 * margin;
  const colCount = data[0].length;
  const colWidth = tableWidth / colCount;

  let currentY = startY;

  // Draw header
  pdf.setFillColor(headerBackground);
  pdf.rect(margin, currentY, tableWidth, rowHeight, 'F');
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(fontSize);
  pdf.setFont(undefined, 'bold');

  data[0].forEach((cell, colIndex) => {
    pdf.text(
      String(cell),
      margin + colIndex * colWidth + 2,
      currentY + rowHeight / 2 + 1
    );
  });

  currentY += rowHeight;

  // Draw rows
  pdf.setFont(undefined, 'normal');
  for (let i = 1; i < data.length; i++) {
    if (currentY > pdf.internal.pageSize.getHeight() - 20) {
      pdf.addPage();
      currentY = margin;
    }

    data[i].forEach((cell, colIndex) => {
      pdf.text(
        String(cell),
        margin + colIndex * colWidth + 2,
        currentY + rowHeight / 2 + 1
      );
    });

    currentY += rowHeight;
  }

  return currentY;
}