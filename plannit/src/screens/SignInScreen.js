import React, { useState } from "react";
import { View, StyleSheet, TextInput, Alert, StatusBar } from "react-native";
import { Text, Button} from "react-native-elements";
import planitApi from "../api/planitApi";

const SignInScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");

  const SignInApi = () => {
    const response = planitApi.post("/signin", { email, password });

    return response;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <StatusBar barStyle="light-content"/>
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
            Login
          </Text>
        </View>
        <TextInput
          placeholder="  Enter Email"
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
        <Button
          style={{ margin: 15 }}
          title="Sign In"
          type="clear"
          onPress={() => {
            if (password.length > 1 && email.length > 1) {
              const my_promise = SignInApi();
              my_promise
                .then(result => {
                  if (result.data.success === "Success") {
                    navigation.navigate("location", { email });
                  } else {
                    Alert.alert(
                      "Invalid E-mail or password",
                      "Please try again or create an account."
                    );
                  }
                })
                .catch(error => console.error(error));
            } else {
              Alert.alert("Please Enter valid email and password");
            }
          }}
        />
        <Button
          style={{ margin: 20 }}
          title="Don't have an account? Click here!"
          type="clear"
          onPress={() => navigation.navigate("SignUp")}
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

export default SignInScreen;
