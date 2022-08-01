import React from 'react';
import { useExerciseContext } from '../../context/exercise.context';
import { Exercise } from '../../models/exercise.model';
import FinishModal from '../FinishWorkoutModal';
import { generateWorkout } from './generate.service';
import GenerateWorkoutForm from './GenerateWorkoutForm';
import GenerateWorkoutRender from './GenerateWorkoutRender';

const GenerateWorkout: React.FC = () => {

  const exerciseContext = useExerciseContext();

  const [ workout, setWorkout ] = React.useState<Exercise[]>([]);
  const [ category, setCategory ] = React.useState<string>('');
  const [ openWorkoutForm, setOpenWorkoutForm ] = React.useState<boolean>(true);
  const [ openWorkout, setOpenWorkout ] = React.useState<boolean>(false);
  const [ openModal, setOpenModal ] = React.useState<boolean>(false);

  const handleGenerateWorkout = async ({ category, length, includeAbs }: { category: string, length: string, includeAbs: boolean }) => {
    const workout = await generateWorkout( category, length, includeAbs, exerciseContext.exercises );

    setWorkout(workout);
    setCategory(category);
    setOpenWorkoutForm(false);
    setOpenWorkout(true);
  };

  return (
    <>
      { openWorkoutForm &&
        <GenerateWorkoutForm
          handleGenerateWorkout={handleGenerateWorkout}
        />
      }
      { openWorkout &&
        <GenerateWorkoutRender
          workout={workout}
          category={category}
          setOpenModal={setOpenModal}
        />
      }
      { openModal &&
        <FinishModal handleClose={() => setOpenModal(false)} />
      }
    </>
  );
}

export default GenerateWorkout;
