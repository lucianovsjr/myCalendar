import Sequelize from 'sequelize';

import dbConfig from '../config/database';

import User from '../app/models/User';

const models = [User];

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

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
