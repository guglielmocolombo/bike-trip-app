import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import ViewMap from '../../ViewMap'
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


const SpeedDistanceGraph = ({ data, setCircleCenter }) => {
    const distances = data.map(point => point.distance);
    const speeds = data.map(point => point.speed);
    const positions = data.map(point => [point.latitude, point.longitude])
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
            }
        }
    };

    return (
        <Card style={{ height: '100%' }}>
            <Card.Body style={{ height: '100%' }}>
                <Line data={chartData} options={options} />
            </Card.Body>
        </Card>
    );
};

export default SpeedDistanceGraph;

