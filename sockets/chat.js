module.exports = (io, socket) => {
  // Listen for "new user" socket emits
  socket.on('new user', (username) => {
    console.log(`${username} has joined the chat! ✋`);
    //Send the username to all clients currently connected
    io.emit("NEW_USER_JOINED: ", username);
  })
}