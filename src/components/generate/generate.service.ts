import { Exercise } from '../../models/exercise.model';
import { WorkoutCategory } from '../../models/workout.model';
import { shuffle } from '../../utils/helpers';

export const generateWorkout = async (category: string, length: number, exercises: Exercise[]) => {
  const allExercises: Exercise[] = [...exercises];
  const filteredExercises: Exercise[] = [];
  
  allExercises.forEach((exercise) => {
    if (exercise.categories.includes(category)) {
      filteredExercises.push(exercise);
    }
  });

  if (category === WorkoutCategory.FULL_BODY) {
    const chestExercises: Exercise[] = [];
    const armExercises: Exercise[] = [];
    const shoulderExercises: Exercise[] = [];
    const backExercises: Exercise[] = [];
    const legExercises: Exercise[] = [];

    allExercises.forEach((exercise) => {
      if (exercise.categories.includes(WorkoutCategory.CHEST)) {
        chestExercises.push(exercise);
      }

      if (exercise.categories.includes(WorkoutCategory.ARMS)) {
        armExercises.push(exercise);
      }

      if (exercise.categories.includes(WorkoutCategory.SHOULDERS)) {
        shoulderExercises.push(exercise);
      }

      if (exercise.categories.includes(WorkoutCategory.BACK)) {
        backExercises.push(exercise);
      }

      if (exercise.categories.includes(WorkoutCategory.LEGS)) {
        legExercises.push(exercise);
      }
    });

    const shuffledChestExercises: Exercise[] = shuffle(chestExercises);
    const shuffledArmExercises: Exercise[] = shuffle(armExercises);
    const shuffledShoulderExercises: Exercise[] = shuffle(shoulderExercises);
    const shuffledBackExercises: Exercise[] = shuffle(backExercises);
    const shuffledLegExercises: Exercise[] = shuffle(legExercises);

    const shuffledPrimaryExercises: Exercise[] = shuffle([
      shuffledChestExercises[0],
      shuffledArmExercises[0],
      shuffledShoulderExercises[0],
      shuffledBackExercises[0],
      shuffledLegExercises[0],
    ]);

    const shuffledSecondaryExercises: Exercise[] = shuffle([
      shuffledChestExercises[1],
      shuffledArmExercises[1],
      shuffledShoulderExercises[1],
      shuffledBackExercises[1],
      shuffledLegExercises[1],
    ]);

    const shuffledExercises = [ ...shuffledPrimaryExercises, ...shuffledSecondaryExercises ];
    const workout = shuffledExercises.slice(0, length);

    return workout;
  } else if (category === WorkoutCategory.HIIT) {
    const shuffledExercises: Exercise[] = shuffle(filteredExercises);
    const workout = shuffledExercises.slice(0, (length + 2));

    return workout;
  } else {
    const shuffledExercises: Exercise[] = shuffle(filteredExercises);
    const workout = shuffledExercises.slice(0, length);

    return workout;
  }
};
