export enum WorkoutCategory {
  CHEST = 'CHEST',
  BACK = 'BACK',
  ARMS = 'ARMS',
  SHOULDERS = 'SHOULDERS',
  LEGS = 'LEGS',
  PUSH = 'PUSH',
  PULL = 'PULL',
  UPPER = 'UPPER',
  LOWER = 'LOWER',
  FULL_BODY = 'FULL_BODY',
  HIIT = 'HIIT',
}

export interface Set {
  reps: number
}

export interface ExerciseItem {
  id: string
  sets: Set[]
}

export interface Workout {
  _id?: string
  title: string
  category: WorkoutCategory
  exercises: ExerciseItem[]
}
