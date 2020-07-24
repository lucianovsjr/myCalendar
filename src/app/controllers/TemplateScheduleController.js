import { parseISO } from 'date-fns';

import TemplateSchedule from '../models/TemplateSchedule';

class TemplateScheduleController {
  async index(req, res) {
    const template = await TemplateSchedule.findOne({
      where: { provider_id: req.userId },
    });

    return res.json(template);
  }

  async store(req, res) {
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
