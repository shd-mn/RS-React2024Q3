import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Details from './components/Details';
import ErrorLayout from './components/ErrorBoundary/ErrorLayout';

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
  return <RouterProvider router={router} />;
}

export default App;
