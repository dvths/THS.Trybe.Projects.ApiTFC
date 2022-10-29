interface ILogin {
  email: string
  password: string
}
export class LoginService {
  public create(login: ILogin) {
    if(!login.email) return { message: 'All fields must be filled' };
    if(!login.password) return { message: 'All fields must be filled' };

  }
}
