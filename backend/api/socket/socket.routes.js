module.exports = connectSockets

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

let currTime = 0
let firstUser
var intervalObj
let users = [
  // {
  //   _id: getRandomNumber(100, 999999).toString(),
  //   username: 'George',
  //   room: '5f711660f739d8b9f62c21d7',
  //   avatar:
  //     'https://res.cloudinary.com/dl5mlxukz/image/upload/v1601405764/watchat/user32_sombxr.png',
  // },
  // {
  //   _id: getRandomNumber(100, 999999).toString(),
  //   username: 'David123',
  //   room: '5f711660f739d8b9f62c21d7',
  //   avatar:
  //     'https://res.cloudinary.com/dl5mlxukz/image/upload/v1601405764/watchat/user30_yr462l.png',
  // },
  // {
  //   _id: getRandomNumber(100, 999999).toString(),
  //   username: 'Angela',
  //   room: '5f711660f739d8b9f62c21d7',
  //   avatar:
  //     'https://res.cloudinary.com/dl5mlxukz/image/upload/v1601405762/watchat/user14_pbwv25.png',
  // },
  // {
  //   _id: getRandomNumber(100, 999999).toString(),
  //   username: 'M.Jackson',
  //   room: '5f711660f739d8b9f62c21d7',
  //   avatar:
  //     'https://res.cloudinary.com/dl5mlxukz/image/upload/v1601405762/watchat/user34_se0jt3.png',
  // },
  // {
  //   _id: getRandomNumber(100, 999999).toString(),
  //   username: 'Tom',
  //   room: '5f711660f739d8b9f62c21d7',
  //   avatar:
  //     'https://res.cloudinary.com/dl5mlxukz/image/upload/v1601405762/watchat/user11_ghw6qh.png',
  // },
  // {
  //   _id: getRandomNumber(100, 999999).toString(),
  //   username: 'Christy',
  //   room: '5f711660f739d8b9f62c21d7',
  //   avatar:
  //     'https://res.cloudinary.com/dl5mlxukz/image/upload/v1601405761/watchat/user26_zhxse8.png',
  // },
  // {
  //   _id: getRandomNumber(100, 999999).toString(),
  //   username: 'David Bowie',
  //   room: '5f711660f739d8b9f62c21d7',
  //   avatar:
  //     'https://res.cloudinary.com/dl5mlxukz/image/upload/v1601405761/watchat/user23_x3yrkg.png',
  // },
  // {
  //   _id: getRandomNumber(100, 999999).toString(),
  //   username: 'Rachel',
  //   room: '5f711660f739d8b9f62c21d7',
  //   avatar:
  //     'https://res.cloudinary.com/dl5mlxukz/image/upload/v1601405761/watchat/user17_ouqjam.png',
  // },
]
const reactions = ['sad', 'like', 'lol', 'angry', 'heart', 'wow']

function connectSockets(io) {
  io.on('connection', (socket) => {
    setInterval(() => {
      let id = getRandomNumber(1000, 10000).toString()
      io.to(socket.roomId).emit('reactions', {
        id: id,
        type: reactions[getRandomNumber(0, 5)],
        posX: getRandomNumber(5, 8),
      })
      setTimeout(() => {
        io.to(socket.roomId).emit('reaction-delete', id)
      }, 2000)
    }, 10000)

    socket.on('sending-request-for-approval', (data) => {
      socket.broadcast.to(data.firstUser.socketId).emit('sending-request-for-approval', data);
    })

    socket.on('approving-user', (data) => {
      io.to(socket.roomId).emit('approving-user', data)
    })


    socket.on('sending-currTime-to-user', (data) => {
      socket.broadcast.to(data.newUser.socketId).emit('sending-currTime-to-user', data);
    })

    socket.on('approving-user', (data) => {
      io.to(socket.roomId).emit('approving-user', data)
    })


    socket.on('chat', (msg) => {
      io.to(socket.roomId).emit('chat', msg)
    })

    socket.on('chat room', (data) => {
      if (socket.roomId) {
        socket.leave(socket.roomId)
      }
      let newUser
      if (!data.user) {
        newUser = {
          _id: getRandomNumber(1000, 9999).toString(),
          username: 'Guest' + '#' + getRandomNumber(100, 999),
          room: data.roomId,
          socketId: socket.id,
          avatar: "https://img.icons8.com/ios-filled/50/000000/gender-neutral-user.png",
        }
      } else {
        newUser = { ...data.user, room: data.roomId, socketId: socket.id}
      }
      users.push(newUser)
      socket.join(data.roomId)
      socket.roomId = data.roomId
      const roomUsers = users.filter((user) => user.room === data.roomId)
      if(roomUsers.length>0){
        firstUser = roomUsers[0]
        io.to(socket.roomId).emit('chat room', roomUsers, newUser, firstUser)
      }
    })

    socket.on('remove-user', (data) => {
      users = users.filter((user) => user._id !== data.userId)
      const roomUsers = users.filter((user) => user.room === data.userRoom)
      if(roomUsers.length>0){
        firstUser = roomUsers[0]
        let isFirstUser = true
        socket.broadcast.to(firstUser.socketId).emit('get-first-user', {isFirstUser});
      }
      io.to(socket.roomId).emit('remove-user', roomUsers, firstUser)

    })

    socket.on('get-first-user', (firstUser) => {
      let isFirstUser = true
      socket.broadcast.to(firstUser.socketId).emit('get-first-user', {isFirstUser});
    })


    socket.on('toggle-play-btn', (isPlaying) => {
      io.to(socket.roomId).emit('toggle-play-btn', isPlaying)
    })


    socket.on('receive-gift', (data) => {
      socket.broadcast.to(data.gift.user.socketId).emit('receive-gift', {name:data.gift.giftName, sender:data.gift.sender});
    })

    socket.on('receive-msg', (data) => {
      const from = {...data.from, socketId:socket.id}
      socket.broadcast.to(data.user.socketId).emit('receive-msg', {txt:data.txt, from:from, to:data.to, sendedMsg:data.sendedMsg});
    }) 



    socket.on('reactions', (data) => {
      console.log("reaction5",data.newReaction)
      console.log("user5",data.user)
      const myReaction = {...data.newReaction, myReaction:true}
      const notMyReaction = {...data.newReaction, notMyReaction:true}
      // io.to(socket.roomId).emit('reactions', reaction)
      socket.to(socket.roomId).emit('reactions', notMyReaction);
      socket.emit('reactions', myReaction);
    })

    socket.on('reaction-delete', (id) => {
      io.to(socket.roomId).emit('reaction-delete', id)
    })

    socket.on('timestamp', (data) => {
      if(!data){
        io.to(socket.roomId).emit('timestamp', 0)
      }else{
        io.to(socket.roomId).emit('timestamp', data)
      }
    })

    socket.on('stop', (data) => {
      clearInterval(intervalObj);
      currTime=data.currTime
      isPlaying=!data.isPlaying
      io.to(socket.roomId).emit('stop', {currTime, isPlaying: isPlaying})
    })
    
    socket.on('play', (data) => {
      data.currTime===null?currTime=0:currTime=data.currTime
      intervalObj = setInterval(() => {
        currTime++
      }, 1000)
      isPlaying=!data.isPlaying
      io.to(socket.roomId).emit('play', {currTime, isPlaying: isPlaying})
    })


  })
}
