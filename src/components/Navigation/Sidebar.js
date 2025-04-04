import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';
import WorkIcon from '@mui/icons-material/Work';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TaskIcon from '@mui/icons-material/Task';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: #1a1a1a;
  color: white;
  padding: 20px 0;
  position: fixed;
  left: 0;
  top: 0;
  transition: all 0.3s ease;
  overflow-y: auto;
`;

const Logo = styled.div`
  padding: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #333;
  margin-bottom: 20px;
`;

const NavSection = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;

  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.div`
  padding: 10px 20px;
  color: #666;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: ${props => props.active ? '#fff' : '#888'};
  text-decoration: none;
  transition: all 0.3s ease;
  background: ${props => props.active ? '#333' : 'transparent'};

  &:hover {
    background: #333;
    color: white;
  }

  .icon {
    margin-right: 10px;
  }
`;

const Sidebar = () => {
  const location = useLocation();

  const navSections = [
    {
      title: 'Main',
      items: [
        { path: '/', icon: <DashboardIcon className="icon" />, label: 'Dashboard' },
        { path: '/profile', icon: <PersonIcon className="icon" />, label: 'Profile' },
      ]
    },
    {
      title: 'Communication',
      items: [
        { path: '/chats', icon: <ChatIcon className="icon" />, label: 'ChatBot' },
        { path: '/notifications', icon: <NotificationsIcon className="icon" />, label: 'Notifications' },
      ]
    },
    {
      title: 'Organization',
      items: [
        { path: '/calendar', icon: <CalendarMonthIcon className="icon" />, label: 'Calendar' },
        { path: '/tasks', icon: <TaskIcon className="icon" />, label: 'Tasks' },
        { path: '/projects', icon: <WorkIcon className="icon" />, label: 'Projects' },
      ]
    },
    {
      title: 'Finance & Tracking',
      items: [
        { path: '/finances', icon: <AccountBalanceWalletIcon className="icon" />, label: 'Finances' },
        { path: '/trackers', icon: <TrackChangesIcon className="icon" />, label: 'Trackers' },
      ]
    },
    {
      title: 'System',
      items: [
        { path: '/files', icon: <CloudUploadIcon className="icon" />, label: 'Files & Media' },
        { path: '/settings', icon: <SettingsIcon className="icon" />, label: 'Settings' },
      ]
    }
  ];

  return (
    <SidebarContainer>
      <Logo>SantiSkills</Logo>
      {navSections.map((section, index) => (
        <NavSection key={index}>
          <SectionTitle>{section.title}</SectionTitle>
          {section.items.map((item) => (
            <NavItem
              key={item.path}
              to={item.path}
              active={location.pathname === item.path ? 1 : 0}
            >
              {item.icon}
              {item.label}
            </NavItem>
          ))}
        </NavSection>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar; 