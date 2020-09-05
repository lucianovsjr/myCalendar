import Appointment from '../models/Appointment';
import User from '../models/User';

class MyAppointmentController {
  async show(req, res) {
    const appointments = await Appointment.findAll({
      attributes: ['id', 'date', 'canceled_at', 'provider_id'],
      where: { user_id: req.userId },
      include: {
        model: User,
        as: 'provider',
        attributes: ['name'],
      },
      order: ['date'],
    });

    res.json(appointments);
  }
}

export default new MyAppointmentController();
