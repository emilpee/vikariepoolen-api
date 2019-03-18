'use strict'
/* USERS ENDPOINT */

let uuid = require('uuid/v4');
let Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// POST
module.exports.post = async (req, res) => {

    try {
        let newAdmin = {
            uid: uuid(),
            role: req.body.role,
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, saltRounds) // encrypt pw before saving to DB
        }

        // Skapa admin i mongoDB
        let admin = await Admin.create(newAdmin);

        console.log(admin);

        // Skicka admin data till frontend
        res.status(200).send(admin);

    } catch(err) {
        res.status(400).send(err.stack);
    }
}