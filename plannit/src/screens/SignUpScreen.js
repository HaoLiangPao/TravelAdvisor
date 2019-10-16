import React, { useState } from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import { Text, Button } from "react-native-elements";
import planitApi from "../api/planitApi";

const SignUpScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [email, setemail] = useState("");

  const SignUpApi = () => {
    const response = planitApi.post("/signup", { email, password });

    return response;
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <Text h1 style={styles.headline1}>
          Plan
        </Text>
        <Text h1 style={styles.headline2}>
          It
        </Text>
      </View>
      <View
        style={{
          flex: 4,
          flexDirection: "column",
          justifyContent: "center",
          bottom: 80
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text h4 style={styles.headline3}>
            Create Account
          </Text>
        </View>
        <TextInput
          placeholder="  Enter E-mail"
          style={styles.textInput}
          placeholderTextColor="white"
          onChangeText={text => setemail(text.trim())}
        />
        <TextInput
          placeholder="  Enter Password"
          style={styles.textInput}
          secureTextEntry={true}
          placeholderTextColor="white"
          onChangeText={text => setPassword(text.trim())}
        />
        <TextInput
          placeholder="  Confirm Password"
          style={styles.textInput}
          secureTextEntry={true}
          placeholderTextColor="white"
          onChangeText={text => setCPassword(text.trim())}
        />
        <Button
          style={{ margin: 15 }}
          title="Create Account"
          type="clear"
          onPress={() => {
            // match regex for username - ensures correct username
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
              if (password === cpassword) {
                if (password.length > 6) {
                  const my_promise = SignUpApi();
                  my_promise
                    .then(result => {
                      if (result.data.success === "Success") {
                        navigation.navigate('mainFlow')
                      }
                      else{
                        Alert.alert(
                          "E-mail already exists",
                          "Try logging in instead?"
                        );
                      }
                    })
                    .catch(error => console.error(error));
                } else {
                  Alert.alert(
                    "Password not long enough, please try again.",
                    "Minimum characters is 7"
                  );
                }
              } else {
                Alert.alert("Passwords do not match, please try again");
              }
            } else {
              Alert.alert("Please enter valid e-mail");
            }
          }}
        />
        <Button
          style={{ margin: 20 }}
          title="Already have an account? Click here!"
          type="clear"
          onPress={() => navigation.navigate("SignIn")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headline1: {
    color: "#FFFFFF",
    top: 100
  },
  headline2: {
    color: "#0092CC",
    top: 100
  },
  headline3: {
    color: "#FFFFFF"
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

export default SignUpScreen;
