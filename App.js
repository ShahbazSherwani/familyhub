// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, IconButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { AuthProvider } from './contexts/AuthContext';

// Import your screens
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainApp from './screens/MainApp';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name="Main"
              component={MainApp}
              options={({ navigation }) => ({
                headerTitle: 'Family Hub',
                headerLeft: () => (
                  <IconButton
                    icon={() => <Feather name="user" size={24} />}
                    onPress={() => navigation.navigate('Profile')}
                  />
                ),
                headerRight: () => (
                  <IconButton
                    icon={() => <Feather name="settings" size={24} />}
                    onPress={() => navigation.navigate('Settings')}
                  />
                ),
              })}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerTitle: 'Profile' }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerTitle: 'Settings' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}
