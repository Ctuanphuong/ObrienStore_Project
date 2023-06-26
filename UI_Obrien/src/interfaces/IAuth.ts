export interface LoginUser {
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export interface RegisterUser extends LoginUser {
  name: string
  phone: number
  confirmPassword: string
}

export interface LoggedUser {
  _id: string
  email: string
  role: string
}
