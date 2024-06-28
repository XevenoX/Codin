import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Layout from './components/Layout';
import MarketPlace from './pages/Marketplace';
import SignUp from './pages/SignUp';
import ProjectManagementPage from './components/ProjectManagementPage';
import CompanyProjectManagementPage from './components/CompanyProjectManagementPage'; // Company view
import GanttChartPage from './components/GanttChartPage'; // import GanttChartPage



function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/project-management" element={<ProjectManagementPage />} />  {/* 添加新的路由 */}
          <Route path="/company-project-management" element={<CompanyProjectManagementPage />} /> {/* Company 视角 */}
          <Route path="/gantt-chart" element={<GanttChartPage />} /> {/* 添加新的路由 */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;