// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('axios', () => {
    const mockAxios = {
        create: jest.fn(() => mockAxios),
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn()
    };

    return mockAxios;
});
