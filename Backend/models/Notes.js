const mongoose = require('mongoose');
const {Schema} = mongoose; 

const NotesSchema = new Schema({ 
    // like humara koi user hai usne koi notes dala toh usse koi dusra user na dekh paye 
    // aab notes ko fetch kr lenge user ki id se.
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    }, 
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: 'General'
    },
    date: {
        type: String,
        default: Date.now
        
    },
});
module.exports = mongoose.model('notes', NotesSchema);