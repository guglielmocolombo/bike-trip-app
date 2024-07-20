import React from 'react';
import DisplayMap from './DisplayMap'
import MyCarousel from './MyCarousel'
import { Container, Row, Col, Card } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

const ExploreTrips = () => {

  const cardsData = [
    { title: 'Card 1', text: 'This is the first card.' },
    { title: 'Card 2', text: 'This is the second card.' },
    { title: 'Card 3', text: 'This is the third card.' },
    // Add more cards as needed
  ];


  return (
    <Container>
    <h1 className='page-title'>Explore Trips</h1>
    <Row>
      <Col>
        <h3>Most Liked Trips</h3>
        <MyCarousel />
      </Col>
    </Row>
    <Row>
    <Container style={{width: '50%', paddingLeft: 0}}>
    <h3>List of Trips</h3>
      {cardsData.map((card, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.text}</Card.Text>
            <Card.Text>Some other information</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
    </Row>
  </Container>
  );
};

export default ExploreTrips;
