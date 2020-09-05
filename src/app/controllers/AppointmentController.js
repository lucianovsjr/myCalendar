import { parseISO, set, isBefore, addDays, addMinutes } from 'date-fns';

import Appointment from '../models/Appointment';

class AppointmentController {
  async show(req, res) {
    const { templateId } = req.query;

    const appointments = await Appointment.findAll({
      where: { provider_id: req.userId, template_id: templateId },
    });

    res.json(appointments);
  }

  async store(req, res) {
    const { timeRange, scheduleId } = req.body;
    const dateStart = parseISO(req.body.dateStart);
    const dateEnd = parseISO(req.body.dateEnd);
    const hoursStart = parseISO(req.body.hoursStart);
    const hoursEnd = parseISO(req.body.hoursEnd);

    //
    const datasHours = [];
    let hourStartDayCard = set(dateStart, {
      hours: hoursStart.getHours(),
      minutes: hoursStart.getMinutes(),
      seconds: 0,
      milliseconds: 0,
    });
    let hourEndDayCard = set(dateStart, {
      hours: hoursEnd.getHours(),
      minutes: hoursEnd.getMinutes(),
      seconds: 0,
      milliseconds: 1,
    });
    let hourCard = hourStartDayCard;

    while (isBefore(hourStartDayCard, dateEnd)) {
      while (isBefore(hourCard, hourEndDayCard)) {
        datasHours.push({
          date: hourCard,
        });

        hourCard = addMinutes(hourCard, timeRange);
      }

      hourStartDayCard = addDays(hourStartDayCard, 1);
      hourEndDayCard = addDays(hourEndDayCard, 1);
      hourCard = hourStartDayCard;
    }

    const resDatas = datasHours.forEach(async (data) => {
      return await Appointment.create({
        date: data.date,
        provider_id: req.userId,
        schedule_id: scheduleId,
      });
    });

    res.json(resDatas);
  }
}

export default new AppointmentController();
