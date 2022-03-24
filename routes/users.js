const express = require('express');
const passport = require('passport');
const router = express.Router();
const user = require('../controllers/users')
const catchAsync = require('../utils/catchAsync');

router.route('/register')
    .get(user.renderRegister)
    .post(catchAsync(user.Register));

router.route('/login')
    .get(user.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.Login);
router.get('/logout', user.logout);
module.exports = router;