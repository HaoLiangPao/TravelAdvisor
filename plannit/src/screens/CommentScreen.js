import React, {useState} from "react";
import { View, StyleSheet, TextInput, StatusBar, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { Text, Button } from "react-native-elements";
import planitApi from "../api/planitApi";

const CommentScreen = ({ navigation }) => {
    //how to get username and password
    const email = navigation.getParam("email", "NO-ID");
    const rating = navigation.getParam("input");
    const [comment, setComment] = useState("");
    const addFeedbackAPI = () => {
        const response = planitApi.post("/addFeedback", {email, rating, comment});
        return response;
      };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
            <View>
                <StatusBar backgroundColor="#121212" barStyle="light-content" />
            </View>
            <Text style={styles.textStyle}>Comment below</Text>
            <View style={styles.textAreaContainer} >
                <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Comment..."
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    onChangeText={text => setComment(text)}
                />
            </View>
            <View style={{top:200}}>
                <Button 
                    style={{ margin: 5, alignSelf:"center"}}
                    title="Submit" 
                    onPress={()=>{
                        const my_promise = addFeedbackAPI();
                        my_promise.then(result => {
                            console.log("enteres")
                            Alert.alert(
                                "Thanks for using PlanIt!",
                                "We will generate a better trip based on your feedback",
                                [
                                  { text: "OK", onPress: () => navigation.navigate("preference",{email})}
                                ],
                                { cancelable: false }
                              )
                            })
                          }
                    }
                    type="clear"
                />
                <Button 
                    style={{ margin: 5, alignSelf:"center"}}
                    title="Back to rating" 
                    onPress={()=>{
                        navigation.navigate("rating",{email});
                    }}
                    type="clear"
                />
            </View>
        </View>
        </TouchableWithoutFeedback>
)};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#121212"
    },
    textStyle: {
        fontSize:30,
        color: 'white',
        textAlign: 'center',
        top: 80,
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
    },
    textAreaContainer: {
        borderColor: "white",
        borderWidth: 1,
        padding: 5,
        top: 200,
      },
      textArea: {
        height: 150,
        justifyContent: "flex-start",
        backgroundColor: "#292929",
        color: "white",
      }
  });


export default CommentScreen;
