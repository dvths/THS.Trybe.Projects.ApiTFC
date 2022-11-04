import Team from '../../database/models/Team';

export class TeamRepository {
  constructor(private _model = Team) {}

  public async getAll(): Promise<Team[]> {
    return await this._model.findAll();
  }

  public async getById(id: string): Promise<Team | null> {
    return await this._model.findByPk(id);
  }
}
