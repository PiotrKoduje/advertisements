import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 4000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="text-center mt-5">
      <h1 className="display-4 text-danger fw-bold">404</h1>
      <p className="lead">The page you're looking for doesn't exist.</p>
      <Button variant="primary" onClick={() => navigate('/')}>Go Home</Button>
    </div>
  );
};

export default NotFound;
