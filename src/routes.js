import { Router } from 'express';

import UserController from './app/controllers/UserController';
import ProviderController from './app/controllers/ProviderController';
import SessionController from './app/controllers/SessionController';
import AppointmentController from './app/controllers/AppointmentController';
import SelectAppointmentController from './app/controllers/SelectAppointmentController';
import TemplateScheduleController from './app/controllers/TemplateScheduleController';
import MyAppointmentController from './app/controllers/MyAppointmentsController';

import middlewareAuth from './app/middlewares/auth';

const routes = Router();

routes.post('/session', SessionController.store);
routes.post('/users', UserController.store);

routes.use(middlewareAuth);

routes.get('/users', UserController.show);
routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.show);

routes.get('/appointments', AppointmentController.show);
routes.post('/appointments', AppointmentController.store);

routes.get('/select-appointments', SelectAppointmentController.show);
routes.put('/select-appointments', SelectAppointmentController.update);

routes.get('/my-appointments', MyAppointmentController.show);

routes.get('/templates', TemplateScheduleController.show);
routes.post('/templates', TemplateScheduleController.store);

export default routes;
