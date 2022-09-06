
let messages = [];
let callExecutionAddMessage = null;
let callsWaiting = [];
let callExecutionGetMessages = null;
let limitCallsWaiting = 5;

module.exports = (io) => {

  io.on('connection', socket => {
    console.log('new connection');

    socket.on('add-message', socket => {
      console.log('connection.add-message', socket);
      
      if (callsWaiting.length < limitCallsWaiting) {
        const id = Math.random();
        addMessageRecursive(id, socket);
      }
    })

    socket.on('get-messages', (callback) => {
      console.log('connection.get-message', callback);
      console.log('connection.get-message', messages);

      if (callsWaiting.length < limitCallsWaiting) {
        const id = Math.random();
        getMessagesRecursive(id, callback)
      }
    })
    

    socket.on('disconnect', () => console.log('disconnected'));
  })
}

function getMessagesRecursive(id, callback) {
  if (callExecutionGetMessages != null) {
    if (!callsWaiting.find(item => item == id)) {
      callsWaiting.push(id);
    }
    console.log('getMessages.waiting-if1', callsWaiting);
    setTimeout(() => getMessagesRecursive(id, callback), 1_000);
  } else {
    if (callsWaiting.length > 0) {   
      if (callsWaiting[0] == id) {
        getMessages(id, callback);
      } else {
        console.log('getMessages.waiting-if2', callsWaiting, callExecutionGetMessages);
        setTimeout(() => getMessagesRecursive(id, callback), 1_000);
      }
    } else {
      getMessages(id, callback);
    }
  }
}

function getMessages(id, callback) {
  callExecutionGetMessages = id;
  console.log('getMessages.on-sleeping', callExecutionGetMessages, callsWaiting);
  setTimeout(() => {      
    console.log('getMessages.executed', callExecutionGetMessages);
    
    callback({
      messagesReturn: messages
    });
    callExecutionGetMessages = null;
    
    if (callsWaiting.find(item => item == id)) {
      callsWaiting = callsWaiting.slice(1);
    }    
  }, 10_000);
}


function addMessageRecursive(id, message) {
  if (callExecutionAddMessage != null) {
    if (!callsWaiting.find(item => item == id)) {
      callsWaiting.push(id);
    }
    console.log('addMessage.waiting-if1', callsWaiting);
    setTimeout(() => addMessageRecursive(id, message), 1_000);
  } else {
    if (callsWaiting.length > 0) {   
      if (callsWaiting[0] == id) {
        addMessage(id, message);
      } else {
        console.log('addMessage.waiting-if2', callsWaiting, callExecutionAddMessage);
        setTimeout(() => addMessageRecursive(id, message), 1_000);
      }
    } else {
      addMessage(id, message);
    }
  }
}

function addMessage(id, message) {
  callExecutionAddMessage = id;
  console.log('addMessage.on-sleeping', callExecutionAddMessage, callsWaiting);
  setTimeout(() => {      
    console.log('addMessage.executed', callExecutionAddMessage);
    messages.push(message);
    callExecutionAddMessage = null;
    
    if (callsWaiting.find(item => item == id)) {
      callsWaiting = callsWaiting.slice(1);
    }    
  }, 10_000);
}

