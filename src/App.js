import React from 'react';
import { Route, Routes, BrowserRouter as Router, Link } from 'react-router-dom';
import CreateTrip from './components/CreateTrip';
import MyPastTrips from './components/MyPastTrips';
import ExploreTrips from './components/ExploreTrips';
import RecordTrip from './components/RecordTrip';
import NavigationButtons from './components/NavigationButtons';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExploreTripsMap from './components/ExploreTripsMap';


const App = () => {

  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<NavigationButtons />} />
          <Route path="/create-trips" element={<RecordTrip />} />
          <Route path="/explore-trips" element={<ExploreTrips />} />
          <Route path="/explore-trips/:filter" element={<ExploreTripsMap/>} />
          <Route path="/my-past-trips" element={<MyPastTrips />} />
        </Routes>
      </>
    </Router>

  );
};

export default App;


