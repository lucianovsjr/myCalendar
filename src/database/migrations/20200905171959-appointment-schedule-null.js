module.exports = {
  up: async (queryInterface, sequelize) => {
    await queryInterface.changeColumn(
      'appointments',
      'schedule_id',
      sequelize.INTEGER,
      {
        allowNull: true,
      }
    );
  },

  down: async (queryInterface, sequelize) => {
    await queryInterface.changeColumn(
      'appointments',
      'schedule_id',
      sequelize.INTEGER,
      {
        allowNull: false,
      }
    );
  },
};
