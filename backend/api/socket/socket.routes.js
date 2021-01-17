module.exports = connectSockets

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

let currTime = 0
let firstUser
var intervalObj
let users = [
  {
    _id: getRandomNumber(100, 999999).toString(),
    username: 'George',
    room: '5fff514c1b5e0fcaaf31c449',
    avatar:
      'https://res.cloudinary.com/dzvebcsrp/image/upload/v1610818545/1_xmvpmp.png',
  },
  {
    _id: getRandomNumber(100, 999999).toString(),
    username: 'David123',
    room: '5fff514c1b5e0fcaaf31c449',
    avatar:
      'https://res.cloudinary.com/dzvebcsrp/image/upload/v1610818596/2_lxx9no.png',
  },
  {
    _id: getRandomNumber(100, 999999).toString(),
    username: 'Angela',
    room: '5fff514c1b5e0fcaaf31c449',
    avatar:
      'https://res.cloudinary.com/dzvebcsrp/image/upload/v1610819285/16_xwjjqi.png',
  },
  {
    _id: getRandomNumber(100, 999999).toString(),
    username: 'Jackson',
    room: '5fff514c1b5e0fcaaf31c449',
    avatar:
      'https://res.cloudinary.com/dzvebcsrp/image/upload/v1610818691/9_pyotcl.png',
  },
  {
    _id: getRandomNumber(100, 999999).toString(),
    username: 'Tom',
    room: '5fff514c1b5e0fcaaf31c449',
    avatar:
      'https://res.cloudinary.com/dzvebcsrp/image/upload/v1610818720/6_jivtrc.png',
  },
  {
    _id: getRandomNumber(100, 999999).toString(),
    username: 'Christy',
    room: '5fff514c1b5e0fcaaf31c449',
    avatar:
      'https://res.cloudinary.com/dzvebcsrp/image/upload/v1610818795/11_cg7xjs.png',
  },
  {
    _id: getRandomNumber(100, 999999).toString(),
    username: 'David',
    room: '5fff514c1b5e0fcaaf31c449',
    avatar:
      'https://res.cloudinary.com/dzvebcsrp/image/upload/v1610818744/5_dgsmrt.png',
  },
  {
    _id: getRandomNumber(100, 999999).toString(),
    username: 'Rachel',
    room: '5fff514c1b5e0fcaaf31c449',
    avatar:
      'https://res.cloudinary.com/dzvebcsrp/image/upload/v1610818865/13_y1wyun.png',
  },
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


    socket.on('toggle-play-btn', (data) => {
      io.to(socket.roomId).emit('toggle-play-btn', data)
    })


    socket.on('receive-gift', (data) => {
      socket.broadcast.to(data.gift.user.socketId).emit('receive-gift', {name:data.gift.giftName, sender:data.gift.sender});
    })

    socket.on('receive-msg', (data) => {
      const from = {...data.from, socketId:socket.id}
      socket.broadcast.to(data.user.socketId).emit('receive-msg', {txt:data.txt, from:from, to:data.to, sendedMsg:data.sendedMsg});
    }) 



    socket.on('reactions', (data) => {
      const myReaction = {...data.newReaction, myReaction:true}
      //sending to all clients except sender
      socket.to(socket.roomId).emit('reactions', data.newReaction);
      //sending to the sender
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
