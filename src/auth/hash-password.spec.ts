// eslint-disable-next-line @typescript-eslint/no-shadow
import { describe, it, expect } from 'vitest';

import { checkPassword, hashPassword } from './hash-password.js';

describe('hashPassword', () => {

    it('must return the hashed password and used salt as strings', async () => {
        expect.assertions(2);
        const result = await hashPassword('test');
        expect(typeof result.hash).toBe('string');
        expect(typeof result.salt).toBe('string');
    });

    it('must return a base64 hash', async () => {
        expect.assertions(1);
        const result = await hashPassword('test');
        expect(result.hash).toMatch(/^[a-zA-Z0-9+/]+={0,2}$/);
    });

    it('must return a uuid salt', async () => {
        expect.assertions(1);
        const result = await hashPassword('test');
        expect(result.salt).toMatch(/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/);
    });

    it('must return a different hash for the same password', async () => {
        expect.assertions(1);
        const result1 = await hashPassword('test');
        const result2 = await hashPassword('test');
        expect(result1.hash).not.toBe(result2.hash);
    });

    it('must return a different salt for the same password', async () => {
        expect.assertions(1);
        const result1 = await hashPassword('test');
        const result2 = await hashPassword('test');
        expect(result1.salt).not.toBe(result2.salt);
    });
});

describe('checkPassword', () => {

    it('must return true if the password is correct', async () => {
        expect.assertions(1);
        const result = await hashPassword('test');
        const check = await checkPassword('test', result);
        expect(check).toBe(true);
    });

    it('must return false if the password is incorrect', async () => {
        expect.assertions(1);
        const result = await hashPassword('test');
        const check = await checkPassword('test2', result);
        expect(check).toBe(false);
    });

    it('must return false if the salt is incorrect', async () => {
        expect.assertions(1);
        const result = await hashPassword('test');
        const check = await checkPassword('test', { ...result, salt: 'wrong' });
        expect(check).toBe(false);
    });

    it('must return false if the hash is incorrect', async () => {
        expect.assertions(1);
        const result = await hashPassword('test');
        const check = await checkPassword('test', { ...result, hash: 'wrong' });
        expect(check).toBe(false);
    });

    it('can handle a falsy password', async () => {
        expect.assertions(1);
        const result = await hashPassword('test');
        const check = await checkPassword('', result);
        expect(check).toBe(false);
    });

    it('can handle a falsy hash', async () => {
        expect.assertions(1);
        const result = await hashPassword('test');
        const check = await checkPassword('test', { ...result, hash: '' });
        expect(check).toBe(false);
    });

    it('can handle a falsy salt', async () => {
        expect.assertions(1);
        const result = await hashPassword('test');
        const check = await checkPassword('test', { ...result, salt: '' });
        expect(check).toBe(false);
    });

    it('can handle a falsy password, hash and salt', async () => {
        expect.assertions(1);
        const result = await hashPassword('test');
        const check = await checkPassword('', { ...result, hash: '', salt: '' });
        expect(check).toBe(false);
    });

    it('can handle a very long password', async () => {
        expect.assertions(1);
        const result = await hashPassword('test'.repeat(1000));
        const check = await checkPassword('test'.repeat(1000), result);
        expect(check).toBe(true);
    });

    it('a long password will not match a shorter password', async () => {
        expect.assertions(1);
        const result = await hashPassword('test'.repeat(1000));
        const check = await checkPassword('test'.repeat(999), result);
        expect(check).toBe(false);
    });

    it('a password will not match a longer password', async () => {
        expect.assertions(1);
        const result = await hashPassword('test'.repeat(999));
        const check = await checkPassword('test'.repeat(1000), result);
        expect(check).toBe(false);
    });
});
