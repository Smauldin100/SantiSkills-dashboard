import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './components/Navigation/Sidebar';
import ChatInterface from './components/Chats/ChatInterface';
import Settings from './components/Settings/Settings';
import FinancesSection from './components/Finances/FinancesSection';
import ProfilePage from './components/Profile/ProfilePage';
import CalendarPage from './components/Calendar/CalendarPage';
import TasksPage from './components/Tasks/TasksPage';
import NotificationsPage from './components/Notifications/NotificationsPage';
import ProfileHeader from './components/ProfileHeader';
import SkillsRadarChart from './components/charts/SkillsRadarChart';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import EducationSection from './components/sections/EducationSection';
import CertificationsSection from './components/sections/CertificationsSection';
import SkillsTimelineChart from './components/charts/SkillsTimelineChart';
import LanguageUsageChart from './components/charts/LanguageUsageChart';
import './App.css';

const AppContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  margin-left: 250px;
  width: calc(100% - 250px);
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
`;

const Dashboard = () => (
  <>
    <ProfileHeader />
    <div className="dashboard-grid">
      <div className="dashboard-item skills-item">
        <SkillsRadarChart />
      </div>
      <div className="dashboard-item language-item">
        <LanguageUsageChart />
      </div>
    </div>
    <SkillsTimelineChart />
    <ProjectsSection />
    <ExperienceSection />
    <EducationSection />
    <CertificationsSection />
  </>
);

const ChatPage = styled.div`
  height: calc(100vh - 40px);
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Sidebar />
        <MainContent>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/chats" element={<ChatPage><ChatInterface /></ChatPage>} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/projects" element={<ProjectsSection />} />
            <Route path="/finances" element={<FinancesSection />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;

// Update App.css with new styles
const appStyles = `
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.dashboard-item {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.skills-item, .language-item {
  min-height: 300px;
}
`;
