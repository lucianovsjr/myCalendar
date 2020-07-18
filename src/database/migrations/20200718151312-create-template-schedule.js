module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('template_schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      service_time: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      office_hours_start: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      office_hours_end: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      provider_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('template_schedules');
  },
};
