import { useState, useRef, useEffect } from "react";
import { Form, Button, Alert, Spinner} from "react-bootstrap";
import { API_URL } from "../../../config";
import { useDispatch } from 'react-redux';
import { logIn } from "../../../redux/users.Redux";
import { useNavigate } from "react-router-dom";

const Login = () => {

// LOCAL STATE
const [login, setLogin] = useState('');
const [password, setPassword] = useState('');
const [status, setStatus] = useState(''); // null, 'loading', 'success', 'serverError', 'clientError'

const loginInputRef = useRef();
const dispatch = useDispatch();
const navigate = useNavigate();

useEffect(() => {
  loginInputRef.current.focus();
}, []);

const handleSubmit = e => {
  e.preventDefault();

  const options = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ login, pass: password })
  }

  setStatus('loading');
  fetch(`${API_URL}/auth/login`, options)
  .then(res => {
    if (res.status === 200) {
      setStatus('success');
      dispatch(logIn({login}));
      navigate('/');
    } else if (res.status === 400) {
      setStatus('clientError')
    } else {
      setStatus('serverError');
    }
  })
  .catch(err => {
    setStatus('serverError');
  })
};

  return(
    <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit} encType="multipart/form-data">
      <h1 className="my-4">Sign in</h1>

      { status === 'success' && <Alert variant="success">
        <Alert.Heading>Success!</Alert.Heading>
        <p>You have been successfully signed in!</p>
      </Alert>}

      { status === 'serverError' && <Alert variant="danger">
        <Alert.Heading>Something went wrong</Alert.Heading>
        <p>Unexpected error... Try again</p>
      </Alert>}

      { status === 'clientError' && <Alert variant="danger">
        <Alert.Heading>Incorrect data</Alert.Heading>
        <p>Login or password are incorrect</p>
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
          autoComplete="off" 
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Logging in...' : 'Log in'}
      </Button>
    </Form>
  )
};
export default Login;