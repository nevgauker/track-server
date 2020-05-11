const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const Track = mongoose.model('Track');


const router = express.Router();
router.use(requireAuth);



module.exports = router;

router.get('/tracks',  async (req, res) =>{
    const tracks = await Track.find({ userId: req.user._id });
    res.status(200).send(tracks);
});

router.post('/tracks',  async (req, res) =>{

    const { name, locations } = req.body;

    if (! name || !locations){
      return res.status(404).send({ error: 'You must provide name and locations.' });
    }

    try {
      const track = new Track({ name, locations, userId: req.user._id });
      await track.save();
      res.status(200).send(track);
    }catch{
      res.status(404).send({ error:  err.message })
    }
    
});
