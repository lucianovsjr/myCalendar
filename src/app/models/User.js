import { Model, DataTypes } from 'sequelize';

import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: DataTypes.STRING,
        name: DataTypes.STRING,
        provider: DataTypes.BOOLEAN,
        password_hash: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
      },
      {
        sequelize,
        modelName: 'User',
      }
    );

    this.addHook('beforeSave', (user) => {
      if (user.password) {
        user.password_hash = bcrypt.hashSync(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compareSync(password, this.password_hash);
  }
}

export default User;
