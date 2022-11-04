import 'express-async-errors';
import * as express from 'express';
import { errorMiddleware } from './Middlewares/ErrorMiddleware';
import { loginRouter } from './Routes/LoginRouter';
import { matchesRouter } from './Routes/MatchRouter';
import { teamRouter } from './Routes/TeamsRouter';
import { leaderBoardRouter } from './Routes/LeaderBoardRouter';

class App {
  // Atributos
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));
  }

  // Métodos privados
  private routes(): void {
    this.app.use(loginRouter);
    this.app.use(matchesRouter);
    this.app.use(teamRouter);
    this.app.use(leaderBoardRouter);
    this.app.use(errorMiddleware);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH'
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  // Métodos públicos
  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
