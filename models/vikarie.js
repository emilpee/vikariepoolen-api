const mongoose = require('mongoose');

let Schema = mongoose.Schema;

// Modell för vikarie
let vikarieSchema = new Schema ({
    namn: {
        type: String,
        required: [true, "Vikarie needs a name."]
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
    intressen: {
        type: Array,
        required: false
    },
    kompetens: {
        type: String,
        required: true
    }
})

let vikarieModel = mongoose.model('vikarie', vikarieSchema);

module.exports = vikarieModel;