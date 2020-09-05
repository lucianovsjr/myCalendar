import { Router } from 'express';

import UserController from './app/controllers/UserController';
import ProviderController from './app/controllers/ProviderController';
import SessionController from './app/controllers/SessionController';
import AppointmentController from './app/controllers/AppointmentController';
import SelectAppointmentController from './app/controllers/SelectAppointmentController';
// import TemplateScheduleController from './app/controllers/TemplateScheduleController';
import MyAppointmentController from './app/controllers/MyAppointmentsController';
import ScheduleController from './app/controllers/ScheduleController';
import SelectScheduleMonthController from './app/controllers/SelectScheduleMonthController';
import SelectAppointmentMonthController from './app/controllers/SelectAppointmentMonthController';
import EventsController from './app/controllers/EventsController';
import MyScheduleMonthController from './app/controllers/MyScheduleMonthController';
import MyAppointmentMonthController from './app/controllers/MyAppointmentMonthController';

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

routes.get('/my-schedules-months', MyScheduleMonthController.show);

routes.get('/my-appointments-months', MyAppointmentMonthController.index);
routes.put('/my-appointments-months', MyAppointmentMonthController.update);
routes.post('/my-appointments-months', MyAppointmentMonthController.store);
routes.get('/my-appointments-months-show', MyAppointmentMonthController.show);

routes.get('/my-appointments', MyAppointmentController.show);

// show somente um, index todos
// routes.get('/templates', TemplateScheduleController.show);
// routes.post('/templates', TemplateScheduleController.store);

routes.get('/schedules', ScheduleController.show);
routes.post('/schedules', ScheduleController.store);

routes.get('/select-schedule-month', SelectScheduleMonthController.index);

routes.get(
  '/select-appointments-month',
  SelectAppointmentMonthController.index
);
routes.put(
  '/select-appointments-month',
  SelectAppointmentMonthController.update
);

routes.post('/events', EventsController.store);
routes.get('/events/:scheduleId', EventsController.show);
routes.get('/events/edit/:id', EventsController.index);
routes.put('/events/edit/:id', EventsController.update);
routes.delete('/events/edit/:id', EventsController.delete);

export default routes;
