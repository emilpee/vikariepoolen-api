let BokningModel = require('../models/bokning')
let VikarieModel = require('../models/vikarie')

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

// POST 
module.exports.post = async(req, res) => {

    try {
        let vikarie = await VikarieModel.findById(req.body.vikarie);
        console.log(req.body);
    
        // Skapa ny bokning
        let bokning = {
            vikarie: vikarie,
            datum: {
                fran: req.body.datum.fran,
                till: req.body.datum.till 
            },
            bokare: req.body.bokare, 
            skola: req.body.skola
        }

        let newBokning = await BokningModel.create(bokning);

        // Uppdatera status på bokad vikarie
        await VikarieModel.findOneAndUpdate({_id: req.body.vikarie}, {
            ledig: false,
            datum: {
                fran: req.body.datum.fran,
                till: req.body.datum.till
            }
        }) 

        // Skicka till front end
        res.status(200).send(newBokning)

    } catch(err) {
        console.log(err.stack);

    }
}

// DELETE
module.exports.delete = async (req, res) => {
    try {
      res.status(200).send( await BokningModel.findOneAndDelete({_id: req.params.id}))
  } catch(err) {
      res.status(500).send(err.stack);
  }
}