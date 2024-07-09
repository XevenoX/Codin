import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Layout from './components/Layout';
import MarketPlace from './pages/Marketplace';
import SignUp from './pages/SignUp';
import PublisherHomepage from './pages/PublisherHomepage';
import DeveloperHomepage from './pages/DeveloperHomepage';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/publisherhomepage" element={<PublisherHomepage />} />
          <Route path="/developerhomepage" element={<DeveloperHomepage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;