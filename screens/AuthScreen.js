import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function AuthScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Authentication Screen</Text>
      <Button title="Login" onPress={() => navigation.replace("MainApp")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
