import { ILogin, ILoginService } from '../Interfaces/ILoginService';
import User from '../database/models/User';
import { ConflicDatatError } from '../Errors/ConflictDataErrors';

export class LoginService implements ILoginService {
  public async login(login: ILogin): Promise<any> {

    const loginExists = await User.findOne({ where: { email: login.email } });
    if (loginExists) throw new ConflicDatatError('User already registered!');
  }
}
