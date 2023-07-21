const Artist = require('../models/artist');
const Album = require('../models/album');

exports.getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find().populate('albums');
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getArtistById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const artist = await Artist.findById(id).populate('albums');
      if (!artist) {
        return res.status(404).json({ error: 'Artist not found' });
      }
      res.json(artist);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  


  exports.createArtist = async (req, res) => {
    const { name, genre, imageURL } = req.body;
  
    try {
      const artist = new Artist({
        name,
        genre,
        imageURL,
      });
  
      await artist.save();
    

      res.status(201).json(artist);
    } catch (err) {
      res.status(400).json({ error: 'Invalid data' });
    }
  };


  exports.updateArtist = async (req, res) => {
    const { id } = req.params;
    const { name, genre, imageURL } = req.body;
  
    try {
      const artist = await Artist.findByIdAndUpdate(
        id,
        { name, genre, imageURL },
        { new: true }
      );
  
      if (!artist) {
        return res.status(404).json({ error: 'Artist not found' });
      }
  
      res.json(artist);
    } catch (err) {
      res.status(400).json({ error: 'Invalid data' });
    }
  };


  exports.deleteArtist = async (req, res) => {
    const { id } = req.params;
  
    try {
      const artist = await Artist.findByIdAndDelete(id);
  
      if (!artist) {
        return res.status(404).json({ error: 'Artist not found' });
      }
  
      res.json({ message: 'Artist deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  