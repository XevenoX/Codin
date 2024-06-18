import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Layout from './components/Layout';
import MarketPlace from './pages/Marketplace';
import SignUp from './pages/SignUp';
import ProjectCreate from './pages/ProjectCreate';
import ProjectDetailPublisher from './pages/ProjectDetailPublisher';
import ProjectDetailDeveloper from './pages/ProjectDetailDeveloper';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/project" element={<ProjectCreate />} />
          <Route path="/projectdetail/publisher" element={<ProjectDetailPublisher />} />
          <Route path="/projectdetail/developer" element={<ProjectDetailDeveloper />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;