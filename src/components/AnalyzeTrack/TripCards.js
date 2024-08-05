import React from 'react';
import 'leaflet/dist/leaflet.css';
import { Button, Row, Col, Card, Dropdown } from 'react-bootstrap';


const TripCards = () => {


    return (
        <>
        <Col>
        <Card>
            <Card.Body>
                <Card.Title>Trip 1</Card.Title>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Card.Text>
                    Total km = 14
                    Total time = 40mins
                </Card.Text>
            </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card>
            <Card.Body>
                <Card.Title>Trip 2</Card.Title>
                <Dropdown>
                    <Dropdown.Toggle variant="warning" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Card.Text>
                    Total km = 14
                    Total time = 40mins
                </Card.Text>
            </Card.Body>
        </Card>
        </Col>
        </>
    );
}

export default TripCards;