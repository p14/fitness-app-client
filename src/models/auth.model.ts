export interface TokenData {
  AuthenticationResult: any
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const initialLoginData = {
  email: '',
  password: '',
}

export const initialRegisterData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}
