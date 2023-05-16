const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new Schema({
    name: String,
    cid: String,
    imageBase64: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Material', materialSchema);