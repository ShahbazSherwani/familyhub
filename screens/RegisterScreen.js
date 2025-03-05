// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Title, Paragraph } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { setUser } = useContext(AuthContext);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setErrorMsg('Please fill in all fields');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful');
        navigation.replace('MainApp');
      } else {
        setErrorMsg(data.msg || data.error || 'Registration failed');
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Title>Create Account</Title>
      <TextInput
        label="Username"
        mode="outlined"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {errorMsg ? <Paragraph style={styles.error}>{errorMsg}</Paragraph> : null}
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>
      <Text>Already have an account?</Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Login')}
              style={styles.button}
            >
              Login
            </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  input: { marginVertical: 8 },
  button: { marginTop: 16 },
  error: { color: 'red', textAlign: 'center', marginVertical: 8 },
});
