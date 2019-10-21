import React , { useState }from "react";
import { View, StyleSheet, Button, TextInput, ScrollView, FlatList} from "react-native";
import { Text } from "react-native-elements";
import planitApi from "../api/planitApi";

const PreferencesScreen = ({ navigation }) => {
    const [preference,setPreference]= useState("");
    const email = navigation.getParam("email", "NO-ID");
    const enterPreferenceApi = () => {
      const response = planitApi.post("/addPref", {preference,email});
      return response;
    };
    // const getPreference = () => {
    //   const response2 = planitApi.get("/getPref",{email});
    //   return response2;
    // };
    const listPreferences = [{preference:'No preferences'}];
    
    return (
    <View style={{flex:1, backgroundColor:'black'}}>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
      <View style={styles.upperBox}>
        <Text h1 style={styles.headline1}>
          Plan
        </Text>
        <Text h1 style={styles.headline2}>
          It
        </Text>
      </View>
      </View>
    <View style={styles.middleBox}>
    <Text style={styles.textStyle}>Your Preferences:</Text>
    <ScrollView style={styles.containerStyle}>
    <FlatList
      horizontal = {false}
      keyExtractor={(Preference)=>Preference.preference}
      data={listPreferences} 
      renderItem={({item})=>{
          return <Text style={styles.textStyle }>{item.preference}</Text>
}}
/>
  </ScrollView>
    <Text style={styles.textStyle}>Add Preferences:</Text>
    <TextInput style={styles.textInput}
      placeholder='Input preferences'
      autoCorrect = {false}
      onChangeText={(newValue)=>setPreference(newValue.trim())}
    />
    <Button
     style={{ margin: 15 }}
      title="Add" 
      type="clear"
      onPress={()=>{
        const my_pref = enterPreferenceApi();
          my_pref
            .then(result => {
              if (result.data.success == "Success") {
                alert("Preference Added Successfully");
                // navigation.navigate("filter");
                
              }
              else{
                alert("Preference not added");
              }
            })
      }}
    />
    <Button 
    style={{ margin: 15 }}
    title="Next" 
    type="clear"
    // navigation.navigate("filter");
    />
    </View>
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
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: "#02DAC5",
        borderRadius: 20,
        width: '75%'
      }
    });


export default  PreferencesScreen;
