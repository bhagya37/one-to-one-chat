import React, { useState } from 'react';
import Chat from './Chat';
import './App.css';

function App() {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [isChatting, setIsChatting] = useState(false);

  const handleStartChat = () => {
    if (sender && receiver) {
      setIsChatting(true);
    }
  };

  return (
    <div className="App">
      {!isChatting ? (
        <div className='input'>
          <input
            type="text"
            placeholder="Your Name"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
          <input
            type="text"
            placeholder="Recipient Name"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
          <button onClick={handleStartChat}>Start Chat</button>
        </div>
      ) : (
        <Chat sender={sender} receiver={receiver} />
      )}
    </div>
  );
}

export default App;





