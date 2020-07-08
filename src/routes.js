import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import middlewareAuth from './app/middlewares/auth';

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(middlewareAuth);

routes.get('/users', UserController.show);

export default routes;
