import React , { useState, useEffect} from "react";
import { View, StyleSheet, TextInput, ScrollView, FlatList, Alert,TouchableOpacity, StatusBar, KeyboardAvoidingView } from "react-native";
import { Text ,ListItem,Button, Icon} from "react-native-elements";
import planitApi from "../api/planitApi";

const PreferencesScreen = ({ navigation }) => {
    console.disableYellowBox = true;
    const [change,setChange] = useState(true);
    const [preference,setPreference]= useState("");
    const [delpreference,setdelPreference]= useState("");
    const [listPreferences,setlistPreferences] = useState([]);
    const email = navigation.getParam("email", "NO-ID");
    const rightButtons = [];
    const enterPreferenceApi = () => {
      const response = planitApi.post("/addPref", {preference,email});
      response.then(result=>{
        setChange(!change);
      })
      return response;
    };
    const deletePreferenceApi = (item) => {
      // console.log(delpreference)
      const responseDel = planitApi.post("/deletePref", {"delpreference":item,email});
      responseDel.then(result=>{
        setChange(!change);
      })
      // console.log(delpreference);
      return responseDel;
    };
    const getPreferenceApi = () => {
      const response2 = planitApi.post("/getPref",{email});
      response2.then(result2 => {
        setlistPreferences(result2.data);
      })
      return response2;
    };
    useEffect(() => {
        getPreferenceApi();
      // Your code here
    }, [change]);
   
    return (
      <KeyboardAvoidingView style={{flex:1, backgroundColor:'black'}} behavior="padding" enabled> 
      <StatusBar barStyle="light-content"/>
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
    <ScrollView style={styles.containerStyle} scrollEnabled={true}>
    <FlatList
      horizontal = {false}
      data={listPreferences} 
      renderItem={({item})=>{
        return <TouchableOpacity onPress={()=>{
          console.log(item)
          title="Delete"
            Alert.alert(
              "Are you sure you want to delete this preference?",
              "",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => {
                  deletePreferenceApi(item) 
                  console.log("OK Pressed") 
                }
              }
              ],
              { cancelable: false }
            )
          type="clear"
          // setdelPreference(item)
                     
        }}>
        <ListItem title={item}
         containerStyle={styles.containerListStyle}
         titleStyle={styles.textStyle} rightIcon={<Icon type="antdesign" name="delete" color="red"/>}
         />
        </TouchableOpacity>}}
/>
  </ScrollView>
  
    <Text style={styles.textStyle}>Add Preferences:</Text>
    <TextInput style={styles.textInput}
      placeholder='Input preferences'
      placeholderTextColor="#fff"
      autoCorrect = {false}
      onChangeText={(newValue)=>setPreference(newValue.trim())}
    />
    
    <Button
      title="Add" 
      type="clear"
      onPress={()=>{
        
        if(preference.length>0){
        const my_pref = enterPreferenceApi();
          my_pref
            .then(result => {
              if (result.data === "Success") {
                alert("Preference Added Successfully");
                // navigation.navigate("filter");
                
              }
              else{
                alert("Preference not added");
              }
            })
      }
      else{
        Alert.alert("Please enter a preference");
      }
    }
    }
    />
    <Button 
      title="Next" 
      type="clear"
      onPress={()=>{
        navigation.navigate("location",{email});
      }}
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
      </KeyboardAvoidingView>
    )};
    
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
      top: 70,
      fontSize: 40
    },
    headline2: {
      color: "#0092CC",
      top: 70,
      fontSize: 40
    },
    textStyle: {
      fontSize: 25,
      color: "white",
      textAlign: "center"
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
  
      borderColor: "#02DAC5",
      borderRadius: 20
    },
    TextCheck: {
      color: "white",
      fontSize: 20
    },
    containerStyle: {
      backgroundColor: "#292929",
      margin: 15,
      alignSelf: "center",
      textAlign: "center",
      borderWidth: 2,
      borderColor: "#02DAC5",
      borderRadius: 20,
      width: "75%"
    },
    containerListStyle: {
      backgroundColor: "#292929",
      margin: 15,
      alignSelf: "center",
      // textAlign: 'center',
      width: "100%"
    }
  });
export default PreferencesScreen;
