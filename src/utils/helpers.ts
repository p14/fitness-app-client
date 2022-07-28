import { Exercise } from '../models/exercise.model';

export const capitalizeFirstLetter = (string: string) => {
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
    return `${capitalizeFirstLetter(shuffledVariants[0])} ${exercise.name}`
  } else {
    return exercise.name
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
