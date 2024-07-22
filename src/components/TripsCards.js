import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TripsCards = ({ cardsData }) => {
  return (
    <div>
      {cardsData.map((card, index) => (
        <Link 
          key={index}
          to={`/explore-trips/${card._id}`}
          state={{ description: card.description, kilometers: card.kilometers, difficulty: card.difficulty, gpxName: Object.keys(card._attachments)[0] }}>
          <Card key={index} className="mb-3">
            <Card.Body>
              <Card.Title>{card.description}</Card.Title>
              <Card.Text>{card.kilometers}</Card.Text>
              <Card.Text>{card.difficulty}</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default TripsCards;