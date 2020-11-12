const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

module.exports = {
    create,
    authenticate,

};

async function create(userParam) {
    // validate
    if ( userParam.phone.length != 10 || !userParam.phone) {
        throw 'user phone must be 10-digit(no +7 or 8)';
    }
    if ( userParam.name === "" || !userParam.name ) {
        throw 'field "name" must be filled';
    }
    if ( userParam.surname === "" || !userParam.surname ) {
        throw 'field "surname" must be filled';
    }
    if ( userParam.city === "" || !userParam.city ) {
        throw 'field "city" must be filled';
    }
    if ( userParam.birthDay >= Date.now ) {
        throw 'invalid birthday';
    }

    const user = new User(userParam);
    await user.save();
    const _phone = userParam.phone;
    await authenticate(_phone);
}

async function authenticate({ phone }) {
    const user = await User.findOne({ phone });
    
    const token = jwt.sign({ sub: user.id});
    return {
        ...user.toJSON(),
        token
    };

    
    
}