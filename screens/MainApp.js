// screens/MainApp.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import CalendarScreen from './CalendarScreen';
import ChatScreen from './ChatScreen';
import MemoryJournalScreen from './MemoryJournalScreen';
import ChallengesScreen from './ChallengesScreen';
import SafetyScreen from './SafetyScreen';

const Tab = createBottomTabNavigator();

export default function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Calendar':
              iconName = 'calendar';
              break;
            case 'Chat':
              iconName = 'message-circle';
              break;
            case 'Memories':
              iconName = 'image';
              break;
            case 'Challenges':
              iconName = 'award';
              break;
            case 'Safety':
              iconName = 'shield';
              break;
            default:
              iconName = 'circle';
          }
          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Memories" component={MemoryJournalScreen} />
      <Tab.Screen name="Challenges" component={ChallengesScreen} />
      <Tab.Screen name="Safety" component={SafetyScreen} />
    </Tab.Navigator>
  );
}
