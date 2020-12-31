const dbService = require('../../services/db.service')
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
  console.log('filter from backend', filterBy)
  const criteria = _buildCriteria(filterBy)
  const collection = await dbService.getCollection('movie')
  try {
    const movies = await collection.find(criteria).toArray()
    return movies
  } catch (err) {
    console.log('ERROR: cannot find movies')
    throw err
  }
}

async function getById(id) {
  const collection = await dbService.getCollection('movie')
  try {
    const movie = await collection.findOne({ _id: ObjectId(id) })
    // movie.givenReviews = await reviewService.query({ byMovieId: ObjectId(movie._id) })
    // movie.givenReviews = movie.givenReviews.map(review => {
    //     delete review.byMovie
    //     return review
    // })
    return movie
  } catch (err) {
    console.log(`ERROR: while finding movie ${id}`)
    throw err
  }
}

async function update(movie) {
  console.log('movie from movie.service', movie)
  const collection = await dbService.getCollection('movie')
  movie._id = ObjectId(movie._id)

  try {
    await collection.replaceOne({ _id: movie._id }, { $set: movie })
    console.log('movie from movie service', movie)
    return movie
  } catch (err) {
    console.log(`ERROR: cannot update movie ${movie._id}`)
    throw err
  }
}

module.exports = {
  query,
  getById,
  update,
}

function _buildCriteria(filterBy) {
  const criteria = {}
  // return criteria
  if (filterBy.search) {
    criteria.title = { $regex: new RegExp(filterBy.search, 'ig') }
  }

  // return criteria
  if (!filterBy.maxYear) {
    filterBy.maxYear = Infinity
  }
  if (!filterBy.minYear) {
    filterBy.minYear = -Infinity
  }

  if (filterBy.minYear) {
    criteria.year = { $gte: +filterBy.minYear, $lte: +filterBy.maxYear }
  }

  if (filterBy.type === 'All') return criteria
  criteria.type = filterBy.type
  return criteria
}
