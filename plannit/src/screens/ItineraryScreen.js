import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
  TouchableOpacity
} from "react-native";
import { Text, ListItem, Button } from "react-native-elements";
import planitApi from "../api/planitApi";

const ItineraryScreen = ({ navigation }) => {
  console.disableYellowBox = true;
  const [change, setChange] = useState(true);
  const email = navigation.getParam("email", "NO-ID");
  const [listItinerary, setlistItinerary] = useState([]);
  const getItineraryApi = () => {
    const response = planitApi.post("/popularlist", { email });
    response.then(result => {
      setlistItinerary(result.data);
    });
    return response;
  };

  useEffect(() => {
    Alert.alert("Please wait while we load the itinerary ");
    getItineraryApi();
  }, [change]);

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
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
          onPress={() => {
            setChange(false);
            const intinerary = getItineraryApi();
          }}
          type="clear"
        />
        {/* <Button 
    style={{ margin: 15 }}
    title="Re Generate Intinerary" 
    onPress={()=>{
        Alert.alert(
            'Do you want to generate a new Intinerary',
            '',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          )
        setChange(false);
        const intinerary = getItineraryApi();
    }}
    type="clear"
    /> */}
        <ScrollView style={styles.containerStyle} scrollEnabled={true}>
          <FlatList
            horizontal={false}
            data={listItinerary}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("itineraryDetail", {
                      name: item,
                      email
                    });
                  }}
                >
                  <ListItem
                    chevron
                    title={item}
                    containerStyle={styles.containerListStyle}
                    titleStyle={styles.textStyle}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
        <Button style={{ margin: 15 }} title="Next" type="clear" 
          onPress={() => {
            navigation.navigate("rating", { email });
          }}
        />
        <Button
          style={{ margin: 15 }}
          title="Back to the Filters"
          onPress={() => {
            navigation.navigate("filter", { email });
            setChange(false);
          }}
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
