import { Router } from 'express';
import { LoginService } from '../Services/LoginService';
import { LoginController } from '../Controllers/LoginController';

const router = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

router.post('/login', (req, res) => loginController.create(req, res));

export { router as loginRouter };
