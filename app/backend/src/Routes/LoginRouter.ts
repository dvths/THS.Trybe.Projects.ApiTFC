import { Router } from 'express';
import { LoginService } from '../Services/LoginService';
import { LoginController } from '../Controllers/LoginController';
import * as loginMiddleware from '../Middlewares/LoginMiddleware';

const loginService = new LoginService();
const loginController = new LoginController(loginService);
const router = Router();

router.post('/login', loginMiddleware.validateFields, (req, res) =>
  loginController.login(req, res));

router.get('/login/validate', (req, res) => loginController.validate(req, res));

export { router as loginRouter };
