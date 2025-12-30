import { plainAddPlaceholder, SignPdf } from 'node-signpdf';
import fs from 'fs';

export function signPDF(pdfBuffer: Buffer, p12Buffer: Buffer, passphrase: string) {
  const pdfWithPlaceholder = plainAddPlaceholder({ pdfBuffer, reason: 'Document signed' });
  const signer = new SignPdf();
  return signer.sign(pdfWithPlaceholder, p12Buffer, { passphrase });
}
