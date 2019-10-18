import React from "react";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";

const LocationScreen = ({ navigation }) => {
  //how to get username and password
  const email = navigation.getParam("email", "NO-ID");
  const [location, setLocation] = useState("");
  const enterLocationApi = () => {
    const response = planitApi.post("/enterLocation", {email, location});
    return response;
  };
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
          onChangeText={text => setLocation(text.trim())}
        />
        <Button style={{ margin: 15 }} title="Next" 
          onPress={() => {
            const my_promise = enterLocationApi();
            my_promise
              .then(result => {
                if (result.data.success == "Success") {
                  console.log("success");
                } else {
                  Alert.alert("Location not found. Please try again");
                }
              })
              .catch(error => console.error(error));
          }}
        />
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
