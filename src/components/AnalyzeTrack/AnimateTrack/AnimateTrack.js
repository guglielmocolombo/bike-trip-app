import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Tabs, Tab } from 'react-bootstrap';


const AnimateTracks = ({ positions, setCircleCenter }) => {
    const [intervalDuration, setIntervalDuration] = useState(500); // Default to 1 second

    var index = 0;

    const startAnimation = () => {
        console.log("Start Circle Animation")
        const intervalID = setInterval(animateCircle, intervalDuration);
    }

    const stopAnimation = () => {
        console.log("Stop Circle Animation")
    }

    function animateCircle() {
        if (index < positions.length) {
            setCircleCenter([positions[index].latitude, positions[index].longitude]);
            index++
        } else {
            clearInterval();
        }
    }

    return (
        <>
            <Row style={{ marginLeft: '30px', marginBottom: '10px' }} lg={"auto"}>
                <Button variant="success" onClick={startAnimation}>Start Animation</Button>
            </Row>
            <Row style={{ marginLeft: '30px' }} lg={"auto"}>
                <Button variant="danger" onClick={stopAnimation}>Stop Animation</Button>
            </Row>
        </>
    );
};

export default AnimateTracks;