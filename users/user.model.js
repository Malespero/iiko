const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true, default: "" },
    surname: { type: String, required: true, default: ""  },
    city: { type: String, required: true, default: ""  },
    birthDay: { type: Date },
    gender: {type: Boolean, default: false}, //false - male, true - female
    phone: { type: String, required: true, default: ""  },
    iikoId: { type: String, required: false }, //TODO
    hash: { type: String, required: false },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', schema);