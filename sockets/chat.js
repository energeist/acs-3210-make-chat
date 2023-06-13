module.exports = (io, socket, onlineUsers, channels) => {
  socket.on('new user', (username) => {
    //Save the username as key to access the user's socket id
    onlineUsers[username] = socket.id;
    //Save the username to socket as well. This is important for later.
    socket["username"] = username;
    // socket.join("General");
    console.log(`✋ ${username} has joined the chat! ✋`);
    io.emit("new user", username);
  });

  socket.on('new message', (data) => {
    console.log(`🎤 ${data.sender} @ ${data.channel}: ${data.message} 🎤`);
    channels[data.channel].push({ sender: data.sender, message: data.message });
    io.to(data.channel).emit('new message', data);
  });

  socket.on('get online users', () => {
    //Send over the onlineUsers
    socket.emit('get online users', onlineUsers);
  });

  socket.on('new channel', (newChannel) => {
    console.log(`🖥  new channel created: ${newChannel} 🖥`);
  });

  socket.on('disconnect', (username) => {
    // This deletes the user by using the username we saved to the socket
    delete onlineUsers[socket.username];
    io.emit('user has left', onlineUsers);
  });

  socket.on('new channel', (newChannel) => {
    channels[newChannel] = [];
    socket.join(newChannel);
    io.emit('new channel', newChannel);
    socket.emit('user changed channel', {
      channel: newChannel,
      messages: channels[newChannel]
    });
  });

  // Have the socket join the room of the channel
  socket.on('user changed channel', (newChannel) => {
    socket.join(newChannel);
    socket.emit('user changed channel', {
      channel : newChannel,
      messages : channels[newChannel]
    });
  });
}