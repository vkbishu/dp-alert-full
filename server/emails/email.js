const path = require('path');
const Email = require('email-templates');

const email = new Email({
    views: {
        root: path.resolve("..")
    }
});

module.exports = email;