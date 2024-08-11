import { cleanup, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Layout from './';
import { customRender } from '../../__test__/test-utils';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));
describe('Layout Component', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('renders the Header component', () => {
    customRender(
      <Layout>
        <div>Test Child</div>
      </Layout>,
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders children passed to the Layout component', () => {
    customRender(
      <Layout>
        <div>Test Child</div>
      </Layout>,
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
