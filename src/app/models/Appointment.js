const { Model, DataTypes } = require('sequelize');

class appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: DataTypes.DATE,
        canceled_at: DataTypes.DATE,
        available: {
          type: DataTypes.VIRTUAL,
          get() {
            return !this.user_id;
          },
        },
        looseClient: DataTypes.STRING,
        timeRange: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: 'appointment',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
    this.belongsTo(models.schedule, {
      foreignKey: 'schedule_id',
      as: 'schedule',
    });
  }
}

export default appointment;
