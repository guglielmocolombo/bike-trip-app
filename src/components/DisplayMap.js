import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { gpxToGeoJSON } from '../utils/gpxToGeoJSON';
import axios from 'axios';

const DisplayMap = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {

    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:5002/gpx', {
          responseType: 'text',
        });
        const data = response.data;
        const geoJSONData = gpxToGeoJSON(data);

        console.log(geoJSONData)
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
          <h3>Trip Name</h3>
          <h3>Total Kilometers</h3>
          <h3>Total Duration</h3>
          <h3>Difficulty</h3>
        </Col>
        <Col>
          <MapContainer 
            center={[50.797, 4.405]} 
            zoom={13} 
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {positions.length > 0 && (
              <Polyline
                pathOptions={{ fillColor: 'red', color: 'blue' }}
                positions={positions}
              />
            )}
          </MapContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default DisplayMap;
