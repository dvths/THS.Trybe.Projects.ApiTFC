import User from '../../database/models/User';
import { IUser } from '../../Interfaces/User/IUser';

export class LoginRepository {
  constructor(private _model = User) {}

  public async getByEmail(user: IUser): Promise<IUser | null> {
    return await this._model.findOne({
      where: { email: user.email },
    });
  }
}
