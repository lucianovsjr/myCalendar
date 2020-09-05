import { parseISO } from 'date-fns';

import Schedule from '../models/Schedule';

class ScheduleController {
  async show(req, res) {
    const schedules = await Schedule.findAll({
      where: { provider_id: req.userId },
      order: [['created_at', 'DESC']],
    });

    res.json(schedules);
  }

  async store(req, res) {
    const { dateStart, dateEnd, hoursStart, hoursEnd, timeRange } = req.body;

    const data = {
      date_start: parseISO(dateStart),
      date_end: parseISO(dateEnd),
      hours_start: parseISO(hoursStart),
      hours_end: parseISO(hoursEnd),
      time_range: timeRange,
      provider_id: req.userId,
    };

    const schedule = await Schedule.create(data);

    res.json(schedule);
  }
}

export default new ScheduleController();
