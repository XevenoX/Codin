import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Layout from './components/Layout';
import MarketPlace from './pages/Marketplace';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/marketplace" element={<MarketPlace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;