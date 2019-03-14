const express = require('express');
const mongoose = require('mongoose'); // the shiet
const cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

// Routes
let vikarier = require('./routes/vikarier');
let bokningar = require('./routes/bokningar');

app.route('/vikarier')
.get(vikarier.get)
.post(vikarier.post)

app.route('/bokningar')
.get(bokningar.get)

// Koppling till databas
mongoose.connect(`mongodb+srv://poolare:${process.env.PASSWORD}@poolare-pc7ip.mongodb.net/vikpoolen?retryWrites=true`, {useNewUrlParser: true})
.then(() => {
  console.log(`Password OK! You're connected.`)
})
.catch(err => {
  console.error(err.stack);
});

// Port
const port = 3000;
app.listen(port, () => {
    console.log(`The portal at ${port} is open for everybody.`)
})