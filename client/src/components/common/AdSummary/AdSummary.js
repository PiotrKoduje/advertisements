import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AdSummary({ id, title,content, photo, location }) {
  return (
    <Card className="h-100 d-flex flex-column shadow-sm" style={{ height: '400px' }}>
      
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50%', overflow: 'hidden' }}>
        <img
          src={`http://localhost:8000/uploads/photos/${photo}`}
          alt={title}
          className="img-fluid"
          style={{ maxHeight: '100%', objectFit: 'contain' }}
        />
      </div>

      <Card.Body className="d-flex flex-column justify-content-between p-3">
        <div className="text-center">
          <Card.Title className="text-dark fs-5">{title}</Card.Title>
          <Card.Text className="text-muted small mb-1">{location}</Card.Text>
          <Card.Text className="text-secondary small">{content}</Card.Text>
        </div>

        <div className="mt-auto text-center">
          <Link to={`/ads/${id}`}>
            <Button variant="primary" size="sm">See more</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default AdSummary;

