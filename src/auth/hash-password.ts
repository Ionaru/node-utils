import { randomUUID, scrypt } from 'crypto';
import { promisify } from 'util';

interface IPasswordData {
    salt: string;
    hash: string;
}

const encrypt = async (password: string, salt: string): Promise<string> => {
    const hash = await promisify(scrypt)(password, salt, 64) as Buffer;
    return hash.toString('base64');
};

export const hashPassword = async (password: string): Promise<IPasswordData> => {
    const salt = randomUUID({ disableEntropyCache: true });
    const hash = await encrypt(password, salt);
    return { hash, salt };
};

export const checkPassword = async (password: string, { salt, hash }: IPasswordData) => {
    const hashToCheck = await encrypt(password, salt);
    return hash === hashToCheck;
};
