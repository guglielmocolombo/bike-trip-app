import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { gpxToGeoJSON } from '../utils/gpxToGeoJSON';
import SetMapCenter from '../utils/SetMapCenter';
import axios from 'axios';

const ExploreTripsMap = () => {
  const { filter } = useParams();
  const location = useLocation();
  const { description, kilometers, difficulty, gpxName } = location.state || {};
  const [positions, setPositions] = useState([]);

  useEffect(() => {

    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/${filter}/${gpxName}`, {
          responseType: 'text',
        });
        const data = response.data;
        const geoJSONData = gpxToGeoJSON(data);

        const trackPoints = geoJSONData.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        setPositions(trackPoints);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <Container style={{ width: '80%', height: '50vh', backgroundColor: 'lightgreen' }}>
      <Row>
        <Col>
          <h3>{description}</h3>
          <h3>{kilometers}</h3>
          <h3>Total Duration</h3>
          <h3>{difficulty}</h3>
        </Col>
        <Col>
          <MapContainer 
            center={positions.length > 0 ? [positions[0][0], positions[0][1]] : [50, 3]} 
            zoom={12} 
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {positions.length > 0 && (
              <>
              <Polyline
                pathOptions={{ fillColor: 'red', color: 'blue' }}
                positions={positions}
              />
              <SetMapCenter positions={positions} />
              </>
            )}
          </MapContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default ExploreTripsMap;
