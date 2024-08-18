import { createBrowserRouter } from 'react-router-dom';
import { links } from '../constants';
import Home from '../pages/Home';
import UncontrolledForm from '../pages/UncontrolledForm';
import ReactHookForm from '../pages/ReactHookForm';
import NotFound from '../pages/NotFound';
import Layout from '../components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: links.home,
        element: <Home />,
      },
      {
        path: links.uncontrolledForm,
        element: <UncontrolledForm />,
      },
      {
        path: links.reactHookForm,
        element: <ReactHookForm />,
      },
      {
        path: links.notFound,
        element: <NotFound />,
      },
    ],
  },
]);
