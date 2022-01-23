import { Router, Response, Request } from 'express';
import { createToken } from './login.service';

const router = Router();

router.route('/').post(async (req: Request, res: Response) => {
  const token = await createToken(req.body);

  res.status(200).json({ token });
});

export default router;
