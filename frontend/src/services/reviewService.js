import httpService from './httpService';

export default {
  add,
  query,
  remove
};

function query(movieId) {
  console.log('movieId',movieId)
  var queryStr = (!movieId)? '':`?movieId=${movieId}&sort=anaAref`;
  return httpService.get(`review${queryStr || ''}`);
}

function remove(reviewId) {
  return httpService.delete(`review/${reviewId}`);
}
async function add(review) {
  const addedReview  = await httpService.post('review', review);
  return  addedReview
}
