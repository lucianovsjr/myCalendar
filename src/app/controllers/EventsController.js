import Event from '../models/Event';

const weekStr = (week) =>
  week.reduce(
    (accumulator, currentValue) =>
      accumulator + Number(currentValue).toString(),
    ''
  );

class EventsController {
  async store(req, res) {
    const {
      name,
      week,
      date,
      hoursStart,
      hoursEnd,
      allDay,
      scheduleId,
    } = req.body;

    const event = await Event.create({
      name,
      week: weekStr(week),
      date,
      hoursStart,
      hoursEnd,
      allDay,
      scheduleId,
    });

    // Processar appointments

    res.json(event);
  }

  async show(req, res) {
    const events = await Event.findAll({
      where: { scheduleId: req.params.scheduleId },
    });

    const resData = [];
    if (events)
      for (const posEvent in events) {
        resData.push({
          id: events[posEvent].id,
          name: events[posEvent].name,
          week: events[posEvent].week
            .split('')
            .reduce(
              (accumulator, currentValue) => [
                ...accumulator,
                !!Number(currentValue),
              ],
              []
            ),
          date: events[posEvent].date,
          hoursStart: events[posEvent].hoursStart,
          hoursEnd: events[posEvent].hoursEnd,
          allDay: events[posEvent].allDay,
          scheduleId: events[posEvent].scheduleId,
        });
      }

    res.json(resData);
  }

  async index(req, res) {
    const event = await Event.findByPk(req.params.id);

    res.json(event);
  }

  async update(req, res) {
    const event = await Event.update(
      {
        ...req.body,
        week: weekStr(req.body.week),
      },
      {
        where: { id: req.params.id },
      }
    );

    res.json(event);
  }

  async delete(req, res) {
    await Event.destroy({ where: { id: req.params.id } });

    res.json({});
  }
}

export default new EventsController();
