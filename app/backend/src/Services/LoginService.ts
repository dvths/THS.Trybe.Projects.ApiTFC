import { ILogin, ILoginService } from '../Interfaces/ILoginService';
import { LoginRequiredData } from '../Types/LoginRequiredData';
import User from '../database/models/User';
import { RequiredDataErrors } from '../Errors/RequiredDataErrors';
import { ConflicDatatError } from '../Errors/ConflictDataErrors';

export class LoginService implements ILoginService {

  public async login(login: ILogin): Promise<any> {
    const requiredDataForLogin: LoginRequiredData = ['email', 'password'];
    for (const data of requiredDataForLogin) {
      if (!login[data])
        throw new RequiredDataErrors('All fields must be filled');
    }

    const loginExists = await User.findOne({ where: {email: login.email} });
    if (loginExists) throw new ConflicDatatError('User already registered!');
  }
}
