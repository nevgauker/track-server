const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup',  async (req, res) =>{
  const { email, password } = req.body;

  try {
    const user = new User ({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    return res.status(200).send({ token });

  }catch(err) {
      return res.status(404).send(err.message);
  }
});

router.post('/signin',  async (req, res) =>{
  const { email, password } = req.body;
  if (!email || !password){
    return res.status(401).send({ error: 'Must ptovide email and password.' })
  }
  const user = await User.findOne({ email });
  if (!user){
    return res.status(402).send({ error: 'Invalid email or password.' })
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    return res.status(200).send({ token });
  } catch (err) {
      return res.status(422).send({ error: 'Invalid email or password.'  });
  } 
});


module.exports = router;
