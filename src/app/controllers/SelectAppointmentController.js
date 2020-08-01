import Appointment from '../models/Appointment';

class SelectAppointmentController {
  async show(req, res) {
    const { providerId: provider_id } = req.query;

    const appointments = await Appointment.findAll({
      attributes: ['id', 'date', 'canceled_at', 'available', 'user_id'],
      where: { provider_id },
      order: ['date'],
    });

    res.json(appointments);
  }

  async update(req, res) {
    const { appointmentId } = req.body.params;

    const appointment = await Appointment.findByPk(appointmentId);

    if (appointment) {
      appointment.user_id = req.userId;
      appointment.save();
    }

    res.json(appointment);
  }
}

export default new SelectAppointmentController();
