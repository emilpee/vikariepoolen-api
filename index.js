const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

// Routes
let vikarier = require('./routes/vikarier');
let bokningar = require('./routes/bokningar');
let auth = require('./routes/auth');
let admins = require('./routes/admins');

app.route('/vikarier')
.get(vikarier.get)
.post(vikarier.post)

app.route('/vikarier/:id')
.delete(vikarier.delete)

app.route('/bokningar/:id')
.delete(bokningar.delete)

app.route('/bokningar')
.get(bokningar.get)
.post(bokningar.post)

app.route('/auth')
.post(auth.post)

app.route('/admins')
.post(admins.post)

// Koppling till databas
mongoose.connect(`mongodb+srv://poolare:${process.env.PASSWORD}@poolare-pc7ip.mongodb.net/vikpoolen?retryWrites=true`, {useNewUrlParser: true})
.then(() => {
  console.log(`Password OK! You're connected.`)
})
.catch(err => {
  console.error(err.stack);
});


// Auth för inloggning
app.use((req, res, next) => {
  if(auth.verifyToken(req.headers.authorization)){
      next()
  } else {
      res.status(403).send('Access denied.')
  }
})

// Port
const port = 3000;
app.listen(port, () => {
    console.log(`The portal at ${port} is open for everybody.`)
})