import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import ThemeProvider from '../context/ThemeProvider';
import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';

interface CustomRenderOptions {
  route?: string;
  path?: string;
  children?: RouteObject[];
}

export const customRender = (ui: ReactNode, options: CustomRenderOptions = {}) => {
  const { route = '/', path = '/', children = [] } = options;
  window.history.pushState({}, 'Test page', route);

  const routes = [
    {
      path,
      element: ui,
      children: children,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: [route],
    initialIndex: 0,
  });

  return {
    user: userEvent.setup(),
    ...render(
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>,
    ),
  };
};
