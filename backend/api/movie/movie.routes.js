const express = require('express')
const {getMovies, getMovie, updateMovie} = require('./movie.controller')
const router = express.Router()

router.get('/', getMovies)
router.get('/:id', getMovie)
router.put('/:id', updateMovie) 

module.exports = router
