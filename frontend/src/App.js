import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Layout from './components/Layout';
import MarketPlace from './pages/Marketplace';
import SignUp from './pages/SignUp';
import ClippedDrawer from './components/ClippedDrawer';
import Test from './pages/Test';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="marketplace" element={<MarketPlace />} />
          <Route path="clipped-drawer" element={<ClippedDrawer />} />
        </Route>
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
