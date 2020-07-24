module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('appointments', 'template_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'template_schedules',
        key: 'id',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('appointments', 'template_id');
  },
};
