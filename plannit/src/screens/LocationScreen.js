import React, {useState} from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import { Text, Button } from "react-native-elements";
import planitApi from "../api/planitApi";

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
          type="clear"
          onPress={() => {
            if (location.length  > 0){
            const my_promise = enterLocationApi();
            my_promise
              .then(result => {
                if (result.data.success === "Success") {
                  navigation.navigate("filter",{email});
                } else {
                  Alert.alert("Location not found. Please try again");
                }
              })
              .catch(error => console.error(error));
          }else{
            Alert.alert("Please Enter Valid Location");
          }}
        }
        />
        <Button 
          style={{ margin: 15 }}
          title="Back to Preference" 
          onPress={()=>{navigation.navigate("preference",{email})}}
          type="clear"
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
