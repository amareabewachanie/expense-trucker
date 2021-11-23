const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ email: 'Email is not found' });
    }
    /**
     * Check password
     */
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      /**
       * user matched sign the token
       */

      // payload
      const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      const jwttoken = jwt.sign(payload, process.env.secret, {
        expiresIn: 3600,
      });
      return res.status(200).json({ user: user, token: `Bearer ${jwttoken}` });
    }
    return res.status(400).json({ password: 'Incorrect password' });
  } catch (error) {
    return res.status(500).json(error);
  }
};
lo;
exports.register = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ confirmPassword: 'PLease confirm your password' });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        email: 'Email Already exists',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await new User({
      email,
      firstName,
      lastName,
      password: hash,
    }).save();
    res.status(201).json({
      newUser,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
