let Validator = require('validatorjs');
const {User} = require('../models');

Validator.registerAsync('unique_email', async function(email, attribute, req, passes) {
    let user = await User.findOne({
        where: {
            email: email
        }
    });
    if(user){
        passes(false, 'Email already exists');
    }else{
        passes();
    }
});

module.exports = Validator;