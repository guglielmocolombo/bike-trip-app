import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import ViewMap from './ViewMap'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);


const SpeedDistanceGraph = ({ data }) => {
    const distances = data.map(point => point.distance);
    const speeds = data.map(point => point.speed);
    const positions = data.map(point => [point.latitude, point.longitude])
    const [circleCenter, setCircleCenter] = useState([])

    const chartData = {
        labels: distances,
        datasets: [
            {
                label: 'Speed (km/h)',
                data: speeds,
                fill: true, // Enable fill for the area under the line
                backgroundColor: 'rgba(75,192,192,0.2)', // Color for the filled area
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                pointRadius: 3
            },
        ],
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Distance (km)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Speed (km/h)'
                }
            }
        },
        onHover: (event, chartElement) => {
            if (chartElement.length > 0) {
                setCircleCenter(positions[chartElement[0].index])
            } else {
                console.log("Nothing to declare")
            }
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <ViewMap positions={positions} hoveredPosition={circleCenter}></ViewMap>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Speed vs Distance</Card.Title>
                            <Line data={chartData} options={options} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SpeedDistanceGraph;

