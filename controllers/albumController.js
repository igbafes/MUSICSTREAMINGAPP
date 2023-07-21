const Album = require('../models/album');
const Artist = require('../models/artist');
const emailService = require('../services/emailService');

exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate('artistId');
    res.json(albums);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getAlbumById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const album = await Album.findById(id).populate('artistId');
      if (!album) {
        return res.status(404).json({ error: 'Album not found' });
      }
      res.json(album);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.createAlbum = async (req, res) => {
    const { title, releaseYear, genre, artistId, cover } = req.body;
  
    try {
      const artist = await Artist.findById(artistId);
      if (!artist) {
        return res.status(404).json({ error: 'Artist not found' });
      }
  
      const album = new Album({
        title,
        releaseYear,
        genre,
        artistId,
        cover,
      });
  
      await album.save();
  
      // Send email notification to the artist
      emailService.sendAlbumNotification(artist.email, album.title);
  
      res.status(201).json(album);
    } catch (err) {
      res.status(400).json({ error: 'Invalid data' });
    }
  };
  

  exports.updateAlbum = async (req, res) => {
    const { id } = req.params;
    const { title, releaseYear, genre, artistId } = req.body;
  
    try {
      const album = await Album.findByIdAndUpdate(
        id,
        { title, releaseYear, genre, artistId },
        { new: true }
      );
  
      if (!album) {
        return res.status(404).json({ error: 'Album not found' });
      }
  
      res.json(album);
    } catch (err) {
      res.status(400).json({ error: 'Invalid data' });
    }
  };
  
  exports.deleteAlbum = async (req, res) => {
    const { id } = req.params;
  
    try {
      const album = await Album.findByIdAndDelete(id);
  
      if (!album) {
        return res.status(404).json({ error: 'Album not found' });
      }
  
      res.json({ message: 'Album deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  