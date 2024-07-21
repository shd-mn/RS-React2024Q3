import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Details from './components/Details';
import ErrorLayout from './components/ErrorBoundary/ErrorLayout';
import ThemeProvider from './context/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const router = createBrowserRouter([
  {
    element: <ErrorLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [{ path: '/', element: <Details /> }],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
