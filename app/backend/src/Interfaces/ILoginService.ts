export interface ILogin {
  email: string
  password: string
}

export interface ILoginService {
  create(user: ILogin): Promise<any>
}
