import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Circle, useMapEvents } from 'react-leaflet';
import SetMapCenter from '../../utils/SetMapCenter';
import 'leaflet/dist/leaflet.css';
import { Row, Col } from 'react-bootstrap';
import AnimateTracks from './AnimateTrack/AnimateTrack';
import SpeedDistanceGraph from './GraphTrack/SpeedDistanceGraph';

const DoubleTrack = ({ trips }) => {
    const trip1 = trips[0].points
    const trip2 = trips[1].points

    const fillRedOptions = { fillColor: 'red', color: 'red' };
    const fillGreenOptions = { fillColor: 'green', color: 'green' };
    const [circleCenter1, setCircleCenter1] = useState([]);
    const [circleCenter2, setCircleCenter2] = useState([]);
    const [zoomLevel, setZoomLevel] = useState(13);

    const CircleWithDynamicRadius = ({ center1, center2, fillOptions1, fillOptions2, zoomLevel }) => {
        const [radius, setRadius] = useState(70);

        useEffect(() => {
            const newRadius = 70 / Math.pow(2, zoomLevel - 13); // Adjust the formula as needed
            setRadius(newRadius);
        }, [zoomLevel]);

        return center1.length>0 && center2.length>0 &&
         <>
            <Circle center={center1} pathOptions={fillOptions1} radius={radius} />
            <Circle center={center2} pathOptions={fillOptions2} radius={radius} />
         </>;
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
                    center={circleCenter1.length > 0 ? circleCenter1 : [50.797, 4.405]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                >
                    <DynamicZoomHandler />
                    <CircleWithDynamicRadius center1={circleCenter1} center2={circleCenter2} fillOptions1={fillRedOptions} fillOptions2={fillGreenOptions} zoomLevel={zoomLevel} />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <>
                        <Polyline
                            pathOptions={{ color: 'blue' }}
                            positions={trip1.map(pos => [pos.latitude, pos.longitude])}
                        />
                        <Polyline
                            pathOptions={{ color: 'green' }}
                            positions={trip2.map(pos => [pos.latitude, pos.longitude])}
                        />
                       <SetMapCenter positions={trip1.map(pos => [pos.latitude, pos.longitude])} hoveredPosition={circleCenter1} />
                    </>
                </MapContainer>
            </Row>
            <Row style={{ marginLeft: "10px" }}>
                <Col style={{ height: '400px', width: '60%' }}>
                    <AnimateTracks trip1={trip1} trip2={trip2} setCircleCenter1={setCircleCenter1} setCircleCenter2={setCircleCenter2}></AnimateTracks>
                </Col>
            </Row>
        </>
    );
};

export default DoubleTrack;