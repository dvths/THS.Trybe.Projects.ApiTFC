import { Router } from 'express';
import { MatchController } from '../Controllers/MatchController';
import { MatchService } from '../Services/MatchService';
import * as loginMiddleware from '../Middlewares/LoginMiddleware';
import matchMiddleware from  '../Middlewares/MatchMiddleware';

const matchService = new MatchService();
const matchController = new MatchController(matchService);
const router = Router();

router.get('/matches', (req, res) => matchController.getAll(req, res));

router.post('/matches', loginMiddleware.authentication, matchMiddleware, (req, res) =>
  matchController.create(req, res),
);

router.patch('/matches/:id', (req, res) => matchController.update(req, res));

router.patch('/matches/:id/finish', (req, res) => matchController.finished(req, res));


export { router as matchesRouter };
