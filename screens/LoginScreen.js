// screens/LoginScreen.js
import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Paragraph } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg('Please fill in all fields');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Save user details in context
        setUser(data.user);
        alert('Login successful');
        navigation.replace('Main');
      } else {
        setErrorMsg(data.msg || data.error || 'Login failed');
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Title>Login</Title>
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
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Title>Don't have an account?</Title>

        <Button
            mode="outlined"
            onPress={() => navigation.navigate('Register')}
            style={styles.button}
        >
            Register
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
