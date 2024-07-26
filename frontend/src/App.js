import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import MarketPlace from './pages/Marketplace';
import SignUp from './pages/SignUp';
import PublisherHomepage from './pages/PublisherHomepage';
import DeveloperHomepage from './pages/DeveloperHomepage';
import Subscription from './pages/Subscription';
import ProjectCreate from './pages/ProjectCreate';
import ProjectDetailPublisher from './pages/ProjectDetailPublisher';
import ProjectDetailDeveloper from './pages/ProjectDetailDeveloper';
import { CookiesProvider, useCookies } from 'react-cookie';
import DeveloperProjectManagementPage from './pages/DeveloperProjectManagementPage';
import CompanyProjectManagementPage from './pages/CompanyProjectManagementPage';
import GanttChartPage from './pages/GanttChartPage';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer.js';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  function handleLogin(user) {
    setCookie('user', user, { path: '/' });
  }

  function handleLogout() {
    removeCookie('user', { path: '/' });
  }

  return (
    <CookiesProvider>
      <Router>
        <Navigation user={cookies.user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Homepage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          {/* protected route, only login user can visit these pages */}
          <Route element={<ProtectedRoute isLogin={cookies.user} />}>
            <Route path="/subscription" element={<Subscription />} />
            <Route
              path="/publisherhomepage/:id"
              element={<PublisherHomepage />}
            />
            <Route
              path="/developerhomepage/:id"
              element={<DeveloperHomepage />}
            />
            <Route path="/project" element={<ProjectCreate />} />
            <Route
              path="/project-management"
              element={<DeveloperProjectManagementPage />}
            />{' '}
            <Route
              path="/company-project-management"
              element={<CompanyProjectManagementPage />}
            />{' '}
            <Route path="/gantt-chart" element={<GanttChartPage />} />{' '}
            <Route
              path="/projectdetail/publisher/:id"
              element={<ProjectDetailPublisher />}
            />
            <Route
              path="/projectdetail/developer/:id"
              element={<ProjectDetailDeveloper />}
            />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </CookiesProvider>
  );
}

export default App;
