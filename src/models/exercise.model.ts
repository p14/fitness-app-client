export interface Exercise {
  name: string
  categories: string[]
  variants?: string[]
}

export interface CustomizedExercise {
  name: string
  categories: string[]
  variants?: string[]
  selectedVariant?: string
}
