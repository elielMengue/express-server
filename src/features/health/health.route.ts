// routes de health check

import { Router, type Request, type Response } from 'express';

const router = Router();
 router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK' });
});
export default router;