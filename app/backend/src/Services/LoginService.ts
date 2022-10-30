import { ILogin, ILoginService } from '../Interfaces/ILoginService';
import { RequiredDataErrors } from '../Errors/RequiredDataErrors';
import { LoginRequiredData } from '../Types/LoginRequiredData';

export class LoginService implements ILoginService {
  public create(login: ILogin) {
    const requiredDataForLogin: LoginRequiredData = ['email', 'password'];
    for (const data of requiredDataForLogin) {
      if(!login[data]) throw new RequiredDataErrors(`All fields must be filled`);
    }
  }
}
