import { parseISO } from 'date-fns';

import TemplateSchedule from '../models/TemplateSchedule';

class TemplateScheduleController {
  async show(req, res) {
    const templates = await TemplateSchedule.findAll({
      where: { provider_id: req.userId },
    });

    return res.json(templates);
  }

  async store(req, res) {
    const { service_time, office_hours_start, office_hours_end } = req.body;

    const templateExists = await TemplateSchedule.findOne({
      where: { provider_id: req.userId },
    });

    const datas = {
      service_time,
      office_hours_start: parseISO(office_hours_start),
      office_hours_end: parseISO(office_hours_end),
      provider_id: req.userId,
    };

    const template = !templateExists
      ? await TemplateSchedule.create(datas)
      : await templateExists.update(datas);

    return res.json(template);
  }
}

export default new TemplateScheduleController();
