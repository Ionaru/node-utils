interface IGetEnvironmentVariable {
    (key: string, defaultValue: string): string;
    (key: string, defaultValue?: string): string;
}

export const getEnvironmentVariable: IGetEnvironmentVariable = (key: string, defaultValue?: string): string => {
    const value = process.env[key] ?? defaultValue;

    if (value === undefined) {
        throw new Error(`Environment variable '${key}' is not set!`);
    }

    return value;
};
