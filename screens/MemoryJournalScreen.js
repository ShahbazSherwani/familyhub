// screens/MemoryJournalScreen.js
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, FlatList } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

const initialMemories = [
  { id: '1', imageUrl: 'https://via.placeholder.com/150', caption: 'Family Picnic', timestamp: '2025-03-01' },
  { id: '2', imageUrl: 'https://via.placeholder.com/150', caption: 'Holiday Celebration', timestamp: '2025-03-05' },
  { id: '3', imageUrl: 'https://via.placeholder.com/150', caption: 'Birthday Party', timestamp: '2025-03-10' },
];

export default function MemoryJournalScreen() {
  const [memories, setMemories] = useState(initialMemories);

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
      <Button mode="contained" style={styles.button} onPress={() => alert('Add Memory - Implement Image Picker')}>
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
