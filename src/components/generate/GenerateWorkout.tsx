import React from 'react';
import FinishModal from '../FinishWorkoutModal';
import { generateWorkout } from './generate.service';
import GenerateWorkoutForm from './GenerateWorkoutForm';
import GenerateWorkoutList from './GenerateWorkoutList';

const GenerateWorkout: React.FC = () => {

  const [ workout, setWorkout ] = React.useState<string[]>([]);
  const [ category, setCategory ] = React.useState<string>('');
  const [ openWorkoutForm, setOpenWorkoutForm ] = React.useState<boolean>(true);
  const [ openWorkout, setOpenWorkout ] = React.useState<boolean>(false);
  const [ openModal, setOpenModal ] = React.useState<boolean>(false);

  const handleGenerateWorkout = async ({ category, length, includeAbs }: { category: string, length: string, includeAbs: boolean }) => {
    const workout = await generateWorkout( category, length, includeAbs );

    localStorage.setItem('generated-workout', JSON.stringify(workout));
    localStorage.setItem('generated-category', JSON.stringify(category));

    setWorkout(workout);
    setCategory(category);
    setOpenWorkoutForm(false);
    setOpenWorkout(true);
  };

  // Check if there is a generated workout in local storage
  React.useEffect(() => {
    const generatedWorkout = localStorage.getItem('generated-workout');
    const generatedCategory = localStorage.getItem('generated-category');
    if (generatedWorkout && generatedCategory) {
      const workout: string[] = JSON.parse(generatedWorkout);
      const category: string = JSON.parse(generatedCategory);
      
      setWorkout(workout);
      setCategory(category);
      setOpenWorkoutForm(false);
      setOpenWorkout(true);
    }
  }, [ ]);

  return (
    <>
      { openWorkoutForm &&
        <GenerateWorkoutForm
          handleGenerateWorkout={handleGenerateWorkout}
        />
      }
      { openWorkout &&
        <GenerateWorkoutList
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
