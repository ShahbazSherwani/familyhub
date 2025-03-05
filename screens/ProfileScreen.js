// screens/ProfileScreen.js
import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Avatar, Button, TextInput, Title, Paragraph } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../contexts/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  
  // If no user data is available, you might display a placeholder or prompt the user to log in.
  const [username, setUsername] = useState(user ? user.username : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [profilePicture, setProfilePicture] = useState(user ? user.profilePicture : null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access media library is required!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      const uri = result.assets ? result.assets[0].uri : result.uri;
      setProfilePicture(uri);
    }
  };

  const handleSave = async () => {
    if (!username || !email) {
      setErrorMsg('Username and email cannot be empty');
      return;
    }

    const payload = { username, email, profilePicture };

    try {
      // Replace URL with your actual endpoint or simulate saving locally.
      const response = await fetch(`http://localhost:5000/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Profile updated successfully!');
        // Update user context
        setUser({ ...user, username, email, profilePicture });
      } else {
        setErrorMsg(data.msg || data.error || 'Update failed');
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Title>Edit Profile</Title>
      <Avatar.Image
        size={120}
        source={
          profilePicture
            ? { uri: profilePicture }
            : require('../assets/user.png') // Provide a default image in your assets
        }
      />
      <Button mode="outlined" onPress={pickImage} style={styles.button}>
        Change Profile Picture
      </Button>
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
      {errorMsg ? <Paragraph style={styles.error}>{errorMsg}</Paragraph> : null}
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save Changes
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center', backgroundColor: '#fff' },
  input: { width: '100%', marginVertical: 8 },
  button: { marginVertical: 8, width: '100%' },
  error: { color: 'red', textAlign: 'center', marginVertical: 8 },
});
