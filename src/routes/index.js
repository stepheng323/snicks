import { Router } from 'express';
import user from './api/user';
import product from './api/product';

const apiRouter = Router();

apiRouter.use('/api/v1/user', user);
apiRouter.use('/api/v1/product', product);
export default apiRouter;
