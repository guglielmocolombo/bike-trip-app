import React from 'react';
import { Route, Routes, BrowserRouter as Router, Link } from 'react-router-dom';
import CreateTrip from './components/CreateTrip';
import MyPastTrips from './components/MyPastTrips';
import ExploreTrips from './components/ExploreTrips';
import NavigationButtons from './components/NavigationButtons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import axios from 'axios';


const App = () => {

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:5002/documents');
        console.log(response)
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<NavigationButtons />} />
          <Route path="/create-trips" element={<CreateTrip />} />
          <Route path="/explore-trips" element={<ExploreTrips />} />
          <Route path="/my-past-trips" element={<MyPastTrips />} />
        </Routes>
      </>
    </Router>

  );
};

export default App;


