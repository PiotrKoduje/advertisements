import { Card, Button, Row, Col, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import { useSelector } from "react-redux";
import { getLoggedUser } from "../../../redux/users.Redux";
import { useState, useEffect } from "react";


const AdDetails = ({ id, title, content, date, photo, price, location, userId: { login, avatar, phone } }) => {
  
  const loggedUser = useSelector(getLoggedUser);
  const [isAuthor, setIsAuthor] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUser) {
      setIsAuthor(loggedUser.login === login);
    } else {
      setIsAuthor(false);
    }
  }, [loggedUser, login]);

  return (
    <Card className="my-4 shadow-sm" style={{ maxWidth: '900px', margin: 'auto' }}>
    
    <Card.Img
      variant="top"
      src={`${API_URL}/uploads/photos/${photo}`}
      alt={title}
      style={{ maxHeight: '400px', objectFit: 'contain', backgroundColor: '#f8f9fa' }}
    />

    <Card.Body>
      <Card.Title className="text-center mb-3" style={{ fontWeight: '700', fontSize: '2rem', color: '#212529' }}>
        {title}
      </Card.Title>

      <Row className="mb-3 align-items-center">
        <Col xs="auto">
          <Image
            src={`${API_URL}/uploads/avatars/${avatar}`}
            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
            className="rounded-2 border"
            alt={login}
          />
        </Col>
        <Col>
          <div className="text-dark fw-bold">{login}</div>
          <div className="text-dark" style={{ fontSize: '0.9rem' }}>{phone}</div>
          <div className="text-dark" style={{ fontSize: '0.9rem' }}>
            <strong>Location:</strong> {location}
          </div>
        </Col>
        {isAuthor && (
          <Col xs="auto" className="text-end">
            <Link to={`/ads/${id}/edit`} className="btn btn-outline-primary me-2">
              Edit
            </Link>
            <Link to={`/ads/${id}/delete`} className="btn btn-outline-danger">
              Delete
            </Link>
          </Col>
        )}
      </Row>

      <Card.Text className="mb-3 text-dark" style={{ whiteSpace: 'pre-line' }}>
        {content}
      </Card.Text>

      <Row className="mb-3 align-items-center">
        <Col className="text-dark">
          <strong className="fs-5">Price:</strong>{' '}
          <span className="fs-5 fw-bold">{price} PLN</span>
        </Col>
        <Col className="text-end">
          <small className="text-muted">Posted: {new Date(date).toLocaleDateString()}</small>
        </Col>
      </Row>

      <div className="d-flex justify-content-center">
        <Button variant="secondary" onClick={() => navigate('/')}>
          Back 
        </Button>
      </div>
    </Card.Body>
  </Card>
);
}

export default AdDetails;