import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MapContainer, TileLayer, Polyline, Circle } from 'react-leaflet';
import SetMapCenter from '../utils/SetMapCenter';
import 'leaflet/dist/leaflet.css';

const ViewMap = ({ positions, hoveredPosition }) => {
    const fillBlueOptions = { fillColor: 'red', color : 'red' }
    const [circleCenter, setCircleCenter] = useState([]);
    const [mapCenter, setMapCenter] = useState([]);

    useEffect(() => {
        if (hoveredPosition && hoveredPosition.length > 0) {
            setCircleCenter(hoveredPosition);
            setMapCenter(hoveredPosition)
        } else {
            setCircleCenter([]);
            if (positions && positions.length > 0){
                setMapCenter([positions[0][0], positions[0][1]])
            } else {
                setMapCenter([50.85045, 4.34878])
            }
        }
    }, [hoveredPosition]);
    

    return (
        <MapContainer
            center={mapCenter && mapCenter.length > 0 ? mapCenter : [50.797, 4.405]}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
        >
            {circleCenter.length > 0 ? <Circle center={circleCenter} pathOptions={fillBlueOptions} radius={70} /> : <></>}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {positions.length > 0 && (
                <>
                    <Polyline
                        pathOptions={{ color: 'blue' }}
                        positions={positions}
                    />
                    <SetMapCenter positions={positions} hoveredPosition={hoveredPosition} />
                </>
            )}
        </MapContainer>
    );
};

export default ViewMap;