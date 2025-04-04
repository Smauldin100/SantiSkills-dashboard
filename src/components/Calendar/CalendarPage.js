import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';

const CalendarContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CalendarCard = styled(Card)`
  margin-bottom: 20px;
`;

const NotesSection = styled(Card)`
  margin-bottom: 20px;
`;

const NoteItem = styled(ListItem)`
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState([
    { id: 1, date: new Date(), title: 'Team Meeting', content: 'Discuss project progress', notify: true },
    { id: 2, date: new Date(), title: 'Code Review', content: 'Review pull requests', notify: false },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentNote, setCurrentNote] = useState({ title: '', content: '', notify: false });
  const [isEditing, setIsEditing] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleOpenDialog = (note = null) => {
    if (note) {
      setCurrentNote(note);
      setIsEditing(true);
    } else {
      setCurrentNote({ title: '', content: '', notify: false });
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentNote({ title: '', content: '', notify: false });
    setIsEditing(false);
  };

  const handleSaveNote = () => {
    if (isEditing) {
      setNotes(notes.map(note => 
        note.id === currentNote.id ? { ...currentNote } : note
      ));
    } else {
      setNotes([...notes, {
        id: notes.length + 1,
        date: selectedDate,
        ...currentNote
      }]);
    }
    handleCloseDialog();
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const toggleNotification = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, notify: !note.notify } : note
    ));
  };

  return (
    <CalendarContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <CalendarCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Calendar
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateCalendar
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </CardContent>
          </CalendarCard>

          <NotesSection>
            <CardContent>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Typography variant="h6">
                  Notes & Reminders
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog()}
                >
                  Add Note
                </Button>
              </div>
              <List>
                {notes.map((note) => (
                  <NoteItem key={note.id}>
                    <ListItemText
                      primary={note.title}
                      secondary={`${note.content} - ${note.date.toLocaleDateString()}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => toggleNotification(note.id)}
                        color={note.notify ? 'primary' : 'default'}
                      >
                        <NotificationsIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleOpenDialog(note)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </NoteItem>
                ))}
              </List>
            </CardContent>
          </NotesSection>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Events
              </Typography>
              <List>
                {notes
                  .filter(note => note.notify)
                  .map(note => (
                    <ListItem key={note.id}>
                      <ListItemText
                        primary={note.title}
                        secondary={note.date.toLocaleDateString()}
                      />
                    </ListItem>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? 'Edit Note' : 'Add Note'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={currentNote.title}
            onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={currentNote.content}
            onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveNote} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </CalendarContainer>
  );
};

export default CalendarPage; 