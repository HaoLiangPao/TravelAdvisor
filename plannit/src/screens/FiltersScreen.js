import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Alert
} from "react-native";
import { Text, Button, Slider } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import planitApi from "../api/planitApi";

//budget , range, start end time, average time per activity
const FiltersScreen = ({ navigation }) => {
  const [budget, setBudget] = useState(300);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [distance, setDistance] = useState(50);
  let filter = {
    StartDateAndTime: startDate,
    EndingDateAndTime: endDate,
    radius: distance / 2,
    Budget: budget
  };
  let email = navigation.getParam("email", "NO-ID");
  const SendFilterApi = () => {
    const response = planitApi.post("/addFilter", { email, filter });

    return response;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
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
        <View style={styles.centerBox}>
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
            <Text h4 style={{ color: "white", textAlign: "left", margin: 5 }}>
              Budget : {budget}
            </Text>
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
              format="YYYY-MM-DD HH:MM"
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
              placeholder="select date"
              format="YYYY-MM-DD HH:MM"
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
              style={{ bottom: 10 }}
            />
            <Text
              h4
              style={{
                color: "white",
                textAlign: "left",
                bottom: 15,
                margin: 3,
                padding: 3
              }}
            >
              Max Distance : {distance}Km
            </Text>
          </View>
        </View>
        <View style={{ top: 20 }}>
          <Button
            title="Next"
            type="clear"
            onPress={() => {
              if (startDate === "" || endDate == "") {
                Alert.alert("Please fill Start and End date");
              } else if (startDate > endDate) {
                Alert.alert("Start date must come before end date");
              } else {
                const Promise = SendFilterApi();
                Promise.then(result => {
                  console.log(result.data === "Success");
                  navigation.navigate("itinerary", { email });
                });
              }
            }}
          />
        </View>
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
  },
  centerBox: {
    backgroundColor: "#292929",
    flex: 1,
    margin: 15,
    height: 100,
    borderWidth: 2,
    borderColor: "#02DAC5",
    borderRadius: 20,
    flexDirection: "column",
    color: "white"
  }
});

export default FiltersScreen;
