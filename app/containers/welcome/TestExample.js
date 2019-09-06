import React, { Component } from 'react';
import { View, StyleSheet, } from 'react-native';
import MonthYearDialog from '../../components/custom/MonthYearDialog'

export default class App extends Component {


  render() {
    return (
      <View style={styles.container}>

        <MonthYearDialog 
        visible={true}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
  },
});
