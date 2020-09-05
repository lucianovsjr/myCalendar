import { Op } from 'sequelize';
import { endOfMonth, format, startOfDay } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Appointment from '../models/Appointment';

import timeDistance from '../mixins/timeDistance';

class SelectAppointmentMonthController {
  async index(req, res) {
    const { providerId = req.userId, year, month } = req.query;

    const dateToday = new Date();

    const dateStart =
      month - 1 !== dateToday.getMonth()
        ? new Date(year, month - 1, 1)
        : dateToday;
    const dateEnd = endOfMonth(dateStart);

    const appointments = await Appointment.findAll({
      attributes: ['id', 'date', 'canceled_at', 'user_id', 'looseClient'],
      where: {
        date: {
          [Op.between]: [dateStart, dateEnd],
        },
        provider_id: providerId,
      },
      order: ['date'],
    });

    const timeDistanceNow = startOfDay(new Date());

    const resData = appointments.map((appointment) => {
      let status = 'available';

      if (appointment.user_id === req.userId)
        if (appointment.canceled_at) status = 'canceled';
        else status = 'marked';
      else if (appointment.user_id !== null || appointment.looseClient !== '')
        status = 'unavailable';

      return {
        ...appointment.dataValues,
        dateFormat: format(appointment.date, 'dd/MM/yyyy'),
        hourFormat: format(appointment.date, 'HH:mm'),
        dayWeek: format(appointment.date, 'EEEE', { locale: pt }),
        timeDistance: timeDistance(
          timeDistanceNow,
          startOfDay(appointment.date)
        ),
        status,
      };
    });

    res.json(resData);
  }

  async update(req, res) {
    const { id, newStatus } = req.body;

    const appointment = await Appointment.findByPk(id);

    if (!appointment) res.status(401).json({ msg: 'Appoint not find' });

    if (newStatus === 'marked')
      await appointment.update({ user_id: req.userId });
    else if (newStatus === 'canceled')
      await appointment.update({ user_id: null, canceled_at: new Date() });

    res.json(appointment);
  }
}

export default new SelectAppointmentMonthController();
