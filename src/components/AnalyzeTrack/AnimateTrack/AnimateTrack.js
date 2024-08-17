import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Tabs, Tab } from 'react-bootstrap';


const AnimateTracks = ({ trip1, trip2, setCircleCenter1, setCircleCenter2 }) => {
    const [intervalDuration, setIntervalDuration] = useState(500);

    var index1 = 0;
    var index2 = 0;

    const startAnimation = () => {
        console.log("Start Circle Animation")
        const intervalID = setInterval(animateCircle, intervalDuration);
    }

    const stopAnimation = () => {
        console.log("Stop Circle Animation")
        clearInterval();
    }

    function animateCircle() {
        if (index1 < trip1.length) {
            setCircleCenter1([trip1[index1].latitude, trip1[index1].longitude]);
            index1++
        } else {
            index1 = -1
        }

        if (index2 < trip2.length) {
            setCircleCenter2([trip2[index2].latitude, trip2[index2].longitude]);
            index2++
        } else {
            index2 = -1
        }

        if (index1==1 && index2==-1)
            clearInterval()
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