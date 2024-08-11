import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import ThemeProvider from '../src/context/ThemeProvider';
import Home from '../src/Pages/Home';
import NotFound from '../src/Pages/NotFound';
import Details from '../src/components/Details';
import ErrorLayout from '../src/components/ErrorBoundary/ErrorLayout';

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
