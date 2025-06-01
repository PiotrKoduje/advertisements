import styles from './AdEdit.module.scss';
import { useState, useRef, useEffect } from "react";
import { Form, Button, Alert, Spinner} from "react-bootstrap";
import { useNavigate, useParams} from "react-router-dom";
import { useSelector } from 'react-redux';
import { editAdRequest, clearRequest, getRequests } from '../../../redux/adsRedux';
import { useDispatch } from 'react-redux';
import { getAd } from '../../../redux/adsRedux';

const AdEdit = () => {

  const { id } = useParams();
  const titleInputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const requests = useSelector(getRequests);
  const ad = useSelector(state => getAd(state, id));

  // LOCAL STATE
  const [title, setTitle] = useState(ad?.title || '');
  const [content, setContent] = useState(ad?.content || '');
  const [price, setPrice] = useState(ad?.price || '');
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(ad?.location || '');

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (requests['EDIT_AD'] && requests['EDIT_AD'].success) {
      navigate('/ads/confirmation/edit');
      dispatch(clearRequest({ name: 'EDIT_AD'}));
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

    dispatch(editAdRequest(fd, id));
  };

  const handleCancel = () => {
    navigate(`/ads/${id}`);
  };

  //requests['EDIT_AD'].pending = true;

  return(
    <Form className="col-12 col-sm-6 mx-auto" onSubmit={handleSubmit} encType="multipart/form-data">
    <h1 className="my-4">Ad edit</h1>

    { (requests['EDIT_AD'] && requests['EDIT_AD'].pending) &&
      <Spinner animation="border" role="status" className="d-block mx-auto">
      <span className="visually-hidden" >Loading...</span>
    </Spinner>}

    { (requests['EDIT_AD'] && requests['EDIT_AD'].error) &&
      <Alert variant="danger">
      <Alert.Heading>{requests['EDIT_AD'].error}</Alert.Heading>
      <p>Something's wrong...</p>
    </Alert>}

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

    <Button variant="primary" className="me-3" type="submit" disabled={(requests['EDIT_AD'] && requests['EDIT_AD'].pending)}>
      {(requests['EDIT_AD'] && requests['EDIT_AD'].pending) ? 'Changing' : 'Change'}
    </Button>
    <Button variant="info" className="btn-warning" type="button" onClick={handleCancel}>Cancel</Button>

    </Form>
  )
};

export default AdEdit;