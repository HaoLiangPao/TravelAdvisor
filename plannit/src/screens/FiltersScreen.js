import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
  Picker,
  StatusBar
} from "react-native";
import { Text, Button, Slider } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import planitApi from "../api/planitApi";
import { max } from "moment";
import RNPickerSelect from "react-native-picker-select";

//budget , range, start end time, average time per activity
const FiltersScreen = ({ navigation }) => {
  const [maxactivity, setMaxactivity] = useState("5");
  const [budget, setBudget] = useState(300);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [distance, setDistance] = useState(50);
  const [transport, setTransport] = useState("driving");
  let filter = {
    StartDateAndTime: startDate,
    EndingDateAndTime: endDate,
    radius: distance / 2,
    Budget: budget,
    activity_num: maxactivity,
    transport_method: transport
  };
  let email = navigation.getParam("email", "NO-ID");
  const SendFilterApi = () => {
    const response = planitApi.post("/addFilter", { email, filter });

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
        <ScrollView style={styles.centerBox}>
          <Text h3 style={{ color: "white", textAlign: "center" }}>
            Filters
          </Text>
          <View
            style={{ alignItems: "stretch", justifyContent: "center", top: 20 }}
          >
            <Slider
              value={300}
              minimumValue={0}
              maximumValue={1000}
              onValueChange={value => setBudget(value)}
              step={5}
              thumbTintColor={"#02DAC5"}
              style={{ bottom: 10 }}
            />
            <Text
              h4
              style={{
                color: "white",
                textAlign: "left",
                margin: 5,
                bottom: 5
              }}
            >
              Budget : {budget}
            </Text>
          </View>
          <View
            style={{
              top: 20,
              borderBottomColor: "white",
              borderBottomWidth: 2
            }}
          />
          <View
            style={{
              alignSelf: "flex-start",

              top: 20,
              flexDirection: "row"
            }}
          >
            <Text h4 style={{ color: "white", textAlign: "left", margin: 3 }}>
              Number of activities:
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={value => {
                setMaxactivity(value);
              }}
              placeholder="Enter Number"
            />
          </View>
          <View
            style={{
              top: 17,
              borderBottomColor: "white",
              borderBottomWidth: 2
            }}
          />
          <Text
            h4
            style={{ color: "white", textAlign: "left", margin: 5, top: 11 }}
          >
            Starting Date and Time:
          </Text>
          <View style={{ top: 20 }}>
            <DatePicker
              style={{ width: 200 }}
              date={startDate}
              mode="datetime"
              placeholder="select date and time"
              format="YYYY-MM-DD HH:mm"
              minDate="2019-11-01"
              maxDate="2025-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                },
                placeholderText: {
                  color: "white"
                },
                dateText: {
                  color: "white"
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                setStartDate(date);
              }}
            />
          </View>
          <Text
            h4
            style={{ color: "white", textAlign: "left", margin: 5, top: 25 }}
          >
            Ending Date and Time:
          </Text>
          <View style={{ top: 20 }}>
            <DatePicker
              style={{ width: 200 }}
              date={endDate}
              mode="datetime"
              placeholder="select date and time"
              format="YYYY-MM-DD HH:mm"
              minDate="2019-11-01"
              maxDate="2025-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                },
                placeholderText: {
                  color: "white"
                },
                dateText: {
                  color: "white"
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                setEndDate(date);
              }}
            />
          </View>
          <View
            style={{
              top: 26,
              borderBottomColor: "white",
              borderBottomWidth: 2
            }}
          />
          <View
            style={{ alignItems: "stretch", justifyContent: "center", top: 60 }}
          >
            <Slider
              value={50}
              minimumValue={0}
              maximumValue={200}
              onValueChange={value => setDistance(value)}
              step={5}
              thumbTintColor={"#02DAC5"}
              style={{ bottom: 30 }}
            />
            <Text
              h4
              style={{
                color: "white",
                textAlign: "left",
                bottom: 15,
                margin: 3,
                padding: 3,
                bottom: 30
              }}
            >
              Max Distance : {distance}Km
            </Text>
          </View>
          <View
            style={{
              top: 26,
              borderBottomColor: "white",
              borderBottomWidth: 2
            }}
          />
          <View style={{ top: 20 }}>
            <Text
              h4
              style={{
                top: 10,
                color: "white",
                textAlign: "center"
              }}
            >
              Choose Transportation Method:
            </Text>
          </View>
          <View style={{ top: 20, flex: 1 }}>
            <Picker
              selectedValue={transport}
              itemStyle={styles.picker}
              onValueChange={value => setTransport(value)}
            >
              <Picker.Item label="Car" value="driving" />
              <Picker.Item label="Public Transport" value="transit" />
              <Picker.Item label="Walk" value="walking" />
              <Picker.Item label="Bicycling" value="bicycling" />
            </Picker>
          </View>
        </ScrollView>

        <View style={{ top: 20 }}>
          <Button
            title="Next"
            type="clear"
            onPress={() => {
              if (startDate === "" || endDate == "") {
                Alert.alert("Please fill Start and End date");
              } else if (startDate > endDate) {
                Alert.alert("Start date must come before end date");
              } else if (transport === "") {
                Alert.alert("Please enter transport method");
              } else {
                const Promise = SendFilterApi();
                Promise.then(result => {
                  navigation.navigate("itinerary", { email });
                });
              }
            }}
          />
        </View>
      </View>
      <View
        style={{ position: "absolute", bottom: 20, alignSelf: "center" }}
      >
        <Button
          title="Go Back"
          type="clear"
          onPress={() => {
            navigation.navigate("location", { email });
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
    </View>
  );
};

const styles = StyleSheet.create({
  headline1: {
    color: "#FFFFFF",
    top: 40
  },
  headline2: {
    color: "#0092CC",
    top: 40
  },
  headline3: {
    color: "#FFFFFF"
  },
  textInput: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18
  },
  centerBox: {
    backgroundColor: "#292929",
    // flex: 1,
    margin: 15,
    height: 500,
    borderWidth: 2,
    borderColor: "#02DAC5",
    borderRadius: 20,
    flexDirection: "column",
    color: "white",
    bottom: 40,
    top: 10
  },
  picker: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "#FFFFFF"
  }
});

export default FiltersScreen;
