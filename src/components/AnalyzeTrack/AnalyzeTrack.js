import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Circle, useMapEvents } from 'react-leaflet';
import SetMapCenter from '../../utils/SetMapCenter';
import 'leaflet/dist/leaflet.css';
import { Button, Row, Col, Tabs, Container } from 'react-bootstrap';
import AnimateTracks from './AnimateTrack/AnimateTrack';
import TripCards from './TripCards';
import SpeedDistanceGraph from './GraphTrack/SpeedDistanceGraph';

const LiveTrack = ({ positions }) => {
    const fillRedOptions = { fillColor: 'red', color: 'red' };
    const [circleCenter, setCircleCenter] = useState([]);
    const [zoomLevel, setZoomLevel] = useState(13);
    const [activeTab, setActiveTab] = useState("graph")

    const CircleWithDynamicRadius = ({ center, fillOptions, zoomLevel }) => {
        const [radius, setRadius] = useState(70);

        useEffect(() => {
            const newRadius = 70 / Math.pow(2, zoomLevel - 13); // Adjust the formula as needed
            setRadius(newRadius);
        }, [zoomLevel]);

        return center.length > 0 ? <Circle center={center} pathOptions={fillOptions} radius={radius} /> : null;
    };

    const DynamicZoomHandler = () => {
        useMapEvents({
            zoomend: (e) => {
                setZoomLevel(e.target.getZoom());
            }
        });
        return null;
    };

    return (
        <>
            <Row style={{ height: '600px', width: '100%', marginBottom: '10px' }}>
                <MapContainer
                    center={circleCenter.length > 0 ? circleCenter : [50.797, 4.405]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                >
                    <DynamicZoomHandler />
                    <CircleWithDynamicRadius center={circleCenter} fillOptions={fillRedOptions} zoomLevel={zoomLevel} />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {positions && positions.length > 0 && (
                        <>
                            <Polyline
                                pathOptions={{ color: 'blue' }}
                                positions={positions.map(pos => [pos.latitude, pos.longitude])}
                            />
                            <SetMapCenter positions={positions.map(pos => [pos.latitude, pos.longitude])} hoveredPosition={circleCenter} />
                        </>
                    )}
                </MapContainer>
            </Row>
            { /* 
            <Row>
                <Tabs id="justify-tab-example" className="mb-3" 
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                justify>
                    <Tab eventKey="graph" title="Graph"></Tab>
                    <Tab eventKey="animation" title="Animation"></Tab>
                </Tabs>
            </Row>
            <Row style={{ marginLeft: '20px', marginBottom: '10px' }} lg={"auto"}>
                <TripCards></TripCards>
            </Row>
            */}
            <Row>
            <Container style={{ height: '400px', width: '100%', marginBottom: '10px' }}>
                {activeTab === "animation" ? 
                <AnimateTracks positions={positions} setCircleCenter={setCircleCenter}></AnimateTracks> 
                :
                <SpeedDistanceGraph data={positions} setCircleCenter={setCircleCenter}></SpeedDistanceGraph>}
            </Container>
            </Row>
        </>
    );
};

export default LiveTrack;