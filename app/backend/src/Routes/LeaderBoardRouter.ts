import { Router } from 'express';

import { LeaderBoardController } from '../Controllers/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get('/leaderboard', (req, res) =>
  leaderBoardController.getAll(req, res)
);

router.get('/leaderboard/home', (req, res) =>
  leaderBoardController.getHome(req, res)
);

router.get('/leaderboard/away', (req, res) =>
  leaderBoardController.getAway(req, res)
);

export { router as leaderBoardRouter };
