import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete, Edit, PlayArrow } from '@mui/icons-material';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { refresh } from '../../api/auth.api';
import { useFeedbackContext } from '../../context/feedback.context';
import { useSessionContext } from '../../context/session.context';
import { useWorkoutContext } from '../../context/workout.context';
import { DataType } from '../../models/data.model';
import { Workout } from '../../models/workout.model';
import DataTable from '../DataTable';
import DeleteModal from '../DeleteModal';
import { removeWorkoutFromUser } from './workout.service';

const WorkoutDataTable: React.FC = () => {

  const feedbackContext = useFeedbackContext();
  const sessionContext = useSessionContext();
  const workoutContext = useWorkoutContext();
  const theme = useTheme();
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  const [workoutId, setWorkoutId] = useState<string>('');
  const [workoutTitle, setWorkoutTitle] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpen = (id: string, title: string) => {
    setWorkoutId(id);
    setWorkoutTitle(title);
    setOpenModal(true);
  };

  const handleClose = () => {
    setWorkoutId('');
    setWorkoutTitle('')
    setOpenModal(false)
  };

  const handleRemoveUserWorkout = (id: string) => {
    removeWorkoutFromUser(sessionContext.user, id)
      .then((response) => response.data)
      .then((data) => {
        sessionContext.setSession(true, data);
        refresh();
      })
      .catch((error: any) => {
        if (typeof error === 'object') {
          feedbackContext.setFeedback({
            message: error.response.data ?? error.message, 
            error: true,
            open: true,
          });
        } else {
          feedbackContext.setFeedback({
            message: error, 
            error: true,
            open: true,
          });
        }
      });
  };

  const handleRemoveWorkout = (id: string) => {
    const index = workoutContext.workouts.findIndex((workout) => workout._id === id);
    const updatedWorkouts = [...workoutContext.workouts];
    updatedWorkouts.splice(index, 1);
    workoutContext.setWorkouts(updatedWorkouts);
    handleRemoveUserWorkout(id);
  };

  const createWorkoutRows = (workouts: Workout[]) => (
    workouts.map((workout) => (
      {
        ...workout,
        category: workout.category.replace('_', ' '),
      }
    ))
  );

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', minWidth: 150, flex: 1 },
    { field: 'category', headerName: 'Category', width: 200, hide: isSmallScreen ? true : false },
    { field: 'actions', headerName: 'Actions', align: 'center', width: 125, sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={() => navigate(`/workouts/${params.id}`)}>
              <PlayArrow fontSize='small' />
            </IconButton>
            <IconButton onClick={() => navigate(`/workouts/${params.id}/edit`)}>
              <Edit fontSize='small' />
            </IconButton>
            <IconButton onClick={() => handleOpen(String(params.id), params.row.title)}>
              <Delete fontSize='small' />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        rows={createWorkoutRows(workoutContext.workouts)}
        columns={columns}
        type={DataType.WORKOUT}
      />
      { openModal &&
        <DeleteModal
          id={workoutId}
          name={workoutTitle}
          type={DataType.WORKOUT}
          updateContext={handleRemoveWorkout}
          handleClose={handleClose}
        />
      }
    </>
  );
};

export default WorkoutDataTable;
