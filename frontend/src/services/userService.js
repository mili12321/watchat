import httpService from './httpService'

export default {
  login,
  logout,
  signup,
  getUsers,
  getById,
  remove,
  update,
  addFavMovie,
  removeFavMovie,
  loginByGoogle
}

function getUsers() {
  return httpService.get('user')
}

function getById(userId) {
  return httpService.get(`user/${userId}`)
}
function remove(userId) {
  return httpService.delete(`user/${userId}`)
}

async function update(user) {
  const newUser = await httpService.put(`user/${user._id}`, user)
  return _handleLogin(newUser)
}

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred)
  return _handleLogin(user)
}
async function signup(userCred) {
  const user = await httpService.post('auth/signup', userCred)
  return _handleLogin(user)
}
async function logout() {
  await httpService.post('auth/logout')
  sessionStorage.clear()
}

async function loginByGoogle(userCred) {
  const user = await httpService.post('auth/loginByGoogle', userCred)
  return _handleLogin(user)
}

function _handleLogin(user) {
  sessionStorage.setItem('user', JSON.stringify(user))
  return user
}

async function addFavMovie(user,movie){
  user.favMovies = [movie, ...user.favMovies]
  const newUser = await httpService.put(`user/${user._id}`, user)
  return _handleLogin(newUser)

}
async function removeFavMovie(user,movie){
  user.favMovies = user.favMovies.filter(_movie=>_movie._id!==movie._id)
  const newUser = await httpService.put(`user/${user._id}`, user)
  return _handleLogin(newUser)
}