import React, {useState} from "react";
import { View, StyleSheet, TextInput, StatusBar, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Text, Button,AirbnbRating } from "react-native-elements";
import planitApi from "../api/planitApi";

const RatingScreen = ({ navigation }) => {
    //how to get username and password
    const email = navigation.getParam("email", "NO-ID");
    const [input, setInput] = useState(3);

    return (
        <View style={styles.container}>
            <View>
                <StatusBar backgroundColor="#121212" barStyle="light-content" />
            </View>
            <Text style={styles.textStyle}>How do you like this trip?</Text>
            <View style={{top:150}}>
            <AirbnbRating
                count={5}
                reviews={["Terrible", "Bad", "OK", "Good", "Amazing"]}
                defaultRating={3}
                size={50}
                onFinishRating={rating => {setInput(rating)}}
            />
            <Button style={{ margin: 15, alignSelf:"center" }} title="Next" type="clear"
                onPress={()=>navigation.navigate("comment",{email,input})}
            />
            </View>
            <View style={{ position: "absolute", top: 40, alignSelf: "flex-end" }}>
            <Button
            title="Sign Out"
            type="clear"
            onPress={() => {
                navigation.navigate("SignIn");
            }}
            />
      </View>
        </View>
)};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#121212",
    },
    textStyle: {
        fontSize:30,
        color: 'white',
        textAlign: 'center',
        top: 80,
    },
  });


export default RatingScreen;
