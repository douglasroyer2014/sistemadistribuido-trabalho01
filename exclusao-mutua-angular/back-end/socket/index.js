
let messages = [];
let callExecutionAddMessage = null;
let callsWaitingAddMessage = [];
let callExecutionGetMessages = null;
let callsWaitingGetMessages = [];
let limitCallsWaiting = 5;

module.exports = (io) => {

  io.on('connection', socket => {
    console.log('new connection');

    socket.on('add-message', socket => {
      console.log('connection.add-message', socket);
      
      if (callsWaitingAddMessage.length < limitCallsWaiting) {
        const id = Math.random();
        addMessageRecursive(id, socket);
      }
    })

    socket.on('get-messages', (callback) => {
      console.log('connection.get-message', callback);
      console.log('connection.get-message', messages);

      if (callsWaitingGetMessages.length < limitCallsWaiting) {
        const id = Math.random();
        getMessagesRecursive(id, callback)
      }
    })
    

    socket.on('disconnect', () => console.log('disconnected'));
  })
}

function getMessagesRecursive(id, callback) {
  if (callExecutionGetMessages != null) {
    if (!callsWaitingGetMessages.find(item => item == id)) {
      callsWaitingGetMessages.push(id);
    }
    console.log('getMessages.waiting-if1', callsWaitingGetMessages);
    setTimeout(() => getMessagesRecursive(id, callback), 1_000);
  } else {
    if (callsWaitingGetMessages.length > 0) {   
      if (callsWaitingGetMessages[0] == id) {
        getMessages(id, callback);
      } else {
        console.log('getMessages.waiting-if2', callsWaitingGetMessages, callExecutionGetMessages);
        setTimeout(() => getMessagesRecursive(id, callback), 1_000);
      }
    } else {
      getMessages(id, callback);
    }
  }
}

function getMessages(id, callback) {
  callExecutionGetMessages = id;
  console.log('getMessages.on-sleeping', callExecutionGetMessages, callsWaitingGetMessages);
  setTimeout(() => {      
    console.log('getMessages.executed', callExecutionGetMessages);
    
    callback({
      messagesReturn: messages
    });
    callExecutionGetMessages = null;
    
    if (callsWaitingGetMessages.find(item => item == id)) {
      callsWaitingGetMessages = callsWaitingGetMessages.slice(1);
    }    
  }, 10_000);
}


function addMessageRecursive(id, message) {
  if (callExecutionAddMessage != null) {
    if (!callsWaitingAddMessage.find(item => item == id)) {
      callsWaitingAddMessage.push(id);
    }
    console.log('addMessage.waiting-if1', callsWaitingAddMessage);
    setTimeout(() => addMessageRecursive(id, message), 1_000);
  } else {
    if (callsWaitingAddMessage.length > 0) {   
      if (callsWaitingAddMessage[0] == id) {
        addMessage(id, message);
      } else {
        console.log('addMessage.waiting-if2', callsWaitingAddMessage, callExecutionAddMessage);
        setTimeout(() => addMessageRecursive(id, message), 1_000);
      }
    } else {
      addMessage(id, message);
    }
  }
}

function addMessage(id, message) {
  callExecutionAddMessage = id;
  console.log('addMessage.on-sleeping', callExecutionAddMessage, callsWaitingAddMessage);
  setTimeout(() => {      
    console.log('addMessage.executed', callExecutionAddMessage);
    messages.push(message);
    callExecutionAddMessage = null;
    
    if (callsWaitingAddMessage.find(item => item == id)) {
      callsWaitingAddMessage = callsWaitingAddMessage.slice(1);
    }    
  }, 10_000);
}

