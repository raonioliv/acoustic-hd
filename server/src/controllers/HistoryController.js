const { History, Song } = require('../models')
const _ = require('lodash')
module.exports = { 
  async post(req, res, next){ 
    try {
      const { songId } = req.body
      const userId = req.user.id
      const limit = req.params.limit || 10
      let history = await History.findOne({ 
        where: { 
          SongId: songId,
        }, 
        limit: limit
      })
      let diffDays;
      if(history){ 
        const dayViewed = new Date(history.createdAt).getDate()
        const now = new Date().getDate()
        const msDiffDate = Math.abs(now - dayViewed);
        diffDays = Math.ceil(msDiffDate / (1000 * 3600 * 24));
        if(diferencaEmDias >= 0){ 
          history.destroy()
          history = await History.create({ 
            SongId: songId, 
            UserId: userId
          })
        }
      }
      if(!history){ 
          history = await History.create({
          SongId: songId, 
          UserId: userId        
        })
      }
      res.status(200).send({ 
        history: history,
      })
    } catch (error) {
      console.log(error);
      res.status(500).send({ 
        msg: 'Ocorreu um erro.'
      })
    }
  }, 

  async index(req, res, next){ 
    try {
      const userId = req.user.id
      const limit = req.params.limit || 10
      const where = { 
        UserId: userId
      }
      if(req.params.songId){ 
        where.SongId = req.params.songId
      }
      let history = await History.findAll({ 
        where: where, 
        include: Song,
        limit: limit
      })
      history = history
        .map(history => history.toJSON())
        .map(history => _.extend({}, history, history.Song))


      res.status(200).send({ 
        history: history, 

      })
    } catch (error) {
      console.log(error);
      res.status(500).send({ 
        msg: 'Ocorreu um erro ao buscar os vistos recentemente.'
      })
    }
  }
}