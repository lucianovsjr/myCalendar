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
    const { datasHours, templateId } = req.body;

    const resDatas = datasHours.forEach(async (data) => {
      return await Appointment.create({
        date: data.date,
        provider_id: req.userId,
        template_id: templateId,
      });
    });

    res.json(resDatas);
  }
}

export default new AppointmentController();
