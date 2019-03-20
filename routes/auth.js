'use strict'

/* AUTH ENDPOINT */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// POST
module.exports.post = async (req, res) => {
    try {
        // Kolla om användare existerar
        let admin = await Admin.findOne({ username: req.body.username });

        // Kolla om lösenord matchar det krypterade
        let match = await bcrypt.compare(req.body.password, admin.password)

        // Returnera JWT om match
        if (match) {
            const token = jwt.sign({ uid: admin.uid }, process.env.SECRET )
            res.status(200).send({ username: admin.username, authToken: token })
        } else {
        // Om inte, skicka tillbaka 402 
            res.status(402).send('Tyvärr, du saknar behörigheter för admin.')
        }

    } catch(err) {
        console.error(err);
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
        let response = await jwt.verify(token, process.env.SECRET)
        return response.uid;
    
    } catch(err){
        // Om error, så är token inte giltig
        console.error(err);
        return false;
    }
}
