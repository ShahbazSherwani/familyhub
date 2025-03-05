// screens/ChatScreen.js
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Card, Paragraph, Button, Title } from 'react-native-paper';
import io from 'socket.io-client';
import { AuthContext } from '../contexts/AuthContext';

// Replace with your server IP if not running on the same machine
const socket = io('http://localhost:5000');

export default function ChatScreen() {
  const { user } = useContext(AuthContext); // current logged-in user
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to chat server');
    });

    socket.on('chatMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    const messageData = {
      id: Date.now().toString(),
      text: newMessage,
      userId: user ? user.id : 'unknown', // attach current user id
    };
    socket.emit('chatMessage', messageData);
    setNewMessage('');
  };

  // Render message with different styling for own vs. others
  const renderMessage = (message) => {
    const isOwn = user && message.userId === user.id;
    return (
      <View
        key={message.id}
        style={[
          styles.messageContainer,
          isOwn ? styles.ownMessage : styles.receivedMessage,
        ]}
      >
        <Card style={[styles.card, isOwn ? styles.ownCard : styles.receivedCard]}>
          <Card.Content>
            <Paragraph style={isOwn ? styles.ownText : styles.receivedText}>
              {message.text}
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Title style={styles.header}>Live Chat</Title>
      <View style={styles.messagesContainer}>
        {messages.map(renderMessage)}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Button mode="contained">Send</Button>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { textAlign: 'center', marginBottom: 16 },
  messagesContainer: { flex: 1, marginBottom: 16 },
  messageContainer: { marginVertical: 4 },
  ownMessage: { alignSelf: 'flex-end' },
  receivedMessage: { alignSelf: 'flex-start' },
  card: { padding: 8 },
  ownCard: { backgroundColor: '#DCF8C6' },
  receivedCard: { backgroundColor: '#ECECEC' },
  ownText: { textAlign: 'right' },
  receivedText: { textAlign: 'left' },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 4 },
  sendButton: { marginLeft: 8 },
});
