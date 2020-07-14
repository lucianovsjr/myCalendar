import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'User not exists' });
    }

    if (!user.checkPassword(password)) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    const token = jwt.sign({ id }, authConfig.secretKey, {
      algorithm: authConfig.algorithm,
      expiresIn: authConfig.expiresIn,
    });

    return res.json({ user: { email, name }, token });
  }
}

export default new SessionController();
