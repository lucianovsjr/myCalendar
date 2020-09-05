import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Appointment from '../models/Appointment';
import periodOfTime from '../mixins/periodOfTime';

class SelectScheduleMonthController {
  async index(req, res) {
    const { providerId } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: null, provider_id: providerId },
      order: ['date'],
    });

    const resDatas = [];
    let posicaoData = '';
    let posicaoDataFormat = '';
    let year = '';
    let month = '';
    let vacancies_total = 0;
    let vacancies_morning = 0;
    let vacancies_afternoon = 0;
    let vacancies_night = 0;

    for (const pos in appointments) {
      if (posicaoData !== format(appointments[pos].date, 'yyyyMM')) {
        if (posicaoData !== '') {
          resDatas.push({
            date: posicaoData,
            dateFormat: posicaoDataFormat,
            year,
            month,
            vacancies_total,
            vacancies_morning,
            vacancies_afternoon,
            vacancies_night,
          });
        }

        posicaoData = format(appointments[pos].date, 'yyyyMM');
        posicaoDataFormat = format(appointments[pos].date, 'MMM/yyyy', {
          locale: pt,
        });
        year = format(appointments[pos].date, 'yyyy');
        month = format(appointments[pos].date, 'MM');
        vacancies_total = 0;
        vacancies_morning = 0;
        vacancies_afternoon = 0;
        vacancies_night = 0;
      }

      switch (periodOfTime(appointments[pos].date)) {
        case 'dawn':
          vacancies_night++;
          break;
        case 'morning':
          vacancies_morning++;
          break;
        case 'afternoon':
          vacancies_afternoon++;
          break;
        case 'night':
          vacancies_night++;
          break;
      }

      vacancies_total++;
    }

    resDatas.push({
      date: posicaoData,
      dateFormat: posicaoDataFormat,
      year,
      month,
      vacancies_total,
      vacancies_morning,
      vacancies_afternoon,
      vacancies_night,
    });

    res.json(resDatas);
  }
}

export default new SelectScheduleMonthController();
