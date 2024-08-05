import React, { useState, useEffect } from 'react';
import AnalyzeTrack from './components/AnalyzeTrack/AnalyzeTrack';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Alert, Row, Col } from 'react-bootstrap';
import { parseGPX } from './utils/gpxFileParser';

const App = () => {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    const fetchGPX = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/gpx/output_with_speed.gpx`);
        const data = await response.text();
        const features = parseGPX(data);
        setTrack(features);
      } catch (error) {
        console.error('Error fetching GPX data:', error);
      }
    };

    fetchGPX();
  }, []); // Empty dependency array means this useEffect runs once after initial render

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <h1>GPX Data Graph</h1>
      <AnalyzeTrack positions={track ? track.points : []} />
    </div>
  );
};

export default App;



