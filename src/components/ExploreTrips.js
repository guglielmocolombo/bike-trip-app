import React, { useEffect, useState } from 'react';
import MyCarousel from './MyCarousel'
import { Container, Row, Col } from 'react-bootstrap';
import TripsCards from './TripsCards';
import axios from 'axios';

const ExploreTrips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:5002/documents');
        console.log(response)
        setTrips(response.data)
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);


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
    <TripsCards cardsData={trips}></TripsCards>
    </Container>
    </Row>
  </Container>
  );
};

export default ExploreTrips;
