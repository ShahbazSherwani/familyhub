import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Modal, TextInput, TouchableOpacity, FlatList, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../contexts/AuthContext';

// Replace with your deployed server URL or local IP
const SERVER_URL = 'http://localhost:5000';

export default function CalendarScreen({ navigation }) {
  const { user } = useContext(AuthContext); // current logged-in user
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState([]); // We'll store array of events from server
  const [modalVisible, setModalVisible] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('');

  // Fetch all events on mount
  useEffect(() => {
    fetch(`${SERVER_URL}/api/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  }, []);

  // Convert events array into markedDates object for react-native-calendars
  const markedDates = events.reduce((acc, event) => {
    // event.date is something like "2025-03-27"
    acc[event.date] = { marked: true, dotColor: '#2196F3' };
    return acc;
  }, {});

  const getEventsForDate = (date) => {
    return events.filter((ev) => ev.date === date);
  };

  const addEvent = async () => {
    if (!newEventTitle.trim() || !newEventTime.trim()) return;
    if (!user) {
      alert('You must be logged in to add events');
      return;
    }
    const eventData = {
      title: newEventTitle,
      time: newEventTime,
      date: selectedDate,
      createdBy: user.id,
    };
    try {
      const res = await fetch(`${SERVER_URL}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
      if (res.ok) {
        const newEvent = await res.json();
        // Add to local state so we see it right away
        setEvents((prev) => [...prev, newEvent]);
      } else {
        console.error('Error adding event');
      }
    } catch (err) {
      console.error(err);
    }
    setNewEventTitle('');
    setNewEventTime('');
    setModalVisible(false);
  };

  const renderEventItem = ({ item, index }) => (
    <Card key={index} style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.time}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Custom header with Profile & Settings icons */}
      <View style={styles.customHeader}>
        <IconButton
          icon={() => <Feather name="user" size={24} color="#000" />}
          onPress={() => navigation.navigate('Profile')}
        />
        <Title style={styles.headerTitle}>Calendar</Title>
        <IconButton
          icon={() => <Feather name="settings" size={24} color="#000" />}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
      
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          setModalVisible(true);
        }}
        markedDates={markedDates}
        theme={{
          todayTextColor: '#2196F3',
          selectedDayBackgroundColor: '#2196F3',
          arrowColor: '#2196F3',
        }}
        style={{ marginTop: 60 }}
      />

      {selectedDate !== '' && (
        <View style={styles.eventContainer}>
          <Title>Events on {selectedDate}</Title>
          <FlatList
            data={getEventsForDate(selectedDate)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderEventItem}
            ListEmptyComponent={<Paragraph>No events for this date.</Paragraph>}
          />
        </View>
      )}

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Title>Add Event for {selectedDate}</Title>
            <TextInput
              style={styles.input}
              placeholder="Event Title"
              value={newEventTitle}
              onChangeText={setNewEventTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Event Time (e.g., 10:00 AM)"
              value={newEventTime}
              onChangeText={setNewEventTime}
            />
            <Button mode="contained" onPress={addEvent} style={styles.modalButton}>
              Add Event
            </Button>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Paragraph style={styles.closeText}>Close</Paragraph>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  customHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  eventContainer: { padding: 16 },
  card: { marginVertical: 4 },
  modalContainer: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalContent: { 
    width: '80%', 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 8 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginVertical: 8, 
    borderRadius: 4 
  },
  modalButton: { marginTop: 10 },
  closeText: { marginTop: 10, color: 'red', textAlign: 'right' },
});

