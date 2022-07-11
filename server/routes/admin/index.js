var express = require('express');
const path = require('path');
const {Admin} = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminAuth = require('../../middleware/adminAuth');
var router = express.Router();

router.post('/auth_check', async function(req, res, next){
  try {
    await req.validate(req.body, {
        username: 'required',
        password: 'required'
    });
    const {username, password} = req.body;
    const user = await Admin.findOne({
        where: {
            username: username
        }
    });
    if(!user){
        return res.fail(null, 'Invalid email and password');
    }
    let check = await bcrypt.compare(password, user.password);
    if(!check){
        return res.fail(null, 'Invalid email and password');
    }
     // correct credential
    let data = {id: user.id, name: user.name};
    let token = jwt.sign(data, process.env.SECRET_KEY, {
        expiresIn: "1h",
    });
    return res.data({
        token: token,
        user: data
    });
  }catch(err){
    console.log(err);
    next(err);
  }
});

router.use('/products', adminAuth, require('./products'));
router.use('/users', adminAuth, require('./users'));
router.use('/settings', adminAuth, require('./settings'));

module.exports = router;