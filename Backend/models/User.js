const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({ 
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    },
});
const User = mongoose.model('user', UserSchema);
// User.createIndexes(); //is line se kya hoga ki indexes bn jayenge or same data dubara enter nhi ho payega
module.exports = User