'use strict'

/* AUTH ENDPOINT */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// GET
module.exports.post = async (req, res) => {

    // Kolla om användare existerar
    let admin = await Admin.findOne({ username: req.body.username });

    // Kolla om lösenord matchar det krypterade
    let match = await bcrypt.compare(req.body.password, admin.password)
    console.log(admin);
    console.log(match);

    // Returnera JWT om match
    if (match) {
        const token = jwt.sign({ uid: admin.uid }, process.env.SECRET )
        res.status(200).send({ username: admin.username, authToken: token })
    }
    // Om inte, skicka tillbaka 402 
    else {
        res.status(402).send('Tyvärr, du saknar behörigheter för admin.')
    }
    
}

module.exports.isAdmin = async (authtoken) => {
    
    let token = await jwt.verify(authtoken.substring(7), process.env.SECRET);
    
    // Hämta användare från mongoDB
    let admin = await Admin.findOne({ uid: token.uid })

    // Hämta true eller false efter roll
    if (admin.role === 'admin') {
        return true;
    } else {
        return false;
    }

}

module.exports.verifyToken = async (token) => {

    try {
        // Verify JWT with process.env.SECRET, return token
        let response = await jwt.verify(token, process.env.SECRET)
        return response.uid;
    
    } catch(err){
        // if error = not valid token, return 'not valid token.'
        console.error(err);
        return false;
    }
}
