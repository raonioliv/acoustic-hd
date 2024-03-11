const { Bookmark, Song } = require('../models')

const _ = require('lodash')
module.exports = { 
  async post(req, res, next){ 
    try {
      const userId = req.user.id
      const {songId} = req.body

      let bookmark = await Bookmark.findOne({ 
        where: { 
          SongId: songId, 
          UserId: userId
        }
      })


      if(!bookmark){ 
        bookmark = await Bookmark.create({ 
          UserId: userId, 
          SongId: songId
        })
        res.status(200).send({ 
          msg: 'created', 
          bookmark: bookmark
        })
      }else{ 
        res.status(200).send({ 
          bookmark
        })
      }

    } catch (error) {
      res.status(500).send({ 
        msg: 'Ocorreu um erro ao adicionar a música ao Bookmark.'
      })
    }
  },
  
  async index(req, res, next){ 
    try {
      const {songId} = req.query
      const userId = req.user.id
      const where = { 
        UserId: userId
      }
      if(songId){ 
        where.SongId = songId
      }
      let bookmarks = null

      bookmarks = await Bookmark.findAll({ 
        where: where, 
        include: Song
      })
      bookmarks = bookmarks
        .map(bookmarks => bookmarks.toJSON())
        .map(bookmark => _.extend({}, bookmark.Song))

      res.status(200).send({ 
        bookmarks: bookmarks
      })
    } catch (error) {
      res.status(200).send({ 
        msg: 'Ocorreu um erro ao buscar os bookmarks'
      })
    }
  }, 
  async delete(req, res, next){ 
    try {
      const userId = req.user.id
      const bookmarks = await Bookmark.destroy({ 
        where: { 
          UserId: userId, 
          songId: req.query.songId
        }
      })
      res.status(200).send({ 
        bookmarks: bookmarks
      })
    } catch (error) {
      res.status(200).send({ 
        msg: 'Ocorreu um erro ao retirar a música do bookmark'
      })
    }
  }
}