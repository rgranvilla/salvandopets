import CryptoJS from 'crypto-js';

import { env } from '@/config/env';

export abstract class ICryptoHelper {
  abstract encryptData(data: unknown): Promise<string>;
  abstract decryptData(encryptedData: string): Promise<unknown>;
}

export class CryptoHelper implements ICryptoHelper {
  private secretKey: string;

  constructor() {
    this.secretKey = env.CRYPTO_SECRET;
  }

  async encryptData(data: unknown): Promise<string> {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      this.secretKey,
    ).toString();
    return encryptedData;
  }

  async decryptData(encryptedData: string): Promise<unknown> {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    const decryptedData = await JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
}
