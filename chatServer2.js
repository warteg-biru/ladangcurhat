const socketIo = require('socket.io')

const listen = (server) => {
  const io = socketIo.listen(server)
  console.log('io listening')
  io.on('connection', (socket) => {
    console.log('connected')
    console.log(socket.id)
  })
}

exports.listen = listen
