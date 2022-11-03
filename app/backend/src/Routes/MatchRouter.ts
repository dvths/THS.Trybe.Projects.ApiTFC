import {Router} from 'express';
import { MatchController } from '../Controllers/MatchController';
import { MatchService } from '../Services/MatchService';
const router = Router();

const matchService = new MatchService();
const matchController = new MatchController(matchService);

router.get('/matches', (_req, res) => matchController.get(_req, res));

export {router as matchesRouter};
