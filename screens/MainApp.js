// screens/MainApp.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedScreen from '../components/AnimatedScreen';
import AnimatedIcon from '../components/AnimatedIcon';
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
        headerShown: false,
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
          return <AnimatedIcon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home">
        {props => (
          <AnimatedScreen>
            <HomeScreen {...props} />
          </AnimatedScreen>
        )}
      </Tab.Screen>
      <Tab.Screen name="Calendar">
        {props => (
          <AnimatedScreen>
            <CalendarScreen {...props} />
          </AnimatedScreen>
        )}
      </Tab.Screen>
      <Tab.Screen name="Chat">
        {props => (
          <AnimatedScreen>
            <ChatScreen {...props} />
          </AnimatedScreen>
        )}
      </Tab.Screen>
      <Tab.Screen name="Memories">
        {props => (
          <AnimatedScreen>
            <MemoryJournalScreen {...props} />
          </AnimatedScreen>
        )}
      </Tab.Screen>
      <Tab.Screen name="Challenges">
        {props => (
          <AnimatedScreen>
            <ChallengesScreen {...props} />
          </AnimatedScreen>
        )}
      </Tab.Screen>
      <Tab.Screen name="Safety">
        {props => (
          <AnimatedScreen>
            <SafetyScreen {...props} />
          </AnimatedScreen>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
