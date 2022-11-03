import {Router} from 'express';
import { MatchController } from '../Controllers/MatchController';
import { MatchService } from '../Services/MatchService';

const matchService = new MatchService();
const matchController = new MatchController(matchService);
const router = Router();


router.get('/matches', (_req, res) => matchController.getAll(_req, res));

export {router as matchesRouter};
