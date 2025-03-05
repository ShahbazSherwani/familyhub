// screens/ChatScreen.js
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Card, Paragraph, Button } from 'react-native-paper';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello, how are you?' },
    { id: '2', text: 'I am good, thanks!' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    setMessages([...messages, { id: Date.now().toString(), text: newMessage }]);
    setNewMessage('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        {messages.map(message => (
          <Card key={message.id} style={styles.card}>
            <Card.Content>
              <Paragraph>{message.text}</Paragraph>
            </Card.Content>
          </Card>
        ))}
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
  messagesContainer: { flex: 1 },
  card: { marginBottom: 8 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 4 },
  sendButton: { marginLeft: 8 },
});
