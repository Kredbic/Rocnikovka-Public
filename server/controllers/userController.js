const User = require('../models/User');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Register new user
exports.registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', payload: { user_id: user._id } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Get user by ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.status(200).send({ message: 'User found!', payload: user });
    }
    res.status(404).send({ message: 'User not found!' });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const data = {
      contactName: req.body.contactName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      phone: req.body.phone,
      street: req.body.street,
      apartment: req.body.apartment,
      region: req.body.region,
      city: req.body.city,
      zipCode: req.body.zipCode,
      searchAddress: req.body.searchAddress,
    };

    const user = await User.findByIdAndUpdate(req.params.id, data);
    if (user) return res.status(200).send({ message: 'User updated!', payload: user });
    res.status(400).send({ message: 'Wrong input!' });
  } catch (err) {
    res.status(500).send(err);
  }
};
