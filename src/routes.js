import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AppointmentController from './app/controllers/AppointmentController';

import middlewareAuth from './app/middlewares/auth';

const routes = Router();

routes.post('/session', SessionController.store);
routes.post('/users', UserController.store);

routes.use(middlewareAuth);

routes.get('/users', UserController.show);
routes.put('/users', UserController.update);

routes.get('/appointments', AppointmentController.show);

export default routes;
