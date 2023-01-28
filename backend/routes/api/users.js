const express = require('express')
const router = express.Router();


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    // //Penny adds test
    // check('firstname')
    //   .exists({ checkFalsy: true })
    //   .withMessage('require firstname.'),

    // check('lastname')
    //   .exists({ checkFalsy: true })
    //   .withMessage('require lastname.'),

    handleValidationErrors
  ];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, username, firstname, lastname } = req.body;
      const user = await User.signup({ email, username, password, firstname, lastname });

      await setTokenCookie(res, user);

      return res.status(400).json({
        user: user
      });
    }
  );




module.exports = router;
