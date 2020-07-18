import Appointment from '../models/Appointment';

class AppointmentController {
  async show(req, res) {
    const appointments = await Appointment.findAll({
      where: { user_id: req.userId },
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const { date, provider_id } = req.body;
  }
}

export default new AppointmentController();
