import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './NavigationButtons.css'; // Import the CSS file
import { Container } from 'react-bootstrap';

const NavigationButtons = () => {
  return (
    <Container>
    <div className="navigation-buttons-container">
      <h1 className="page-title">Gravel in Belgium</h1>
      <Link to={"/my-past-trips"}><Button variant="primary" size="lg" className="fancy-button">My Past Trips</Button></Link>
      <Link to={"/explore-trips"}><Button variant="primary" size="lg" className="fancy-button">Explore Trips</Button></Link>
      <Link to={"/create-trips"}><Button variant="primary" size="lg" className="fancy-button">Create Trips</Button></Link>
    </div>
    </Container>
  );
};

export default NavigationButtons;

