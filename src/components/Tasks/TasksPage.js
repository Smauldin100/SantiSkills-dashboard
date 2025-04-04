import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Flag as FlagIcon,
  Sort as SortIcon,
} from '@mui/icons-material';

const TasksContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TasksHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const TaskItem = styled(ListItem)`
  background: white;
  margin-bottom: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    background: #f5f5f5;
  }
`;

const PriorityChip = styled(Chip)`
  margin-right: 8px;
`;

const TasksPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project documentation', description: 'Write detailed documentation for the API', completed: false, priority: 'high', category: 'work' },
    { id: 2, title: 'Review pull requests', description: 'Review and merge pending PRs', completed: true, priority: 'medium', category: 'work' },
    { id: 3, title: 'Update portfolio', description: 'Add recent projects to portfolio', completed: false, priority: 'low', category: 'personal' },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '', priority: 'medium', category: 'work' });
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenDialog = (task = null) => {
    if (task) {
      setCurrentTask(task);
      setIsEditing(true);
    } else {
      setCurrentTask({ title: '', description: '', priority: 'medium', category: 'work', completed: false });
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentTask({ title: '', description: '', priority: 'medium', category: 'work', completed: false });
    setIsEditing(false);
  };

  const handleSaveTask = () => {
    if (isEditing) {
      setTasks(tasks.map(task =>
        task.id === currentTask.id ? { ...currentTask } : task
      ));
    } else {
      setTasks([...tasks, {
        id: tasks.length + 1,
        ...currentTask,
      }]);
    }
    handleCloseDialog();
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'active') return !task.completed;
      return true;
    })
    .filter(task => {
      if (categoryFilter === 'all') return true;
      return task.category === categoryFilter;
    });

  return (
    <TasksContainer>
      <TasksHeader>
        <Typography variant="h5">Tasks</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Task
        </Button>
      </TasksHeader>

      <FilterContainer>
        <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            label="Category"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="work">Work</MenuItem>
            <MenuItem value="personal">Personal</MenuItem>
          </Select>
        </FormControl>
      </FilterContainer>

      <Card>
        <CardContent>
          <List>
            {filteredTasks.map((task) => (
              <TaskItem key={task.id}>
                <ListItemIcon>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id)}
                    color="primary"
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      <PriorityChip
                        size="small"
                        label={task.priority}
                        color={getPriorityColor(task.priority)}
                      />
                      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.title}
                      </span>
                    </>
                  }
                  secondary={task.description}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleOpenDialog(task)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </TaskItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? 'Edit Task' : 'Add Task'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={currentTask.title}
            onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={currentTask.description}
            onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Priority</InputLabel>
            <Select
              value={currentTask.priority}
              onChange={(e) => setCurrentTask({ ...currentTask, priority: e.target.value })}
              label="Priority"
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              value={currentTask.category}
              onChange={(e) => setCurrentTask({ ...currentTask, category: e.target.value })}
              label="Category"
            >
              <MenuItem value="work">Work</MenuItem>
              <MenuItem value="personal">Personal</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveTask} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </TasksContainer>
  );
};

export default TasksPage; 