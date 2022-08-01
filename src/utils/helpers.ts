export const capitalize = (string: string) => {
  const stringWords = string.split(' ').map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return stringWords.join(' ');
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
