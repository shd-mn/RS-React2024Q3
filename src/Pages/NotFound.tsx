import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div
      style={{
        color: 'white',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h3>404 Page Not Found</h3>
      <Link to="/">Back to Home </Link>
    </div>
  );
}

export default NotFound;
