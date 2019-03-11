const mongoose = require('mongoose');

let Schema = mongoose.Schema;

// Modell för bokning
let bokningSchema = new Schema ({
    vikarie: {
        type: Object,
        required: true
    },
    ledig: {
        type: Boolean,
        required: true
    },
    datum: {
        dag: {
            type: Number,
            required: true
        },
        manad: {
            type: String,
            required: true
        }
    },
    bokare: {
        type: String,
        required: true,
    },
    plats: {
        type: String,
        required: true
    }
})

let bokningModel = mongoose.model('bokning', bokningSchema);

module.exports = bokningModel;