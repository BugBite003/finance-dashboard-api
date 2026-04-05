const User = require('../models/User.js');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updates = req.body;

    if (updates.password) {
      return res.status(400).json({ message: 'Use auth register for password changes' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      select: '-password',
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  updateUser,
};
