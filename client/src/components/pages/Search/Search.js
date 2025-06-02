import styles from '../Home/Home.module.scss';
import React, { useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { API_URL } from '../../../config';
import AdSummary from "../../common/AdSummary/AdSummary";
import { Alert, Spinner } from 'react-bootstrap';

const Search = () => {

  const { phrase } = useParams()
  const inputRef = useRef();
  
  // LOCAL STATE
  const [Phrase, setPhrase] = useState(phrase); 
  const [status, setStatus] = useState('noData'); // 'loading','noData', 'success', 'error'
  const [ads, setAds] = useState([]);

  useEffect(() => {
    inputRef.current.focus();
    search();
  }, []);

  useEffect(() => {
    if (ads.length === 0) setStatus('noData');
  }, [ads]);

  const search = async () => {
    try {
      const res = await fetch(`${API_URL}/api/ads/search/${Phrase}`, { credentials: 'include' });
      if (res.status === 200) {
        const data = await res.json(); 
        setAds(data); 
        setStatus('success');
      } else {
        setStatus('noData');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    search();
  };

  return (
    <>
      <Form className='d-flex justify-content-center' onSubmit={handleSubmit}>
        <InputGroup style={{ width: '40%', minWidth: '250px' }}>
          <Form.Control
            type="text"
            placeholder="What do you need?"
            value={Phrase}
            ref={inputRef}
            onChange={(e) => {
              setPhrase(e.target.value);
            }}
          />
          <Button variant="outline-secondary" type="submit">
            <BsSearch />
          </Button>
        </InputGroup>
      </Form>
      <div className={styles.adsContainer}>

      { status === 'loading' && <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden" >Loading...</span>
      </Spinner>}

      { status === 'error' && <Alert variant="danger">
        <Alert.Heading>Something went wrong</Alert.Heading>
        <p>Unexpected error... Try again</p>
      </Alert>}

      { status === 'noData' && <Alert variant="info">
        <Alert.Heading>Unfortunately</Alert.Heading>
        <p>We have nothing like that :(</p>
      </Alert>}

      {status === 'success' && ads.map((ad) => <div key={ad.id} className={styles.ad}><AdSummary {...ad} /></div>)}
      </div>
    </>
  );
};

export default Search;