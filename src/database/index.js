import Sequelize from 'sequelize';

import dbConfig from '../config/database';

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
  }
}

export default new Database();
