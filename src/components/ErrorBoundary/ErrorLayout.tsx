import { Outlet } from 'react-router-dom';
import ErrorBoundary from '.';

function ErrorLayout() {
  return (
    <ErrorBoundary fallback="Error Layout. Something went wrong! ">
      <Outlet />
    </ErrorBoundary>
  );
}

export default ErrorLayout;
