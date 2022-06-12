import '@testing-library/jest-dom';
import * as vue from 'vue';
import server from './mockServer/server';

// jest.spyOn(console, 'log').mockReturnValue();
// jest.spyOn(console, 'info').mockReturnValue();
// jest.spyOn(console, 'warn').mockReturnValue();
// jest.spyOn(console, 'error').mockReturnValue();

Object.keys(vue).forEach(key => {
  Object.defineProperty(window, key, { writable: true, value: vue[key as keyof typeof vue] });
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
