var express = require('express');
var router = express.Router();
const {User, Token} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {randomString} = require('../helpers/utils');

// check user
router.post('/check', async function(req, res, next) {
    try {
        await req.validate(req.body, {
            email: 'required|email',
            password: 'required'
        });
        const {email, password} = req.body;
        const user = await User.findOne({
            where: {
                email: email
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
            expiresIn: "1d",
        });
        return res.data({
            token: token,
            user: data
        });
      }catch(err){
        next(err);
      }
});


// check admin
router.post('/admin/check', async function(req, res, next) {
    try {
        await req.validate(req.body, {
            username: 'required',
            password: 'required'
        });
        const {username, password} = req.body;
        const user = await User.findOne({
            where: {
                username
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
            expiresIn: "1d",
        });
        return res.data({
            token: token,
            user: data
        });
      }catch(err){
        next(err);
      }
});

// register user
router.post('/register', async function(req, res, next){
    try {
        
        await req.validate(req.body, {
            name: 'required',
            password: 'required|min:6',
            signup_token: 'required'
        });
        const {name, password, signup_token} = req.body;
        const signupToken = await Token.findOne({
            where: {
                token_type: 'signup',
                token: signup_token
            }
        });
        if(!signupToken){
            return res.error(null, 'Invalid token');
        }
        let pwd = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name,
            email: signupToken.email,
            password: pwd,
            email_verified_at: new Date()
        });
        let data = {id: user.id, name: user.name};
        let token = jwt.sign(data, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        await signupToken.destroy();
       return res.data({
           user:data,
           token
       });
    }catch(err){
        next(err);
    }
});

router.post('/send-signup-link', async function(req, res, next){
    try {
        await req.validate(req.body, {
            email: 'required|email|unique_email',
        });
        const {email} = req.body;
        const token_type = 'signup';

        // create token
        const token = randomString(100);
        await Token.create({
            email,
            token,
            token_type
        });
        // send email
        // signup link: {BASE_URL}/auth/new-signup/:token;

        return res.data(null, "A signup link has been sent to your email ID. Please check your email.");
    }catch(err){
        next(err);
    }
});

router.get('/new-signup/:token', async function(req, res, next){
    try {
        const token = req.params.token;
        const signupToken = await Token.findOne({
            where: {
                token_type: 'signup',
                token: token
            }
        });
        if(signupToken){
            return res.redirect('/#/signup/'+token);
        }
        return res.sendStatus(404);
    }catch(err){
        next(err);
    }
});

module.exports = router;
