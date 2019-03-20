const mongoose = require('mongoose');

let Schema = mongoose.Schema;

// Modell för vikarie
let vikarieSchema = new Schema ({
    namn: {
        type: String,
        required: [true, "Vikarie needs a name."]
    },
    ledig: {
        type: Boolean,
        default: true
    },
    datum: {
        fran: {
            type: String,
            default: ''
        },
        till: {
            type: String,
            default: ''
        }
    },
    kommun: {
        type: Array,
        required: true
    },
    klass: {
        type: Array,
        required: true
    },
    amne: {
        type: Array,
        required: true
    },
    kompetens: {
        type: String,
        required: true
    }
})

let vikarieModel = mongoose.model('vikarie', vikarieSchema);

module.exports = vikarieModel;