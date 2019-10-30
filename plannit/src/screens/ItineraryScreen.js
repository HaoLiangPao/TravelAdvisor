import React , { useState, useEffect} from "react";
import { View, StyleSheet, Button, TextInput, ScrollView, FlatList, Alert, TouchableOpacity} from "react-native";
import { Text, ListItem} from "react-native-elements";
import planitApi from "../api/planitApi";

const ItineraryScreen = ({ navigation }) => {
    console.disableYellowBox = true;
    const email = navigation.getParam("email", "NO-ID");
    const [listItinerary,setlistItinerary] = useState([]);
    const friends = [
        {name: 'friend 1'},
        {name: 'friend 2'},
        {name: 'friend 3'},
        {name: 'friend 4'}, 
        {name: 'friend 5'},
        {name: 'friend 6'},
        {name: 'friend 7'},
        {name: 'friend 8'},
        {name: 'friend 9'}
    ]
    const getItineraryApi = () => {
        const response = planitApi.post("/generateTrip",{email});
        response.then(result => {
          console.log(result.data.name);
          setlistItinerary(result.data.name);
        })
        return response;
      };


    useEffect(() => {
      getItineraryApi();
    []});
   
    
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
    <Text style={styles.textStyle}>Your Itinerary:</Text>
    <ScrollView style={styles.containerStyle} scrollEnabled={true}>
    <FlatList
        horizontal = {false}
        data={friends} 
        keyExtractor={(friend)=>friend.name}
        renderItem={({item})=>{
        return <TouchableOpacity onPress={()=>{navigation.navigate("ItineraryDetail",{"name":item.name,email})}}>
        <ListItem chevron title={item.name}
         containerStyle={styles.containerListStyle}
         titleStyle={styles.textStyle}
         />
        </TouchableOpacity>
    }}
//       data={listItinerary} 
//       renderItem={({item})=>{
//           return <Text style={styles.textStyle }>{item}</Text>
// }}
    />
  </ScrollView>   
    <Button 
    style={{ margin: 15 }}
    title="Next" 
    type="clear"
    />
    <Button 
    style={{ margin: 15 }}
    title="Back to the Preferences" 
    onPress={()=>{navigation.navigate("preference",{email})}}
    type="clear"
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
        color: 'white',
        textAlign: 'center'
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
      TextCheck:{
        color: 'white',
        fontSize: 20
      },
      containerStyle: {
        backgroundColor: "#292929",
        margin: 15,
        alignSelf: 'center',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: "#02DAC5",
        borderRadius: 20,
        width: '100%'
      },
      containerListStyle: {
        backgroundColor: "#292929",
        margin: 15,
        alignSelf: 'center',
        textAlign: 'center',
        width: '100%'
      }
    });


export default  ItineraryScreen;
