import React from 'react';
import styled from 'styled-components';
import {
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider
} from '@mui/material';

const SettingsContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Section = styled(Card)`
  margin-bottom: 20px;
`;

const SectionTitle = styled(Typography)`
  margin-bottom: 20px !important;
  color: #1a73e8;
`;

const SettingItem = styled.div`
  margin-bottom: 15px;
`;

const Settings = () => {
  return (
    <SettingsContainer>
      <Section>
        <CardContent>
          <SectionTitle variant="h6">General Settings</SectionTitle>
          <SettingItem>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Enable Dark Mode"
            />
          </SettingItem>
          <SettingItem>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Enable Notifications"
            />
          </SettingItem>
          <Divider style={{ margin: '20px 0' }} />
          <SettingItem>
            <TextField
              fullWidth
              label="Display Name"
              defaultValue="Santiago Mauldin"
              variant="outlined"
              size="small"
            />
          </SettingItem>
        </CardContent>
      </Section>

      <Section>
        <CardContent>
          <SectionTitle variant="h6">API Configuration</SectionTitle>
          <SettingItem>
            <TextField
              fullWidth
              label="OpenAI API Key"
              type="password"
              variant="outlined"
              size="small"
            />
          </SettingItem>
          <Button variant="contained" color="primary">
            Save API Key
          </Button>
        </CardContent>
      </Section>

      <Section>
        <CardContent>
          <SectionTitle variant="h6">Data Management</SectionTitle>
          <SettingItem>
            <Button variant="outlined" color="primary" style={{ marginRight: 10 }}>
              Export Data
            </Button>
            <Button variant="outlined" color="error">
              Clear Chat History
            </Button>
          </SettingItem>
        </CardContent>
      </Section>
    </SettingsContainer>
  );
};

export default Settings; 