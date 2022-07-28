import { Exercise } from '../../models/exercise.model';
import { fetchExercises, randomVariant, shuffle } from '../../utils/helpers';

export const exerciseCategories = [
  { name: 'Chest', value: 'chest' },
  { name: 'Arms', value: 'arms' },
  { name: 'Shoulders', value: 'shoulders' },
  { name: 'Back', value: 'back' },
  { name: 'Legs', value: 'legs' },
  { name: 'Push', value: 'push' },
  { name: 'Pull', value: 'pull' },
  { name: 'Upper', value: 'upper' },
  { name: 'Lower', value: 'lower' },
  { name: 'Full Body', value: 'fullBody' },
  { name: 'HIIT', value: 'hiit' },
];

export const exerciseLengths = [
  { name: 'Short', value: '4' },
  { name: 'Medium', value: '5' },
  { name: 'Long', value: '6' },
];

export const generateWorkout = async ( category: string, length: string, includeAbs: boolean ) => {
  const allExercises: Exercise[] = await fetchExercises();
  const filteredExercises: Exercise[] = [];
  
  allExercises.forEach((exercise) => {
    if (exercise.categories.includes(category)) {
      filteredExercises.push(exercise);
    }
  });

  const abWorkout: Exercise[] = [];

  if (includeAbs) {
    const abExercises: Exercise[] = [];

    allExercises.forEach((exercise) => {
      if (exercise.categories.includes('abs')) {
        abExercises.push(exercise);
      }
    });

    const shuffledAbExercises: Exercise[] = shuffle(abExercises);
    
    abWorkout.push(...shuffledAbExercises.slice(0, 2));
  }

  if (category === 'fullBody') {
    const chestExercises: Exercise[] = [];
    const armExercises: Exercise[] = [];
    const shoulderExercises: Exercise[] = [];
    const backExercises: Exercise[] = [];
    const legExercises: Exercise[] = [];

    allExercises.forEach((exercise) => {
      if (exercise.categories.includes('chest')) {
        chestExercises.push(exercise);
      }

      if (exercise.categories.includes('arms')) {
        armExercises.push(exercise);
      }

      if (exercise.categories.includes('shoulders')) {
        shoulderExercises.push(exercise);
      }

      if (exercise.categories.includes('back')) {
        backExercises.push(exercise);
      }

      if (exercise.categories.includes('legs')) {
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
    const workoutExercises = shuffledExercises.slice(0, Number(length));

    const workout = [ ...workoutExercises, ...abWorkout ].map((exercise) => {
      return randomVariant(exercise);
    });

    return workout;
  } else if (category === 'hiit') {
    const shuffledExercises: Exercise[] = shuffle(filteredExercises);
    const workoutexercises = shuffledExercises.slice(0, (Number(length) + 2));

    const workout = [...workoutexercises].map((exercise) => {
      return randomVariant(exercise);
    });

    return workout;
  } else {
    const shuffledExercises: Exercise[] = shuffle(filteredExercises);
    const workoutExercises = shuffledExercises.slice(0, Number(length));

    const workout = [ ...workoutExercises, ...abWorkout ].map((exercise) => {
      return randomVariant(exercise);
    });

    return workout;
  }
};
