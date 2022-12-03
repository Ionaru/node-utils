// eslint-disable-next-line @typescript-eslint/no-shadow
import { describe, it, expect } from 'vitest';

import * as index from './index.js';

describe('export tests', () => {

    it('must export everything', () => {
        expect.assertions(4);

        expect(Object.entries(index)).toHaveLength(3);
        expect(typeof index.getEnvironmentVariable).toBe('function');
        expect(typeof index.checkPassword).toBe('function');
        expect(typeof index.hashPassword).toBe('function');
    });
});
