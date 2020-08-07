import { parseISO } from 'date-fns';

import TemplateSchedule from '../models/TemplateSchedule';

class TemplateScheduleController {
  async show(req, res) {
    const template = await TemplateSchedule.findAll({
      where: { provider_id: req.userId },
      order: [['created_at', 'DESC']],
    });

    return res.json(template);
  }

  async store(req, res) {
    const { serviceTime, hourStart, hourEnd } = req.body;

    const datas = {
      service_time: serviceTime,
      office_hours_start: parseISO(hourStart),
      office_hours_end: parseISO(hourEnd),
      provider_id: req.userId,
    };

    const template = await TemplateSchedule.create(datas);

    return res.json(template);
  }

  async update(req, res) {
    const { serviceTime, dateStart, dateEnd } = req.body;

    const templateExists = await TemplateSchedule.findOne({
      where: { provider_id: req.userId },
    });

    const datas = {
      service_time: serviceTime,
      office_hours_start: parseISO(dateStart),
      office_hours_end: parseISO(dateEnd),
      provider_id: req.userId,
    };

    const template = !templateExists
      ? await TemplateSchedule.create(datas)
      : await templateExists.update(datas);

    return res.json(template);
  }
}

export default new TemplateScheduleController();
