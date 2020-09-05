const { Model, DataTypes } = require('sequelize');

class Event extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        week: DataTypes.STRING,
        date: DataTypes.DATE,
        hoursStart: DataTypes.DATE,
        hoursEnd: DataTypes.DATE,
        allDay: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'event',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.schedule, { foreignKey: 'scheduleId' });
  }
}

export default Event;
