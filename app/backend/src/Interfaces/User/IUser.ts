export interface IUserCredentials {
  email: string
  password: string
}

export interface IUser extends IUserCredentials {
  id: number
  username: string
  role: string
}
