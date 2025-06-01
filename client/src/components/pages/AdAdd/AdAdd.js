
import styles from './AdAdd.module.scss';
import { useState, useRef, useEffect } from "react";
import { Form, Button, Alert, Spinner} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { adAddRequest, clearRequest, getRequests } from '../../../redux/adsRedux';

const AdAdd = () => {

  // LOCAL STATE
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState('');
  
  const titleInputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const requests = useSelector(getRequests);

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (requests['ADD_AD'] && requests['ADD_AD'].success) {
      navigate('/ads/confirmation/add');
      dispatch(clearRequest({ name: 'ADD_AD'}));
    }
  }, [requests, navigate, dispatch]);

  const handleSubmit = e => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    fd.append('price', price);
    fd.append('location', location);
    fd.append('photo', photo);

    dispatch(adAddRequest(fd));
  };

  const handleCancel = () => {
    navigate(`/`);
  };

  return(
    <Form className="col-12 col-sm-6 mx-auto" onSubmit={handleSubmit} encType="multipart/form-data">
    <h1 className="my-4">Ad adding</h1>

    { (requests['ADD_AD'] && requests['ADD_AD'].pending) &&
      <Spinner animation="border" role="status" className="d-block mx-auto">
      <span className="visually-hidden" >Loading...</span>
    </Spinner> }

    { (requests['ADD_AD'] && requests['ADD_AD'].error) &&
      <Alert variant="danger">
      <Alert.Heading>{requests['ADD_AD'].error}</Alert.Heading>
      <p>Something's wrong...</p>
    </Alert> }

    <Form.Group className="mb-3" controlId="formTitle">
      <Form.Label>Title</Form.Label>
      <Form.Control 
        type="text" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        placeholder="Enter title" 
        ref={titleInputRef}
        autoComplete="off" 
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formContent">
      <Form.Label>Content</Form.Label>
      <Form.Control 
        as="textarea" 
        rows={5} 
        value={content} 
        onChange={e => setContent(e.target.value)} 
        placeholder="Enter content" 
        autoComplete="off"
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formPrice">
      <Form.Label>Price</Form.Label>
      <Form.Control 
        type="number" 
        value={price} 
        onChange={e => setPrice(e.target.value)} 
        placeholder="Enter price" 
        autoComplete="off" 
        min='0'
        step='1'
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formLocation">
      <Form.Label>Location</Form.Label>
      <Form.Control 
        type="text" 
        value={location} 
        onChange={e => setLocation(e.target.value)} 
        placeholder="Enter Location" 
        autoComplete="off" 
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formPhoto">
      <Form.Label>Photo <span className={styles.sizeInfo}>(Max size: 2MB)</span></Form.Label>
      <Form.Control
        type="file" 
        onChange={e => setPhoto(e.target.files[0])}
      />
    </Form.Group>

    <Button variant="primary" className="me-3" type="submit" disabled={(requests['ADD_AD'] && requests['ADD_AD'].pending)}>
    {(requests['ADD_AD'] && requests['ADD_AD'].pending) ? 'Adding' : 'Add'}
    </Button>
    <Button variant="info" className="btn-warning" type="button" onClick={handleCancel}>Cancel</Button>
    </Form>
  )
};

export default AdAdd;