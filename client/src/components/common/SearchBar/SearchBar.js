import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { Form, Button, InputGroup } from 'react-bootstrap';

const SearchBar = () => {
 
  const [phrase, setPhrase] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phrase.trim()) {
      navigate(`/ads/search/${phrase}`);
    }
  };

  return (
    <Form className='d-flex justify-content-center' onSubmit={ handleSubmit }>
      <InputGroup style={{ width: '40%', minWidth: '250px' }}>
        <Form.Control
          type="text"
          placeholder="What do you need?"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
        />
        <Button variant="outline-secondary" type="submit">
          <BsSearch />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;

