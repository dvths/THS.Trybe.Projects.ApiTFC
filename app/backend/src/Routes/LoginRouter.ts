import { Router } from 'express';
import { LoginController } from '../Controllers/LoginController';

const router = Router();
const loginController = new LoginController();

router.post('/login', loginController.create);

export { router as loginRouter };
