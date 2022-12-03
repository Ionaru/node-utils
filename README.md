# @ionaru/node-utils

[![npm version](https://img.shields.io/npm/v/@ionaru/node-utils.svg?style=for-the-badge)](https://www.npmjs.com/package/@ionaru/node-utils)
[![npm version](https://img.shields.io/npm/v/@ionaru/node-utils/next.svg?style=for-the-badge)](https://www.npmjs.com/package/@ionaru/node-utils/v/next)
[![Build Status](https://img.shields.io/github/workflow/status/Ionaru/node-utils/Test%20&%20Deploy/main?style=for-the-badge)](https://github.com/Ionaru/node-utils/actions)
[![codecov](https://img.shields.io/codecov/c/github/Ionaru/node-utils/main.svg?style=for-the-badge)](https://codecov.io/gh/Ionaru/node-utils)

## Description
This package contains common Node.js utilities I use in my projects.

## Usage
```
npm install @ionaru/node-utils
```

### `getEnvironmentVariable(key: string, defaultValue?: string): string`
Returns the value of the environment variable `key` or `defaultValue` if the environment variable is not set.
If `defaultValue` is undefined, the function will throw an error if the environment variable is not set.

```ts
import { getEnvironmentVariable } from '@ionaru/node-utils';

// Returns the contents of process.env.MY_ENV_VAR
const envVar = getEnvironmentVariable('MY_ENV_VAR');

// Errors with "Environment variable 'MISSING_ENV_VAR' is not set!".
const envVarError = getEnvironmentVariable('MISSING_ENV_VAR');

// Returns 'default_value'.
const envVarWithDefault = getEnvironmentVariable('MISSING_ENV_VAR', 'default_value');
```

### `hashPassword(password: string): Promise<{hash: string; salt: string}>`
Hashes a password using the internal Node.js `scrypt` and `randomUUID` functions.
`randomUUID` is used to generate a salt for the password, that is then hashed using `scrypt` and outputted as base64 string.

```ts
import { hashPassword } from '@ionaru/node-utils';

const password = 'my_password';
const hashedPassword = await hashPassword(password);
// hashedPassword = {
//     hash: "BASE64_STRING_HASH",
//     salt: "UUID_SALT",
// };
```

### `checkPassword(password: string, { hash, salt }: IPasswordData): Promise<boolean>`
Checks if a password matches a hash and salt.
The `IPasswordData` interface matches the output of `hashPassword`.

```ts
import { checkPassword } from '@ionaru/node-utils';

const password = 'my_password';
const hashedPassword = await hashPassword(password);
const passwordMatches = await checkPassword(password, hashedPassword);
// passwordMatches = true;
```
