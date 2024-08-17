import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router, Link } from 'react-router-dom';
import SingleTrack from './components/AnalyzeTrack/SingleTrack';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationButtons from './components/NavigationButtons';
import { parseGPX } from './utils/gpxFileParser';
import { docClient } from './awsConfig';
import DoubleTrack from './components/AnalyzeTrack/DoubleTrack';

const App = () => {
  const [availableTracks, setAvailableTracks] = useState([]);
  const [chosenTracks, setChosenTracks] = useState([]);

  console.log(chosenTracks.length)

  
/*
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        TableName: 'bike-trip-app',
      };

      try {
        const result = await docClient.scan(params).promise();
        const data = result.Items[0].gpx_track
        const features = parseGPX(data)
        setTrack(features)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
*/

  
useEffect(() => {
  const fetchGPX = async () => {
    try {
      let response = await fetch(`${process.env.PUBLIC_URL}/gpx/output_with_speed.gpx`);
      let data = await response.text();
      let feature1 = parseGPX(data);
      setAvailableTracks(prevTracks => [...prevTracks, feature1]); // Use functional update

      response = await fetch(`${process.env.PUBLIC_URL}/gpx/mytrack.gpx`);
      data = await response.text();
      let feature2 = parseGPX(data);
      setAvailableTracks(prevTracks => [...prevTracks, feature2]); // Use functional update
    } catch (error) {
      console.error('Error fetching GPX data:', error);
    }
  };

  fetchGPX();
}, []);

  

  return (
    <Router>
    <>
      <Routes>
        <Route path="/bike-trip-app" element={<NavigationButtons chosenTracks={chosenTracks} setChosenTracks={setChosenTracks} availableTracks={availableTracks}/>} />
        <Route path="/single-track" element={<SingleTrack trip={chosenTracks[0]}/>} />
        <Route path="/double-track" element={<DoubleTrack trips={chosenTracks}/>} />
      </Routes>
    </>
  </Router>
  );
};

export default App;



