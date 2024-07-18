import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Layout from './components/Layout';
import MarketPlace from './pages/Marketplace';
import SignUp from './pages/SignUp';
import PublisherHomepage from './pages/PublisherHomepage';
import DeveloperHomepage from './pages/DeveloperHomepage';
import ClippedDrawer from './components/ClippedDrawer';
import Test from './pages/Test';
import Subscription from './pages/Subscription';
import ProjectCreate from './pages/ProjectCreate';
import ProjectDetailPublisher from './pages/ProjectDetailPublisher';
import ProjectDetailDeveloper from './pages/ProjectDetailDeveloper';
import { CookiesProvider, useCookies } from 'react-cookie';
import ProjectManagementPage from './pages/ProjectManagementPage';
import CompanyProjectManagementPage from './pages/CompanyProjectManagementPage'; // Company view
import GanttChartPage from './pages/GanttChartPage'; // import GanttChartPage
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  const [cookies, setCookie] = useCookies(['user']);

  function handleLogin(user) {
    setCookie('user', user, { path: '/' });
  }
  return (
    <CookiesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Homepage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/marketplace" element={<MarketPlace />} />
            {/* protected route, only login user can visit these pages */}
            <Route element={<ProtectedRoute isLogin={cookies.user} />}>
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/publisherhomepage/:id" element={<PublisherHomepage />} />
              <Route path="/developerhomepage/:id" element={<DeveloperHomepage />} />
              <Route path="/project" element={<ProjectCreate />} />
              <Route path="/project-management" element={<ProjectManagementPage />} />  {/* 添加新的路由 */}
              <Route path="/company-project-management" element={<CompanyProjectManagementPage />} /> {/* Company 视角 */}
              <Route path="/gantt-chart" element={<GanttChartPage />} /> {/* 添加新的路由 */}
              <Route path="/projectdetail/publisher/:id" element={<ProjectDetailPublisher />} />
              <Route path="/projectdetail/developer/:id" element={<ProjectDetailDeveloper />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </CookiesProvider>
  );
}

export default App;
