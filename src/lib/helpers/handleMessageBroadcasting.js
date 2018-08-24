module.exports = (io, socket, nickNames) => {
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', {
      message: msg,
      clientName: nickNames[socket.id],
      clientID: socket.id,
    })
  })
}
