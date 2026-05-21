import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import MainLayout from '../layouts/MainLayout';
import LandingPage from '../pages/LandingPage';
import DashboardPage from '../pages/DashboardPage';
import UrlAnalyzerPage from '../pages/UrlAnalyzerPage';
import MessageAnalyzerPage from '../pages/MessageAnalyzerPage';
import ResultsPage from '../pages/ResultsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analyze/url" element={<UrlAnalyzerPage />} />
        <Route path="/analyze/message" element={<MessageAnalyzerPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Route>
    </Routes>
  );
}
