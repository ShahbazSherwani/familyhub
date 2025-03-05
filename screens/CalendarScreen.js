// screens/CalendarScreen.js
import React, { useState } from 'react';
import { StyleSheet, Modal, TextInput, TouchableOpacity, FlatList, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

const initialEvents = {
  "2025-03-01": [{ title: "Farmers' Market", time: "10:00 AM" }],
  "2025-03-05": [{ title: "Seed Distribution", time: "2:00 PM" }],
  "2025-03-10": [{ title: "Investor Meeting", time: "3:00 PM" }],
};

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState(initialEvents);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('');

  // Marked dates for the calendar
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

  return (
    <View style={styles.container}>
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
      />
      {selectedDate !== '' && (
        <View style={styles.eventContainer}>
          <Title>Events on {selectedDate}</Title>
          {events[selectedDate] ? (
            <FlatList
              data={events[selectedDate]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Card style={styles.card}>
                  <Card.Content>
                    <Title>{item.title}</Title>
                    <Paragraph>{item.time}</Paragraph>
                  </Card.Content>
                </Card>
              )}
            />
          ) : (
            <Paragraph>No events for this date.</Paragraph>
          )}
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
            <Button mode="contained" onPress={addEvent} style={styles.button}>
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
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  eventContainer: { marginTop: 20 },
  card: { marginVertical: 8 },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: { width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 8, borderRadius: 4 },
  button: { marginTop: 10 },
  closeText: { marginTop: 10, color: 'red', textAlign: 'right' },
});
