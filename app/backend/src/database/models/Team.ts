import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';
import Match from './Match';

export default class Team extends Model {
  id: number;
  teamName: string;
}

Team.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: STRING,
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'team',
    timestamps: false,
  },
);

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeMatch' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayMatch' });
