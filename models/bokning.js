const mongoose = require('mongoose');

let Schema = mongoose.Schema;

// Modell för bokning
let bokningSchema = new Schema ({
    vikarie: {
        type: Object,
        required: true
    },
    datum: {
        fran: {
            type: String,
            required: true
        },
        till: {
            type: String,
            required: true
        }
    },
    bokare: {
        type: String,
        required: true,
    },
    skola: {
        type: String,
        required: true
    }
})

let bokningModel = mongoose.model('bokning', bokningSchema);

module.exports = bokningModel;