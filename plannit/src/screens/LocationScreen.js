import React from "react";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";

const LocationScreen = ({ navigation }) => {
  //how to get username and password
  const email = navigation.getParam("email", "NO-ID");
  console.log(email);
  return (
    <View style={styles.container}>
      <View style={styles.upperBox}>
        <Text h1 style={styles.headline1}>
          Plan
        </Text>
        <Text h1 style={styles.headline2}>
          It
        </Text>
      </View>
      <View style={styles.middleBox}>
        <TextInput
          placeholder="Enter a location"
          placeholderTextColor="#fff"
          style={styles.textInput}
        />
        <Button style={{ margin: 15 }} title="Next" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212"
  },
  middleBox: {
    flex: 4,
    flexDirection: "column",
    justifyContent: "center",
    bottom: 80
  },
  upperBox: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center"
  },
  headline1: {
    color: "#FFFFFF",
    top: 80,
    fontSize: 40
  },
  headline2: {
    color: "#0092CC",
    top: 80,
    fontSize: 40
  },
  textInput: {
    backgroundColor: "#292929",
    color: "white",
    margin: 15,
    height: 40,
    borderWidth: 2,
    textAlign: "center",
    borderColor: "#02DAC5",
    borderRadius: 20
  }
});

export default LocationScreen;
