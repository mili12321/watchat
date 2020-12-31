const movieService = require('./movie.service')

async function getMovies(req, res) {
    console.log('Getting you movies');
    console.log(req.query);
    const filterBy = req.query;
    const movies = await movieService.query(filterBy)
    res.json(movies)
}

async function getMovie(req, res) {
    if (req.session.loggedinMovie) {
        console.log('Getting you a movie');
    }
    const movieId = req.params.id;
    const movie = await movieService.getById(movieId)
    res.json(movie)
}



// UPDATE
async function updateMovie(req, res) {
    console.log('req.body',req.body)
    let updatedMovie
    try {
        console.log('req.body2',req.body)
        updatedMovie = await movieService.update(req.body)
        console.log('updatedMovie',updatedMovie)
    } catch{
        res.status(500).end('Cannot update movie!')
    }
    console.log('updatedMovie',updatedMovie)
    res.json(updatedMovie)
}



module.exports = {
    getMovies,
    getMovie,
    updateMovie,
}