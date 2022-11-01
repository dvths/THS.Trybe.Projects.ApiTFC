import { ILogin, ILoginService } from '../Interfaces/ILoginService';
import User from '../database/models/User';
import { UnauthorizedError } from '../Errors/UnauthorizedError';

export class LoginService implements ILoginService {
  public async login(login: ILogin): Promise<any> {
    const user = await User.findOne({ where: { email: login.email } });
    if (!user || user.password !== login.password)
      throw new UnauthorizedError('Incorrect email or password');
  }
}
