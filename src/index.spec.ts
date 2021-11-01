import * as index from './index';

describe('export tests', () => {

    it('must export everything', () => {
        expect.assertions(2);

        expect(Object.entries(index)).toHaveLength(1);
        expect(typeof index.getEnvironmentVariable).toBe('function');
    });
});
