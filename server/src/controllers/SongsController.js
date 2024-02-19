const { Op } = require('sequelize')
const { Song } = require('../models')
module.exports = { 
  async index(req, res, next){ 
    try {
      const limit = req.body.limit || 10
      const search = req.query.search
      let songs = null
      if(search){ 
        songs = await Song.findAll({ 
          where: { 
            [Op.or]: [
              'title', 'genre', 'artist', 'album'
            ].map(key => ({ 
              [key]: { 
                [Op.like]: `%${search}%`
              }
            }))
          }
        })
      }else{ 
        songs = await Song.findAll({ 
          limit: limit, 
        })
      }
      res.status(200).send(songs)

    } catch (error) {
      console.log(error);
      res.status(500).send({
        msg: 'Ocorreu um erro ao buscar as músicas.'
      })
    }
  },
  async post(req, res, next){ 
    try {
      const song = await Song.create(req.body)
      res.status(200).send(song)
    } catch (error) {
      res.status(500).send({ 
        error: error, 
        msg: 'Ocorreu um erro ao criar a música.'
      })
    }
  },
  async delete(req, res, next){ 
    try {
      const song = await Song.findOne({ 
        where: { 
          id: req.params.songId
        }
      })
      song.destroy()
      res.status(200).send({msg: 'success'})
    } catch (error) {
      res.status(500).send({ 
        error: error, 
        msg: 'Ocorreu um erro ao deletar a música.'
      })
    }
  },
  async show(req, res, next){ 
    try {
      const song = await Song.findOne({
        where: { 
          id: req.params.songId
        }
      })
      res.status(200).send({ 
        song: song
      })
    } catch (error) {
      console.log(error);
      res.status(500).send({ 
        msg: 'Ocorreu um erro ao tentar encontrar a música.'
      })
    }
  }
}