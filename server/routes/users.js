var express = require('express');
var router = express.Router();
const {User} = require('../models');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

/* GET logged in user */
router.get('/me', auth, async function(req, res, next) {
    try {
      let user = await User.findByPk(req.user.id, {
        attributes: ['id', 'name']
      });
      return res.data(user);
    }catch(err){
      next(err);
    }
});

module.exports = router;
