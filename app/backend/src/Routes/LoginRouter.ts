import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
  if (!req.body.email) {
    res.status(400).json({ message: 'All fields must be filled' });
  }
});

export { router as loginRouter };
