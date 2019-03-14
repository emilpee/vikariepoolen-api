let VikarieModel = require('../models/vikarie')

// GET 
module.exports.get = async(req, res) => {
    try {
        let vikarier = await VikarieModel.find({});
        res.status(200).send(vikarier);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
}

// POST
module.exports.post = async(req,res,next) => {
    try {
      let nyVikarie = await VikarieModel.create(req.body);
      res.status(200).send(nyVikarie)
    }
  
    catch(err) {
      console.error(err);
      res.status(400).send(err);
    }
  };