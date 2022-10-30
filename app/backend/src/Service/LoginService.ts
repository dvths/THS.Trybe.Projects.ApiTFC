interface ILogin {
  email: string
  password: string
}

type LoginRequiredData = ['email', 'password'];

export class LoginService {
  public create(login: ILogin) {
    const requiredDataForLogin: LoginRequiredData = ['email', 'password'];
    for (const data of requiredDataForLogin) {
      if(!login[data]) throw new Error('All fields must be filled');
    }
  }
}
