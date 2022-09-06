module.exports = (io) => {

  let messages = [];

  io.on('connection', socket => {
    console.log('new connection');

    socket.on('add-message', socket => {
      console.log('connection.add-message', socket);
      messages.push(socket);
    })

    socket.on('get-messages', (callback) => {
      console.log('connection.get-message', callback);
      console.log('connection.get-message', messages);
      callback({
        messagesReturn: messages
      });
    })
    

    socket.on('disconnect', () => console.log('disconnected'));
  })
}