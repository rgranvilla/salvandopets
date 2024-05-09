import { beforeEach, describe, expect, it } from 'vitest';

import { CryptoHelper, ICryptoHelper } from './cryptoHelper';

let cryptoHelper: ICryptoHelper;

describe('encryptData', () => {
  beforeEach(() => {
    cryptoHelper = new CryptoHelper();
  });

  it('should encrypt the data', async () => {
    const data = { name: 'John Doe', age: 30 };
    const encryptedData = await cryptoHelper.encryptData(data);

    expect(encryptedData).toBeDefined();
    expect(encryptedData).not.toEqual(data);
    expect(encryptedData).not.toEqual(JSON.stringify(data));
  });

  it('should decrypt the data', async () => {
    const data = { name: 'John Doe', age: 18 };
    const encryptedData = await cryptoHelper.encryptData(data);

    const decryptedData = await cryptoHelper.decryptData(encryptedData);

    expect(decryptedData).toBeDefined();
    expect(decryptedData).toEqual(data);
    expect(decryptedData).not.toEqual(encryptedData);
  });
});
