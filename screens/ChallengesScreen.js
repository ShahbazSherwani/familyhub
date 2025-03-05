// screens/ChallengesScreen.js
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const initialChallenges = [
  { id: '1', title: 'Plant 100 Trees', description: 'Help reforest the area', progress: 50, completed: false, points: 100 },
  { id: '2', title: 'Community Clean-up', description: 'Clean up the local park', progress: 80, completed: false, points: 50 },
  { id: '3', title: 'Water Conservation', description: 'Reduce water usage by 20%', progress: 100, completed: true, points: 75 },
];

export default function ChallengesScreen() {
  const [challenges, setChallenges] = useState(initialChallenges);

  const completeChallenge = (id) => {
    setChallenges(prev =>
      prev.map(challenge =>
        challenge.id === id ? { ...challenge, completed: true, progress: 100 } : challenge
      )
    );
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.description}</Paragraph>
        <Paragraph>Progress: {item.progress}%</Paragraph>
        <Paragraph>{item.points} points</Paragraph>
        {item.completed ? (
          <Paragraph style={{ color: 'green' }}>Completed</Paragraph>
        ) : (
          <Button mode="contained" onPress={() => completeChallenge(item.id)}>
            Complete
          </Button>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Title style={styles.heading}>Challenges</Title>
      <FlatList
        data={challenges}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: { marginBottom: 16 },
  card: { marginBottom: 16 },
});
