import React from "react";
import { View, StyleSheet, Text, Button, CheckBox, TextInput } from "react-native";
// import 

const PreferencesScreen = () => {
    const [value1,setValue1]= useState(false);
    const [value2,setValue2]= useState(false);
    const [value3,setValue3]= useState(false);
    const [value4,setValue4]= useState("");
    
    return (
    <View style={{flex:1, backgroundColor:'black'}}>
      <View style={styles.upperBox}>
        <Text h1 style={styles.headline1}>
          Plan
        </Text>
        <Text h1 style={styles.headline2}>
          It
        </Text>
      </View>
    <Text style={styles.textStyle}>Select Preferences:</Text>
    <CheckBox
    center
    containerStyle = {styles.containerStyle}
      textStyle ={styles.TextCheck}
      title='Museums'
      onPress={()=>{ }}
      checked={value1}  
    />
    
    <CheckBox
      center
      containerStyle = {styles.containerStyle}
      textStyle ={styles.TextCheck}
      title='Sports'
      onPress={()=>{
        setValue2(!value2);
    }}
    checked={value2}
    />
    
    <CheckBox style={styles.textInput}
      center
      containerStyle = {styles.containerStyle}
      textStyle ={styles.TextCheck}
      title='Parks'
      onPress={()=>{
        setValue3(!value3);
    }}
    checked={value3}
    />
    <Text style={styles.textStyle}>Additional Preferences:</Text>
    <TextInput style={styles.textInput}
      placeholder='Input preferences'
      autoCorrect = {false}
      onChangeText={(newValue)=>setValue4(newValue.trim())}
      value={value4}
    />
    <Button
     style={{ margin: 15 }}
      title="Save" 
      onPress={()=>{}}
    />
    </View>
    )};
    
    const styles = StyleSheet.create({
      container:{
        flex:1,
        backgroundColor: '#121212',
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
        fontSize:40
      },
      headline2: {
        color: "#0092CC",
        top: 80,
        fontSize:40
      },
    textStyle: {
        fontSize: 25,
        color: 'white'
        },
    HeaderTwo: {
        fontSize: 30
    },
    textInput: {
        backgroundColor: "#292929",
        color: "white",
        margin: 15,
        height: 50,
        borderWidth: 2,
        textAlign: "center",
        borderColor: "#02DAC5",
        borderRadius: 20
      },
      TextCheck:{
        color: 'white',
        fontSize: 20
      },
      containerStyle: {
        backgroundColor: "#292929",
        margin: 15,
        height: 50,
        borderWidth: 2,
        borderColor: "#02DAC5",
        borderRadius: 20
      }
    });


export default  PreferencesScreen;
