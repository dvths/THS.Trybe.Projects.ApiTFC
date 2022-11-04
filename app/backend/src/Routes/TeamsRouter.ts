import { Router } from 'express';
import { TeamService } from '../Services/TeamService';
import { TeamController } from '../Controllers/TeamController';

const router = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

router.get('/teams', (req, res) => teamController.getAll(req, res));
router.get('/teams/:id', (req, res) => teamController.getById(req, res));

export { router as teamRouter}
