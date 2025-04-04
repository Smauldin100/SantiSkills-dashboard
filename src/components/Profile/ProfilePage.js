import React from 'react';
import styled from 'styled-components';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  GitHub,
  Language,
  School,
  Work,
  EmojiEvents,
} from '@mui/icons-material';

const ProfileContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderCard = styled(Card)`
  margin-bottom: 20px;
  background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
  color: white;
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const LargeAvatar = styled(Avatar)`
  width: 150px !important;
  height: 150px !important;
  margin-bottom: 15px;
  border: 4px solid white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const SectionTitle = styled(Typography)`
  margin-bottom: 20px !important;
  color: #1a73e8;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SkillChip = styled(Chip)`
  margin: 5px;
`;

const ProfilePage = () => {
  const personalInfo = {
    name: "Santiago Mauldin",
    title: "Full Stack Developer",
    avatar: "/path/to/avatar.jpg",
    email: "santiago@example.com",
    phone: "+1 234 567 8900",
    location: "San Francisco, CA",
    website: "https://santimauldin.dev",
    github: "https://github.com/smauldin100",
    linkedin: "https://linkedin.com/in/santimauldin",
    bio: "Passionate full-stack developer with expertise in React, Node.js, and cloud technologies. Committed to creating efficient, scalable, and user-friendly applications.",
  };

  const skills = [
    { name: "React", level: "Expert" },
    { name: "Node.js", level: "Advanced" },
    { name: "JavaScript", level: "Expert" },
    { name: "TypeScript", level: "Advanced" },
    { name: "Python", level: "Intermediate" },
    { name: "AWS", level: "Advanced" },
    { name: "Docker", level: "Intermediate" },
    { name: "GraphQL", level: "Advanced" },
  ];

  const experience = [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Full Stack Developer",
      period: "2021 - Present",
      description: "Leading development of enterprise web applications using React and Node.js.",
    },
    {
      company: "Digital Innovations Co.",
      position: "Full Stack Developer",
      period: "2019 - 2021",
      description: "Developed and maintained multiple client projects using modern web technologies.",
    },
  ];

  const education = [
    {
      school: "University of Technology",
      degree: "BS in Computer Science",
      period: "2015 - 2019",
      gpa: "3.8",
    },
  ];

  return (
    <ProfileContainer>
      <HeaderCard>
        <CardContent>
          <AvatarWrapper>
            <LargeAvatar src={personalInfo.avatar} alt={personalInfo.name}>
              {personalInfo.name.charAt(0)}
            </LargeAvatar>
            <Typography variant="h4" gutterBottom>
              {personalInfo.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {personalInfo.title}
            </Typography>
          </AvatarWrapper>
          
          <Typography variant="body1" paragraph style={{ textAlign: 'center' }}>
            {personalInfo.bio}
          </Typography>

          <SocialLinks>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Email />}
              href={`mailto:${personalInfo.email}`}
              style={{ backgroundColor: 'white', color: '#000DFF' }}
            >
              Email
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<GitHub />}
              href={personalInfo.github}
              target="_blank"
              style={{ backgroundColor: 'white', color: '#000DFF' }}
            >
              GitHub
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<LinkedIn />}
              href={personalInfo.linkedin}
              target="_blank"
              style={{ backgroundColor: 'white', color: '#000DFF' }}
            >
              LinkedIn
            </Button>
          </SocialLinks>
        </CardContent>
      </HeaderCard>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <SectionTitle variant="h6">
                <LocationOn /> Contact Information
              </SectionTitle>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText primary="Email" secondary={personalInfo.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Phone />
                  </ListItemIcon>
                  <ListItemText primary="Phone" secondary={personalInfo.phone} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText primary="Location" secondary={personalInfo.location} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Language />
                  </ListItemIcon>
                  <ListItemText primary="Website" secondary={personalInfo.website} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card style={{ marginBottom: '20px' }}>
            <CardContent>
              <SectionTitle variant="h6">
                <Work /> Professional Experience
              </SectionTitle>
              {experience.map((exp, index) => (
                <div key={index}>
                  <Typography variant="h6">{exp.position}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {exp.company} | {exp.period}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {exp.description}
                  </Typography>
                  {index < experience.length - 1 && <Divider style={{ margin: '10px 0' }} />}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card style={{ marginBottom: '20px' }}>
            <CardContent>
              <SectionTitle variant="h6">
                <School /> Education
              </SectionTitle>
              {education.map((edu, index) => (
                <div key={index}>
                  <Typography variant="h6">{edu.degree}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {edu.school} | {edu.period}
                  </Typography>
                  <Typography variant="body2">GPA: {edu.gpa}</Typography>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <SectionTitle variant="h6">
                <EmojiEvents /> Skills
              </SectionTitle>
              <div>
                {skills.map((skill) => (
                  <SkillChip
                    key={skill.name}
                    label={`${skill.name} - ${skill.level}`}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ProfileContainer>
  );
};

export default ProfilePage; 