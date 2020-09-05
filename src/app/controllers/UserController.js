import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, email, name, provider } = await User.create(req.body);

    return res.json({ id, email, name, provider });
  }

  async show(req, res) {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not exists' });
    }

    const { id, email, name, provider, fantasyName, profession } = user;
    console.log(id, email, name, provider, fantasyName, profession);

    return res.json({ id, email, name, provider, fantasyName, profession });
  }

  async update(req, res) {
    const { name, fantasyName, profession } = req.body;

    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(400).json({ error: 'User not exists' });
    }

    user.name = name;
    user.fantasyName = fantasyName;
    user.profession = profession;
    await user.save();

    return res.json({
      name: user.name,
      email: user.email,
    });
  }
}

export default new UserController();
