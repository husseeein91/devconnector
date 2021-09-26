const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')
const config = require('config')


router.get('/', auth, async (req, res)=>{
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (e) {
    console.log(e.message);
    res.status(500).send('Server Error')
  }
})

router.post('/', [
  check('email', 'Email Is Required and Must be an Email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array()})
  }

  // console.log(req.body);
  const { email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if (!user) {
      // console.log(user);
      return res.status(400).json({errors: [{msg: "Wrong Email OR Password"}]});
    }


    const isMatched = await bcrypt.compare(password, user.password)

    if (!isMatched) {
      return res.status(400).json({errors: [{msg: "Wrong Email OR Password"}]});
    }


    const payload = {
      user:{
        id: user.id
      }
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {expiresIn:360000},
      (err, token)=>{
      if (err) throw err;
      res.json({token});
    })

    // res.status(200).send('User regesterd sussfully');

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }

})

module.exports = router;
