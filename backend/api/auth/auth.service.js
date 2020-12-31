const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function loginByGoogle(email, username, avatar='https://res.cloudinary.com/dl5mlxukz/image/upload/v1601299626/samples/default-avatar_smehur.png') {
  const user = await userService.getByEmail(email)
  console.log("user",user)
  if (!user){
    return userService.add({
      email,
      username,
      isAdmin: false,
      avatar,
      favMovies: [],
      followers: [],
      following: [],
      alerts: [],
    })
  }
  return user
}


async function login(email, password) {
  logger.debug(`auth.service - login with email: ${email}`)
  if (!email || !password)
    return Promise.reject('email and password are required!')

  const user = await userService.getByEmail(email)
  if (!user) return Promise.reject('Invalid email or password')
  const match = await bcrypt.compare(password, user.password)
  if (!match) return Promise.reject('Invalid email or password')

  delete user.password
  return user
}

async function signup(email, password, username) {
  logger.debug(
    `auth.service - signup with email: ${email}, username: ${username}`
  )
  if (!email || !password || !username)
    return Promise.reject('email, username and password are required!')
  const hash = await bcrypt.hash(password, saltRounds)
  return userService.add({
    email,
    password: hash,
    username,
    isAdmin: false,
    avatar:
      "https://img.icons8.com/ios-filled/50/000000/gender-neutral-user.png",
    favMovies: [],
    followers: [],
    following: [],
    alerts: [],
  })
}

module.exports = {
  signup,
  login,
  loginByGoogle
}
