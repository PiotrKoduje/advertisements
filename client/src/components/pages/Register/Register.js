import styles from '../AdAdd/AdAdd.module.scss';
import { useState, useRef, useEffect } from "react";
import { Form, Button, Alert, Spinner} from "react-bootstrap";
import { API_URL } from "../../../config";
import { useNavigate } from "react-router-dom";

const Register = () => {

  // LOCAL STATE
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(''); // null, 'loading', 'success', 'loginError', 'serverError', 'clientError'

  const loginInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    loginInputRef.current.focus();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('login', login);
    fd.append('pass', password);
    fd.append('phone', phone);
    fd.append('avatar', avatar);
    
    const options = {
      method: 'POST',
      body: fd
    };

    setStatus('loading');
    fetch(`${API_URL}/auth/register`, options)
    .then( res => {
      if (res.status === 201) {
        setStatus('success');
        navigate('/ads/confirmation/newUser');
      } else if (res.status === 400) {
        setStatus('clientError');
      } else if (res.status === 409) {
        setStatus('loginError');
        setLogin('');
        loginInputRef.current.focus();
      } else {
        setStatus('serverError');
        setLogin('');
        setPassword('');
        setPhone('');
        setAvatar(null);
        loginInputRef.current.focus();
      }
    })
    .catch(err => {
      setStatus('serverError');
    })
  };

  return(
    <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit} encType="multipart/form-data">
      <h1 className="my-4">Sign up</h1>

      { status === 'success' && <Alert variant="success">
        <Alert.Heading>Success!</Alert.Heading>
        <p>You have been successfully registered!. You can now sign in</p>
      </Alert>}

      { status === 'serverError' && <Alert variant="danger">
        <Alert.Heading>Something went wrong</Alert.Heading>
        <p>Unexpected error... Try again</p>
      </Alert>}

      { status === 'clientError' && <Alert variant="danger">
        <Alert.Heading>No enough data</Alert.Heading>
        <p>You have to fill all the fields!</p>
      </Alert>}

      { status === 'loginError' && <Alert variant="warning">
        <Alert.Heading>Login already in use</Alert.Heading>
        <p>You have to choose other login</p>
      </Alert>}

      { status === 'loading' && <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden" >Loading...</span>
      </Spinner>}

      <Form.Group className="mb-3" controlId="formLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control 
          type="text" 
          value={login} 
          onChange={e => setLogin(e.target.value)} 
          placeholder="Enter login" 
          ref={loginInputRef}
          autoComplete="off" 
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Phone number</Form.Label>
        <Form.Control 
          type="tel"
          value={phone} 
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone number" 
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Avatar <span className={styles.sizeInfo}>(Max size: 512KB)</span></Form.Label>
        <Form.Control
         type="file" 
         onChange={e => setAvatar(e.target.files[0])}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Signing in...' : 'Sign in'}
      </Button>
    </Form>
  )
};
export default Register;