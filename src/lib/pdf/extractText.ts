import { getDocument } from 'pdfjs-dist';

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const pdf = await getDocument({ data: buffer }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item: any) => item.str).join(' ');
  }
  return text;
}
