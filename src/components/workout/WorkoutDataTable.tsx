import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete, Edit, PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useWorkoutContext } from '../../context/workout.context';
import { DataType } from '../../models/data.model';
import DataTable from '../DataTable';
import DeleteModal from '../DeleteModal';

const WorkoutDataTable: React.FC = () => {

  const workoutContext = useWorkoutContext();
  const navigate = useNavigate();

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

  const handleRemoveUser = (id: string) => {
    const index = workoutContext.workouts.findIndex((workout) => workout._id === id);
    const updatedWorkouts = [...workoutContext.workouts];
    updatedWorkouts.splice(index, 1);
    workoutContext.setWorkouts(updatedWorkouts);
  };

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', minWidth: 300, flex: 1 },
    { field: 'category', headerName: 'Category', width: 300 },
    { field: 'actions', headerName: 'Actions', align: 'center', width: 150, sortable: false,
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
      <DataTable rows={workoutContext.workouts} columns={columns} type={DataType.WORKOUT} />
      { openModal &&
        <DeleteModal
          id={workoutId}
          name={workoutTitle}
          type={DataType.WORKOUT}
          updateContext={handleRemoveUser}
          handleClose={handleClose}
        />
      }
    </>
  );
};

export default WorkoutDataTable;
