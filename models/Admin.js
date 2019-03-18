const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let adminSchema = new Schema({      
        username: {
            required: true,
            type: String
        },
        role: {
            required: true,
            type: String,
            enum: 'admin'
        },
        uid: {
            required: true,
            type: String
        },
        password: {
            required: true,
            type: String
        }
    })

let Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;