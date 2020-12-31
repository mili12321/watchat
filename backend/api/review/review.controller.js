const logger = require('../../services/logger.service')
const reviewService = require('./review.service')

// TODO: needs error handling! try, catch

async function getReviews(req, res) {
    try {
        const reviews = await reviewService.query(req.query)
        console.log("reviews rfrom controller",reviews)
        res.send(reviews)
    } catch (err) {
        logger.error('Cannot get reviews', err);
        res.status(500).send({ error: 'cannot get reviews' })

    }
}

async function deleteReview(req, res) {
    try {
        await reviewService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete review', err);
        res.status(500).send({ error: 'cannot delete review' })
    }
}

async function addReview(req, res) {
    var review = req.body;
    console.log('req.body',req.session.user)
    review.byUserId = req.session.user._id;
    review = await reviewService.add(review)

    review.byUser = req.session.user;
    // TODO - need to find aboutToy
    review.aboutToy = {}
    console.log('review4',review)
    res.json(review)
}

module.exports = {
    getReviews,
    deleteReview,
    addReview
}