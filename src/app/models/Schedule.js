const { Model, DataTypes } = require('sequelize');

export default class schedule extends Model {
  static init(sequelize) {
    super.init(
      {
        date_start: DataTypes.DATE,
        date_end: DataTypes.DATE,
        hours_start: DataTypes.DATE,
        hours_end: DataTypes.DATE,
        time_range: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: 'schedule',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'provider_id' });
  }
}
