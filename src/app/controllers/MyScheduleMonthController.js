import SelectScheduleMonthController from './SelectScheduleMonthController';

class MyScheduleMonthController {
  async show(req, res) {
    req.query = {
      providerId: req.userId,
    };

    const resJson = await SelectScheduleMonthController.index(req, res);

    res.json(resJson);
  }
}

export default new MyScheduleMonthController();
