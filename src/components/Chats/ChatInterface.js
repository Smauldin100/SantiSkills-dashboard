import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, TextField } from '@mui/material';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f5f5f5;
  border-radius: 10px;
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Message = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 15px;
  margin: ${props => props.sent ? '0 0 0 auto' : '0'};
  background: ${props => props.sent ? '#007AFF' : '#E9ECEF'};
  color: ${props => props.sent ? 'white' : 'black'};
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background: white;
  border-top: 1px solid #ddd;
  gap: 10px;
`;

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to SantiSkills Chat!", sent: false },
    { id: 2, text: "How can I help you today?", sent: false }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        text: newMessage,
        sent: true
      }]);
      setNewMessage('');
      
      // Simulate response (replace with actual API call)
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: "Thanks for your message! I'll get back to you soon.",
          sent: false
        }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((message) => (
          <Message key={message.id} sent={message.sent}>
            {message.text}
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <InputContainer>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          size="small"
        />
        <IconButton 
          color="primary" 
          onClick={handleSend}
          disabled={!newMessage.trim()}
        >
          <SendIcon />
        </IconButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatInterface; 