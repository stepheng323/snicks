import { Router } from 'express';
import user from './api/user';

const apiRouter = Router();

apiRouter.use('/api/v1/user', user);
export default apiRouter;
