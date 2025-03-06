// screens/CalendarScreen.js
import React, { useState } from 'react';
import { StyleSheet, Modal, TextInput, TouchableOpacity, FlatList, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

export default function CalendarScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState({
    "2025-03-01": [{ title: "Farmers' Market", time: "10:00 AM" }],
    "2025-03-05": [{ title: "Seed Distribution", time: "2:00 PM" }],
    "2025-03-10": [{ title: "Investor Meeting", time: "3:00 PM" }],
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('');

  // Prepare marked dates for the calendar
  const markedDates = Object.keys(events).reduce((acc, date) => {
    acc[date] = { marked: true, dotColor: '#2196F3' };
    return acc;
  }, {});

  const addEvent = () => {
    if (!newEventTitle.trim() || !newEventTime.trim()) return;
    const event = { title: newEventTitle, time: newEventTime };
    setEvents(prevEvents => {
      const dayEvents = prevEvents[selectedDate] || [];
      return { ...prevEvents, [selectedDate]: [...dayEvents, event] };
    });
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
      {/* Custom header */}
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
      
      {/* Calendar with a top margin to avoid header overlap */}
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
          {events[selectedDate] ? (
            <FlatList
              data={events[selectedDate]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderEventItem}
            />
          ) : (
            <Paragraph>No events for this date.</Paragraph>
          )}
        </View>
      )}

      {/* Modal to add an event */}
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
