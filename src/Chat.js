import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './App.css';

const socket = io('http://localhost:5000');

const Chat = ({ sender, receiver }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    
    axios.get(`http://localhost:5000/messages/${sender}/${receiver}`)
      .then(response => {
        console.log('Fetched messages:', response.data);
        setMessages(response.data);
      })
      .catch(err => {
        console.error('Error fetching messages:', err);
      });

   
    socket.emit('join', sender);


    socket.on('receiveMessage', (message) => {
      console.log('Received message:', message);
      if ((message.sender === sender && message.receiver === receiver) ||
          (message.sender === receiver && message.receiver === sender)) {
        setMessages(prevMessages => [...prevMessages, message]);
      }
    });

   
    return () => {
      socket.off('receiveMessage');
    };
  }, [sender, receiver]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = { sender, receiver, message: newMessage.trim() };
      socket.emit('sendMessage', messageData);
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Chat with {receiver}</h2>
      <div className="message-container">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === sender ? 'my-message' : 'their-message'}>
            <p>{msg.sender}: {msg.message}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
