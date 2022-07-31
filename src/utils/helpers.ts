import { Exercise } from '../models/exercise.model';

export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getBackgroundColor = (number: number) => {
  if (number % 2 !== 0) {
    return '#f2f2f2'
  }

  return '#fff'
};

export const fetchExercises = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }

  const response = await fetch('exercises.json', { headers });
  return response.json();
};

export const randomVariant = (exercise: Exercise) => {
  if (exercise.variants) {
    const shuffledVariants: string[] = shuffle(exercise.variants);
    return `${capitalize(shuffledVariants[0])} ${exercise.title}`
  } else {
    return exercise.title
  }
};

export const shuffle = (array: any[]) => {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
