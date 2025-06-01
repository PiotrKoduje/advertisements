import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAdRequest, clearRequest, getRequests } from '../../../redux/adsRedux';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { useEffect } from 'react';

const AdDelete = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const requests = useSelector(getRequests);

  useEffect(() => {
    if (requests['DELETE_AD'] && requests['DELETE_AD'].success) {
      navigate('/ads/confirmation/delete');
      dispatch(clearRequest({ name: 'DELETE_AD'}));
    }
    return 
  }, [requests, navigate, dispatch]);
  
  const handleDelete = () => {
    dispatch(deleteAdRequest(id));
  };

  const handleCancel = () => {
    navigate(`/ads/${id}`); 
  };

  return (
    <div className="text-center mt-5">

  { (requests['DELETE_AD'] && requests['DELETE_AD'].pending) &&
      <Spinner animation="border" role="status" className="d-block mx-auto">
      <span className="visually-hidden" >Loading...</span>
    </Spinner> }

    { (requests['DELETE_AD'] && requests['DELETE_AD'].error) &&
      <Alert variant="danger">
      <Alert.Heading>{requests['DELETE_AD'].error}</Alert.Heading>
      <p>Something's wrong...</p>
    </Alert> }

      <h2>Are you sure you want to delete this ad?</h2>
      <div className="mt-4">
        <Button variant='danger' onClick={handleDelete} className="me-2">Yes, delete</Button>
        <Button className='btn-warning' onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default AdDelete;
