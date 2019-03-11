let BokningModel = require('../models/bokning')

// GET 
module.exports.get = async(req, res) => {
    try {
        let bokningar = await BokningModel.find({});
        res.status(200).send(bokningar);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
}