import Team from '../../database/models/Team';

export interface ITeamService {
  getById(id: string): Promise<Team>
  getAll(): Promise<Team[]>
}
