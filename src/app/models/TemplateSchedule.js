const { Model, DataTypes } = require('sequelize');

class template_schedule extends Model {
  static init(sequelize) {
    super.init(
      {
        service_time: DataTypes.INTEGER,
        office_hours_start: DataTypes.DATE,
        office_hours_end: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'template_schedule',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'provider_id' });
  }
}

export default template_schedule;
