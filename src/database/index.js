import Sequelize from 'sequelize';

import dbConfig from '../config/database';

import User from '../app/models/User';
import Appointment from '../app/models/Appointment';
import TemplateSchedule from '../app/models/TemplateSchedule';

const models = [User, Appointment, TemplateSchedule];

class Database {
  constructor() {
    this.init();
  }

  async init() {
    this.connection = new Sequelize(dbConfig);

    try {
      await this.connection.authenticate();
    } catch (error) {
      console.error('Unable to connect to the database', error);
    }

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
