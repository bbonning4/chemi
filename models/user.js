const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    googleId: {
        type: String,
        require: true
    },
    email: String,
    folders: [{
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);