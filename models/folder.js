const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
    name: String,
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    materials: [{
        type: Schema.Types.ObjectId,
        ref: 'Material'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Folder', folderSchema);