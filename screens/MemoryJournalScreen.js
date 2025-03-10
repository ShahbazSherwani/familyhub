// screens/MemoryJournalScreen.js
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, FlatList, Alert } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

const initialMemories = [
  { id: '1', imageUrl: 'https://via.placeholder.com/150', caption: 'Family Picnic', timestamp: '2025-03-01' },
  { id: '2', imageUrl: 'https://via.placeholder.com/150', caption: 'Holiday Celebration', timestamp: '2025-03-05' },
  { id: '3', imageUrl: 'https://via.placeholder.com/150', caption: 'Birthday Party', timestamp: '2025-03-10' },
];

export default function MemoryJournalScreen() {
  const [memories, setMemories] = useState(initialMemories);

  const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Permission to access media library is needed to add a memory.');
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets ? result.assets[0].uri : result.uri;
      // Here you might want to upload the image to your server or a storage service.
      // For now, we’ll add it as a new memory locally with a dummy caption.
      const newMemory = {
        id: Date.now().toString(),
        imageUrl: uri,
        caption: 'New Memory',
        timestamp: new Date().toISOString().split('T')[0],
      };
      setMemories([newMemory, ...memories]);
    }
  };

  const renderItem = ({ item }) => (
    <Card style={[styles.card, { width: CARD_WIDTH }]}>
      <Card.Cover source={{ uri: item.imageUrl }} />
      <Card.Content>
        <Title>{item.caption}</Title>
        <Paragraph>{item.timestamp}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Title style={styles.heading}>Memory Journal</Title>
      <FlatList
        data={memories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
      <Button mode="contained" style={styles.button} onPress={pickImage}>
        Add Memory
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: { marginBottom: 16 },
  card: { marginBottom: 16 },
  button: { marginTop: 16 },
});
