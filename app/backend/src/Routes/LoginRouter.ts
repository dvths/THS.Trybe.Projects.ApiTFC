import { Router } from 'express';
import { LoginService } from '../Services/LoginService';
import { LoginController } from '../Controllers/LoginController';
import { validateBody } from '../Middlewares/ValidateBody';

const router = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

router.post('/login', validateBody(['email', 'password']), (req, res) =>
  loginController.login(req, res)
);

export { router as loginRouter };
