import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

export class EncryptionUtility {
  static privateKeyHex = '174fdf86318c531063ac25bb51347993';
  static privateKey = Buffer.from(this.privateKeyHex, 'hex');

  static encrypt(inputString: string): string {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-128-ecb', EncryptionUtility.privateKey, null);
    cipher.setAutoPadding(true);
    const encrypted = Buffer.concat([cipher.update(inputString), cipher.final()]);
    const result = Buffer.concat([iv, encrypted]);
    return encodeURIComponent(result.toString('base64'));
  }

  static decrypt(inputString: string): string {
    const buffer = Buffer.from(decodeURIComponent(inputString), 'base64');
    const iv = buffer.slice(0, 16);
    const encryptedText = buffer.slice(16);
    const decipher = createDecipheriv('aes-128-ecb', EncryptionUtility.privateKey, null);
    decipher.setAutoPadding(true);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return (decrypted.toString());
  }
}