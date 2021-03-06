import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Text, ListItem, Button, Overlay,Icon } from "react-native-elements";
import planitApi from "../api/planitApi";
import * as CalendarExpo from 'expo-calendar';
import moment from 'moment';

const ItineraryScreen = ({ navigation }) => {
    console.disableYellowBox = true;
    const [pressed,setPressed] = useState(false);
    const [loading,setLoading] = useState(true);
    const [change,setChange] = useState(false);
    const email = navigation.getParam("email", "NO-ID");
    const back = navigation.getParam("pressed", "NO-ID");
    const [listItinerary,setlistItinerary] = useState([]);
    const TIME_NOW_IN_UTC = moment.utc();
    const getItineraryApi = () => {
        Alert.alert("Please Wait while we load the best itinerary for you ")
        const response =  planitApi.post("/getAPIList",{email});
        response.then(result => {
        setlistItinerary(result.data);
        setChange(!change);
        setLoading(true)
        })
        return response;
      };
      const  getItineraryDB = () => {
        if(back==true){
        setPressed(true)
        const response = planitApi.post("/getname",{email,'pressed':true});
        response.then(result => {
          setlistItinerary(result.data);
          console.log(result.data)
          setLoading(true)
        })
        return response
      }
      else{
        const response = planitApi.post("/getname",{email,pressed});
        response.then(result => {
          setlistItinerary(result.data);
      })
      return response;
    }
        
      }; 
      const utcDateToString = (momentInUTC) => {
        let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        return s;
      }
    useEffect(() => {
        getItineraryDB();
    }, [change]);
   
   
    return (
    <View style={{flex:1, backgroundColor:'black'}}>
       {/* <Overlay isVisible={loading}>
      <Icon type="antdesign" name="loading"/>
      <Button onPress={()=>{setLoading(false)}}></Button>
    </Overlay> */}
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
    <Text style={styles.textStyle}>Your Itinerary:</Text>
    <Button 
    style={{ margin: 15 }}
    title="Generate Intinerary" 
    onPress={()=>{
        setPressed(true);
        // setChange(false);
        const intinerary = getItineraryApi();
    }}
    type="clear"
    />
    <ScrollView style={styles.containerStyle} scrollEnabled={true}>
    <FlatList
        horizontal = {false}
        data={listItinerary}
        renderItem={({item})=>{
        return <TouchableOpacity onPress={()=>{navigation.navigate("itineraryDetail",{"name":item,email})}}>
        <ListItem chevron title={item}
         containerStyle={styles.containerListStyle}
         titleStyle={styles.textStyle}
         />
        </TouchableOpacity>
    }}
    />
  </ScrollView> 
  <Button 
    style={{ margin: 15 }}
    title="Export calendar for itinerary" 
    onPress={()=>{
      // addEventCalender();
        // setChange(change + 1);

    }}
    type="clear"
    />  
    <Button 
    style={{ margin: 15 }}
    title="Next" 
    onPress={()=>{
      navigation.navigate("rating",{email})
    }}
    type="clear"
    />
    <Button 
    style={{ margin: 15 }}
    title="Back to the Filters" 
    onPress={()=>{
        navigation.navigate("filter",{email})
        setChange(!change);

    }}
    type="clear"
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
    width: "100%"
  },
  containerListStyle: {
    backgroundColor: "#292929",
    margin: 15,
    alignSelf: "center",
    // textAlign: 'center',
    width: "100%"
  }
});

export default ItineraryScreen;
