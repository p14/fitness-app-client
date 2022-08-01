import { Add } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Grid, List, Divider, ListItem, IconButton, ListItemText, Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useExerciseContext } from '../../context/exercise.context';
import { Exercise } from '../../models/exercise.model';
import { WorkoutCategory } from '../../models/workout.model';
import { parseExerciseCategories } from './workout.service';

interface ExerciseModalProps {
  currentExercises: string[]
  handleAddExercise: (exerciseId: string) => void
  category: WorkoutCategory
  handleClose: () => void
}

const ExerciseModal = ({ currentExercises, handleAddExercise, category, handleClose }: ExerciseModalProps) => {

  const exerciseContext = useExerciseContext();

  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [search, setSearch] = useState<string>('');

  const filterExercises = () => {
    let categoryExercises: Exercise[];
    if (category === WorkoutCategory.FULL_BODY) {
      categoryExercises = [...exerciseContext.exercises];
    } else {
      categoryExercises = exerciseContext.exercises.filter((exercise) => {
        return exercise.categories.includes(category);
      });
    }

    const unselected = categoryExercises.filter((exercise) => {
      return !currentExercises.find((currentExerciseId) => currentExerciseId === exercise._id);
    });

    let filtered = [...unselected];
    if (search) {
      filtered = unselected.filter((exercise) => {
        return exercise.title.toLowerCase().startsWith(search.toLowerCase());
      });
    }

    setFilteredExercises(filtered);
  };

  useEffect(() => {
    filterExercises();
  }, [currentExercises, category, search]);

  return (
    <Dialog open fullWidth maxWidth='sm' onClose={handleClose}>
      <DialogTitle>
        Add Exercises To Workout
        <TextField
          fullWidth
          sx={{ marginTop: 1 }}
          variant='standard'
          label='Search'
          type='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </DialogTitle>
      <DialogContent sx={{ height: '80vh' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List>
              {filteredExercises.map((exercise) => (
                <Box key={exercise._id}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge='end' onClick={() => handleAddExercise(exercise._id!)}>
                        <Add />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={exercise.title}
                      secondary={parseExerciseCategories(exercise.categories)}
                    />
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExerciseModal;
