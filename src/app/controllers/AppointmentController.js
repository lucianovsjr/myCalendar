import Appointment from '../models/Appointment';

class AppointmentController {
  async show(req, res) {
    const appointments = await Appointment.findAll({
      where: { user_id: req.userId },
    });

    return res.json(appointments);
  }
}

export default new AppointmentController();
