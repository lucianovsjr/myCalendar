import Appointment from '../models/Appointment';

class MyAppointmentController {
  async show(req, res) {
    const appointments = await Appointment.findAll({
      attributes: ['id', 'date', 'canceled_at', 'provider_id'],
      where: { user_id: req.userId },
      order: ['date'],
    });

    res.json(appointments);
  }
}

export default new MyAppointmentController();
