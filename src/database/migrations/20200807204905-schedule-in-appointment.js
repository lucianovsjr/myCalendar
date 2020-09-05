module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('appointments', 'schedule_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'schedules',
        key: 'id',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('appointments', 'schedule_id');
  },
};
