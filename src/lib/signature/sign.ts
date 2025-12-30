import { plainAddPlaceholder, sign } from 'node-signpdf';
import fs from 'fs';

export function signPDF(pdfBuffer: Buffer, p12Buffer: Buffer, passphrase: string) {
  const pdfWithPlaceholder = plainAddPlaceholder({ pdfBuffer });
  return sign(pdfWithPlaceholder, p12Buffer, { passphrase });
}
