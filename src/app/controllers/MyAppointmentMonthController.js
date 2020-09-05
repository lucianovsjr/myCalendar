import { addMinutes, parseISO } from 'date-fns';

import Appointment from '../models/Appointment';
import Schedule from '../models/Schedule';
import User from '../models/User';

import SelectAppointmentMonthController from './SelectAppointmentMonthController';

class MyAppointmentMonthController {
  async index(req, res) {
    req.query = {
      ...req.query,
      providerId: req.userId,
    };

    const resJson = await SelectAppointmentMonthController.index(req, res);

    res.json(resJson);
  }

  async show(req, res) {
    const { id } = req.query;

    const appointment = await Appointment.findByPk(id, {
      attributes: ['id', 'date', 'looseClient', 'timeRange'],
      include: [
        {
          model: Schedule,
          as: 'schedule',
          attributes: ['time_range'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    const scheduleTimeRange = appointment.schedule
      ? appointment.schedule.time_range
      : 0;
    const timeRange =
      appointment.timeRange > 0 ? appointment.timeRange : scheduleTimeRange;

    const resData = {
      id,
      looseClient: appointment.looseClient,
      userName: appointment.user ? appointment.user.name : null,
      date: appointment.date,
      hoursStart: appointment.date,
      hoursEnd: addMinutes(appointment.date, timeRange),
    };

    res.json(resData);
  }

  async update(req, res) {
    const { id, looseClient, dateAdjusted, timeRange } = req.body;

    const appointment = await Appointment.findByPk(id);

    if (appointment) {
      appointment.looseClient = looseClient;
      appointment.date = parseISO(dateAdjusted);
      appointment.timeRange = timeRange;
      appointment.save();

      res.json(appointment);
    }

    res.status(400).json({ error: 'Appointment not find' });
  }

  async store(req, res) {
    const { looseClient, dateAdjusted, timeRange } = req.body;

    const appointment = await Appointment.create({
      looseClient,
      provider_id: req.userId,
      date: parseISO(dateAdjusted),
      timeRange,
    });

    res.json(appointment);
  }
}

export default new MyAppointmentMonthController();
