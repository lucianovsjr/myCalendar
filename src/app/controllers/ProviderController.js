import User from '../models/User';

class ProviderController {
  async show(req, res) {
    const providers = await User.findAll({
      attributes: ['id', 'name'],
      where: { provider: true },
    });

    res.json(providers);
  }
}

export default new ProviderController();
