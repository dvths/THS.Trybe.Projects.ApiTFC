import { Router } from 'express';
import { LoginController } from '../Controllers/LoginController';

const router = Router();
const loginController = new LoginController();

router.post('/login', (req, res) => loginController.create(req, res));

export { router as loginRouter };
