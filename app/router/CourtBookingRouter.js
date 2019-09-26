import React from 'react'

import { createStackNavigator } from "react-navigation";
import CurrentBooking from '../containers/court_booking/CurrentBooking';
import CourtAcademyListing from '../containers/court_booking/CourtAcademyListing'
import ChooseTimeDate from '../containers/court_booking/ChooseTimeDate'
import PaymentPage from '../containers/court_booking/PaymentPage'
import Registration from "../containers/tournament/Registration";

import NavigationDrawerStructure from './NavigationDrawerStructure'
import RightMenuToolbar from "./RightMenuToolbar";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const BookPlayModule = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  CurrentBooking: {
    screen: CurrentBooking,
    navigationOptions: ({ navigation }) => ({
      title: 'Book and play',
      headerTitleStyle: style.headerStyle,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation}
        showDrawer={true}
        showBackAction={false}
      />,
      headerRight: <RightMenuToolbar navigationProps={navigation}
        navigation={navigation} showNotification={true} />,
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },

      headerTintColor: '#000',
    }),
  },
  CourtAcademyListing: {
    screen: CourtAcademyListing,
    navigationOptions: ({ navigation }) => ({
      title: 'Book and play',
      headerTitleStyle: style.headerStyle,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation}
        showBackAction={true}
        showDrawer={true}
      />,
      headerRight: <RightMenuToolbar navigationProps={navigation}
        navigation={navigation} showNotification={false} />,
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },

      headerTintColor: '#000',
    }),
  },
  ChooseTimeDate: {
    screen: ChooseTimeDate,
    navigationOptions: ({ navigation }) => ({
      title: 'Book and play',
      headerTitleStyle: style.headerStyle,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation}
        showBackAction={true}
        showDrawer={true}
      />,
      headerRight: <RightMenuToolbar navigationProps={navigation}
        navigation={navigation} showNotification={false} />,
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },

      headerTintColor: '#000',
    }),
  },
  Registration: {
    screen: Registration,
  },
  PaymentPage: {
    screen: PaymentPage,
  }

});

export default BookPlayModule;

const style = StyleSheet.create({
  headerStyle: {
    color: '#191919',
    fontFamily: 'Quicksand-Medium',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 16,
    flexGrow: 1,
    alignSelf: 'center',
  }
})