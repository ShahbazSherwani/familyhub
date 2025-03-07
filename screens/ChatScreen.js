import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Card, Paragraph, Button, Title } from 'react-native-paper';
import io from 'socket.io-client';
import { AuthContext } from '../contexts/AuthContext';

// Replace with your server IP or domain
const SERVER_URL = 'http://localhost:5000';
const socket = io(SERVER_URL);

export default function ChatScreen() {
  const { user } = useContext(AuthContext); // Current logged-in user
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // 1) Fetch existing chat messages
    fetch(`${SERVER_URL}/api/chat`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));

    // 2) Listen for new messages via Socket.IO
    socket.on('chatMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    if (!user) {
      alert('You must be logged in to chat');
      return;
    }
    const messageData = {
      text: newMessage,
      userId: user.id,
    };

    // Emit for real-time
    socket.emit('chatMessage', messageData);

    // Also persist on the server
    try {
      const res = await fetch(`${SERVER_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData),
      });
      if (!res.ok) {
        console.error('Failed to store message');
      }
    } catch (err) {
      console.error(err);
    }

    setNewMessage('');
  };

  const renderMessage = (msg) => {
    const isOwn = user && msg.userId === user.id;
    return (
      <View
        key={msg._id}
        style={[styles.messageContainer, isOwn ? styles.ownMessage : styles.receivedMessage]}
      >
        <Card style={[styles.card, isOwn ? styles.ownCard : styles.receivedCard]}>
          <Card.Content>
            <Paragraph style={isOwn ? styles.ownText : styles.receivedText}>
              {msg.text}
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
