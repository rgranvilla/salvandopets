import { FastifyInstance } from 'fastify';

import { CryptoHelper } from './cryptoHelper';

export class JwtDecoder {
  private app: FastifyInstance;
  private decryptData: CryptoHelper;

  constructor(app: FastifyInstance) {
    this.app = app;
    this.decryptData = new CryptoHelper();
  }

  async decode<T>(jwtToken: string): Promise<T | null> {
    try {
      const decodedJwtToken = this.app.jwt.decode(jwtToken)?.valueOf() as {
        sign: { sub: string };
      };

      if (decodedJwtToken === null) throw new Error('Failed to decode JWT');

      const decryptedData = (await this.decryptData.decryptData(
        decodedJwtToken.sign.sub,
      )) as T;

      return decryptedData;
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      return null;
    }
  }
}
