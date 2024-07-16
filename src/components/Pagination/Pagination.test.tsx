import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from './';
import { describe, expect, test } from 'vitest';

describe('Pagination Component', () => {
  function setup(totalItems: number, initialPage = '1') {
    window.history.pushState({}, 'Test page', `?page=${initialPage}`);
    return render(
      <MemoryRouter>
        <Pagination totalItems={totalItems} />
      </MemoryRouter>,
    );
  }

  // test('test_pagination_renders_correct_buttons', () => {
  //   setup(50); // Assuming 50 items with 10 items per page

  //   expect(screen.getByText('prev')).toBeInTheDocument();
  //   expect(screen.getByText('next')).toBeInTheDocument();
  //   expect(screen.getByText('1')).toBeInTheDocument();
  //   expect(screen.getByText('2')).toBeInTheDocument();
  //   expect(screen.getByText('3')).toBeInTheDocument();
  //   expect(screen.getByText('4')).toBeInTheDocument();
  //   expect(screen.getByText('5')).toBeInTheDocument();
  // });

  test('test_url_search_params_update_on_page_click', () => {
    setup(50, '1');

    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);

    const searchParams = new URLSearchParams(window.location.search);
    expect(searchParams.get('page') ?? '1').toBe('2');
  });
});
