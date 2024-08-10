import { screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Theme from '.';
import { customRender } from '../../../__test__/test-utils';

vi.mock('/icons/moon-solid.svg', () => ({ default: 'moon-solid.svg' }));
vi.mock('/icons/sun-solid.svg', () => ({ default: 'sun-solid.svg' }));

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides the default theme value from localStorage', () => {
    customRender(<Theme />);

    const button = screen.getByTestId('theme-btn');
    expect(button.querySelector('img')?.src).toContain('sun-solid.svg');
  });

  it('toggles the theme value', async () => {
    const { user } = customRender(<Theme />);

    const button = screen.getByTestId('theme-btn');
    await user.click(button);

    expect(button.querySelector('img')?.src).toContain('moon-solid.svg');

    await user.click(button);
    expect(button.querySelector('img')?.src).toContain('sun-solid.svg');
  });

  it('saves the updated theme value to localStorage', async () => {
    const { user } = customRender(<Theme />);

    const button = screen.getByTestId('theme-btn');
    await user.click(button);

    expect(localStorage.getItem('theme')).toBe(JSON.stringify('light'));

    await user.click(button);
    expect(localStorage.getItem('theme')).toBe(JSON.stringify('dark'));
  });
});
