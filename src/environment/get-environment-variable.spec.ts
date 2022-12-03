import { getEnvironmentVariable } from './get-environment-variable.js';

describe('getEnvironmentVariable', () => {

    it('must get an existing variable', () => {
        expect.assertions(1);
        process.env.TEST_ENV_DEVELOPMENT = 'development';
        const result = getEnvironmentVariable('TEST_ENV_DEVELOPMENT');
        expect(result).toBe('development');
    });

    it('must correctly return transformed environment variables (boolean)', () => {
        expect.assertions(1);
        process.env.TEST_ENV_VAR_BOOLEAN = false as any;
        const result = getEnvironmentVariable('TEST_ENV_VAR_BOOLEAN');
        expect(result).toBe('false');
    });

    it('must correctly return transformed environment variables (number)', () => {
        expect.assertions(1);
        process.env.TEST_ENV_VAR_NUMBER = 5 as any;
        const result = getEnvironmentVariable('TEST_ENV_VAR_NUMBER');
        expect(result).toBe('5');
    });

    it('must throw an error when a variable was not found', () => {
        expect.assertions(1);
        expect(() => getEnvironmentVariable('TEST_ENV_UNSET')).toThrow('Environment variable \'TEST_ENV_UNSET\' is not set!');
    });

    it('must give the default when the variable is not set', () => {
        expect.assertions(1);
        const result = getEnvironmentVariable('TEST_ENV_DEFAULT', 'filled');
        expect(result).toBe('filled');
    });

    it('must not error with a falsy variable', () => {
        expect.assertions(1);
        process.env.TEST_ENV_FALSY = '';
        const result = getEnvironmentVariable('TEST_ENV_FALSY');
        expect(result).toBe('');
    });

    it('must be able to return a falsy default', () => {
        expect.assertions(1);
        const result = getEnvironmentVariable('TEST_ENV_FALSY_DEFAULT', '');
        expect(result).toBe('');
    });

});
