import React from 'react';
import { Card } from 'react-bootstrap';

const TripsCards = ({cardsData}) => {

    console.log(cardsData)

    return (
        <div>
        {cardsData.map((card, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>{card.name}</Card.Title>
                <Card.Text>{card.difficulty}</Card.Text>
                <Card.Text>Some other information</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
    )
}

export default TripsCards;