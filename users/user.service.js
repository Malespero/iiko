const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

module.exports = {
    create,
    update,

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

    /* // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    } */

    // save user
    await user.save();
    console.log(user.id)
    return{
        ...user.toJson
    }


    /* const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return {
        ...user.toJSON(),
        token
    }; */
}

async function update(id, userParam, user) {
    if(user.sub === id){
        const user = await User.findById(id);

        // validate
        if (!user) throw 'User not found';

        // hash password if it was entered
        if (userParam.password) {
            userParam.hash = bcrypt.hashSync(userParam.password, 10);
        }

        // copy userParam properties to user
        Object.assign(user, userParam);

        await user.save();
        throw 'You are updated';
    }
    else
    {
        throw 'You can only change yourself';
    }

    
    
}