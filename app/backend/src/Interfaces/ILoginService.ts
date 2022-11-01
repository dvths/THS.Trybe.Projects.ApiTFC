export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginService {
  login(login: ILogin): Promise<any>
}
