import React, { useState, useRef, useEffect } from 'react';
import { Container, Button, Alert, Row, Col } from 'react-bootstrap';

const GeolocationRecorder = () => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);
  const intervalRef = useRef(null);

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const timestamp = new Date(position.timestamp).toISOString();

        let newDistance = 0;
        if (locations.length > 0) {
          const lastLocation = locations[locations.length - 1];
          newDistance = calculateDistance(lastLocation.latitude,lastLocation.longitude,latitude,longitude);
        }

        const speed = calculateSpeed(newDistance, 1.5)

        const updatedTotalDistance = totalDistance + newDistance;
        setTotalDistance(updatedTotalDistance);
        
        setLocations((prevLocations) => [
          ...prevLocations,
          { latitude, longitude, speed, timestamp, distance: totalDistance + newDistance }
        ]);
        setError(null);
      }, (error) => {
        setError("Error obtaining location: " + error.message);
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const calculateSpeed = (distance, time) => {
    const speedKmh = (distance / time) * 3.6
    
    return speedKmh;
};

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371000; // Radius of the Earth in meters
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance; // Distance in meters
};


  const startRecording = () => {
    setIsRecording(true);
    intervalRef.current = setInterval(getCurrentPosition, 1500); // Start the interval and store its ID in intervalRef
  };

  const stopRecording = () => {
    setIsRecording(false);
    clearInterval(intervalRef.current); // Clear the interval using the stored ID
  };

  const downloadGPX = () => {
    if (locations.length > 0) {
      const gpxContent = `
        <?xml version="1.0"?>
        <gpx version="1.1" creator="GeolocationRecorderApp" xmlns="http://www.topografix.com/GPX/1/1">
          ${locations.map(location => `
            <wpt lat="${location.latitude}" lon="${location.longitude}">
              <time>${location.timestamp}</time>
              <extensions>
                <speed>${location.speed}</speed>
                <distance>${location.distance}</distance>
              </extensions>
            </wpt>
          `).join('')}
        </gpx>
      `;
      const blob = new Blob([gpxContent], { type: 'application/gpx+xml' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'locations.gpx';
      link.click();
      URL.revokeObjectURL(link.href);
    } else {
      setError("No location data to download.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col>
          <h1>Geolocation Recorder</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={startRecording} disabled={isRecording}>Start Recording</Button>
          {' '}
          <Button variant="danger" onClick={stopRecording} disabled={!isRecording}>Stop Recording</Button>
          {' '}
          <Button variant="success" onClick={downloadGPX} disabled={locations.length === 0}>Download GPX</Button>
        </Col>
      </Row>
      {locations.length > 0 && (
        <Row className="mt-3">
          <Col>
            <Alert variant="info">
              <p><strong>Recorded Locations:</strong></p>
              <ul>
                {locations.map((location, index) => (
                  <li key={index}>
                    Lat: {location.latitude}, Lon: {location.longitude}, Time: {location.timestamp}, 
                    Speed: {location.speed !== null ? `${location.speed} m/s` : 'N/A'}, 
                    Distance: {location.distance.toFixed(2)} km
                  </li>
                ))}
              </ul>
            </Alert>
          </Col>
        </Row>
      )}
      {error && (
        <Row className="mt-3">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default GeolocationRecorder;
