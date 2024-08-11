import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { server } from './app/__test__/mocks/server';

beforeAll(() => server.listen());

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => server.close());
