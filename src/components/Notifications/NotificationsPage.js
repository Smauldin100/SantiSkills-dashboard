import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Badge,
  Chip,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const NotificationsContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const NotificationItem = styled(ListItem)`
  background: white;
  margin-bottom: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    background: #f5f5f5;
  }

  &.unread {
    border-left: 4px solid #1a73e8;
  }
`;

const SettingsSection = styled(Card)`
  margin-top: 20px;
`;

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      title: 'New Project Update',
      message: 'The project documentation has been updated.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
    },
    {
      id: 2,
      type: 'warning',
      title: 'Task Deadline Approaching',
      message: 'You have a task due in 2 days.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: true,
    },
    {
      id: 3,
      type: 'success',
      title: 'Project Milestone Completed',
      message: 'Congratulations! You have completed the first milestone.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: false,
    },
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    taskReminders: true,
    projectUpdates: true,
  });

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleSettingChange = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning':
        return <WarningIcon style={{ color: '#f57c00' }} />;
      case 'success':
        return <CheckCircleIcon style={{ color: '#4caf50' }} />;
      case 'info':
      default:
        return <InfoIcon style={{ color: '#1a73e8' }} />;
    }
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    if (minutes > 0) return `${minutes} minutes ago`;
    return 'Just now';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationsContainer>
      <Header>
        <Typography variant="h5" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          Notifications
          {unreadCount > 0 && (
            <Badge badgeContent={unreadCount} color="primary">
              <NotificationsIcon />
            </Badge>
          )}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
        >
          Mark All as Read
        </Button>
      </Header>

      <Card>
        <CardContent>
          <List>
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} className={notification.read ? '' : 'unread'}>
                <ListItemIcon>
                  {getNotificationIcon(notification.type)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {notification.title}
                      {!notification.read && (
                        <Chip size="small" label="New" color="primary" />
                      )}
                    </div>
                  }
                  secondary={
                    <>
                      {notification.message}
                      <br />
                      <small>{formatTimestamp(notification.timestamp)}</small>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  {!notification.read && (
                    <IconButton
                      edge="end"
                      onClick={() => handleMarkAsRead(notification.id)}
                      style={{ marginRight: 8 }}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  )}
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteNotification(notification.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </NotificationItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <SettingsSection>
        <CardContent>
          <Typography variant="h6" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <SettingsIcon />
            Notification Settings
          </Typography>
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.emailNotifications}
                  onChange={() => handleSettingChange('emailNotifications')}
                  color="primary"
                />
              }
              label="Email Notifications"
            />
            <Divider style={{ margin: '8px 0' }} />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.pushNotifications}
                  onChange={() => handleSettingChange('pushNotifications')}
                  color="primary"
                />
              }
              label="Push Notifications"
            />
            <Divider style={{ margin: '8px 0' }} />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.soundEnabled}
                  onChange={() => handleSettingChange('soundEnabled')}
                  color="primary"
                />
              }
              label="Sound Notifications"
            />
            <Divider style={{ margin: '8px 0' }} />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.taskReminders}
                  onChange={() => handleSettingChange('taskReminders')}
                  color="primary"
                />
              }
              label="Task Reminders"
            />
            <Divider style={{ margin: '8px 0' }} />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.projectUpdates}
                  onChange={() => handleSettingChange('projectUpdates')}
                  color="primary"
                />
              }
              label="Project Updates"
            />
          </div>
        </CardContent>
      </SettingsSection>
    </NotificationsContainer>
  );
};

export default NotificationsPage; 