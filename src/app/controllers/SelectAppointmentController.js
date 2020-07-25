import Appointment from '../models/Appointment';

class SelectAppointmentController {
  async show(req, res) {
    const { providerId: provider_id } = req.query;

    const appointments = await Appointment.findAll({
      attributes: ['id', 'date', 'canceled_at'],
      where: { provider_id },
    });

    res.json(appointments);
  }
}

export default new SelectAppointmentController();
