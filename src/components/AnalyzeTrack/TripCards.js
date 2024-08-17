import React from 'react';
import 'leaflet/dist/leaflet.css';
import { Button, Row, Col, Card, Dropdown } from 'react-bootstrap';


const TripCards = ({chosenTracks, setChosenTracks, availableTracks}) => {

    const addTrack = (points, index) => {

        if(index==1)
            setChosenTracks([points])
        else if (chosenTracks.length>0)
            setChosenTracks([chosenTracks[0], points])
        
    }

    return (
        <Row>
            <Col>
                <Card style={{width: "auto"}}>
                    <Card.Body>
                        <Card.Title>Track 1</Card.Title>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {chosenTracks.length > 0 ? chosenTracks[0].name : "Choose the trip"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {availableTracks.map( (track, index)=> <Dropdown.Item key={index} onClick={() => addTrack(track, 1)}>{track.name}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Card.Text>

                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Track 2</Card.Title>
                        <Dropdown>
                            <Dropdown.Toggle variant="warning" id="dropdown-basic">
                            {chosenTracks.length > 1 ? chosenTracks[1].name : "Choose the trip"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {availableTracks.map( (track, index)=> <Dropdown.Item key={index} onClick={() => addTrack(track, 2)}>{track.name}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Card.Text>
                            
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default TripCards;