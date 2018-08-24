module.exports = (socket, guestNumber, nickNames, namesUsed) => {
  const name = `Guest${guestNumber}`
  nickNames[socket.id] = name;
  socket.emit('nameResult', {
    success: true,
    name,
  });
  namesUsed.push(name);
  return guestNumber + 1;
}
