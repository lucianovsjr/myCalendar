const { Model, DataTypes } = require('sequelize');

class appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: DataTypes.DATE,
        canceled_at: DataTypes.DATE,
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
    this.belongsTo(models.template_schedule, {
      foreignKey: 'template_id',
      as: 'template',
    });
  }
}

export default appointment;
