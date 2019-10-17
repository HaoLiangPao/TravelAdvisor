import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends Component{
  render(){
    return (
      <View style={styles.container}>
        <Text>filter</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#121212',
  }, 
});
