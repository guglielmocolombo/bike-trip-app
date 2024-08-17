import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Container, Row } from 'react-bootstrap';
import TripCards from './AnalyzeTrack/TripCards';

const NavigationButtons = ({chosenTracks, setChosenTracks, availableTracks}) => {
    
    return (
        <Container>
            <div className="navigation-buttons-container">
                <h1 className="page-title">My Office Commute</h1>
                <Row style={{marginTop: "10px"}}>
                    <TripCards chosenTracks={chosenTracks} setChosenTracks={setChosenTracks} availableTracks={availableTracks}></TripCards>
                </Row>
                <Row style={{marginTop: "10px"}}>
                    <Link to={"/single-track"}><Button variant="primary" size="lg" className="fancy-button">Single Track</Button></Link>
                </Row>
                <Row style={{marginTop: "10px"}}>
                    <Link to={"/double-track"}><Button variant="primary" size="lg" className="fancy-button">Double Track</Button></Link>
                </Row>
            </div>
        </Container>
    );
};

export default NavigationButtons;