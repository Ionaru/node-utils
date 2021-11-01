export function getEnvironmentVariable(key: string, defaultValue: string): string;
export function getEnvironmentVariable(key: string, defaultValue?: string): string;
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function getEnvironmentVariable(key: string, defaultValue?: string): string {
    const value = process.env[key] ?? defaultValue;

    if (value === undefined) {
        throw new Error(`Environment variable '${key}' is not set!`);
    }

    return value;
}
