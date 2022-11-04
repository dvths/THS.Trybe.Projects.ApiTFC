import User from '../../database/models/User';
import { IUser, IUserCredentials } from '../../Interfaces/User/IUser';

export class LoginRepository {
  constructor(private _model = User) {}

  public async getByEmail(userCredentials: IUserCredentials): Promise<IUser | null> {
    return await this._model.findOne({
      where: { email: userCredentials.email },
    });
  }
}
