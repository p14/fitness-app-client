export interface TokenData {
  AuthenticationResult: any
}

export interface LoginData {
  username: string
  password: string
}

export interface RegisterData {
  firstName: string
  lastName: string
  username: string
  password: string
}

export const initialLoginData = {
  username: '',
  password: '',
}

export const initialRegisterData = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
}
