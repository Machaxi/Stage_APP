import * as React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import UpcomingRoute from './UpcomingRoute'
import RegisteredRoute from './RegisteredRoute'
import ResultsRoute from './ResultsRoute'
import BaseComponent, { defaultStyle } from '../BaseComponent';


export default class TournamentTabs extends BaseComponent {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Upcoming' },
      { key: 'second', title: 'Registered' },
      { key: 'third', title: 'Results' }
    ],
  };
  componentDidMount() {

    if (userData.user['user_type'] == 'PLAYER' || userData.user['user_type'] == 'FAMILY') {
      this.props.navigation.setParams({ Title: "Switch Player" });
    } else if (userData.user['user_type'] == 'COACH') {
      this.props.navigation.setParams({ Title: "Switch Academy" });
    } else {
      this.props.navigation.setParams({ Title: "" });
    }
  }

  static navigationOptions = ({ navigation }) => {

    return {
      headerTitle: 'Tournament',
      headerTitleStyle: defaultStyle.headerStyle,

      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}
          activeOpacity={.8}>
          <Image
            source={require('../../images/hamburger.png')}
            style={{ width: 20, height: 16, marginLeft: 12 }}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SwitchPlayer')
          }}
          activeOpacity={.8}
        >
          <Text
            style={{
              marginRight: 12,
              fontFamily: 'Quicksand-Regular',
              fontSize: 10,
              color: '#667DDB'
            }}
          >{navigation.getParam('Title', '')}</Text>
        </TouchableOpacity>

      )
    };
  };



  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 255 : 0
                ),
              })
            ),
            0,
            0
          );

          return (
            <TouchableOpacity
              indicatorStyle={{ backgroundColor: '#00887A' }}
              labelStyle={{ color: '#000000' }}
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}>
              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // _renderScene = SceneMap({
  //   //first: UpcomingRoute,
  //   first: () => <UpcomingRoute navigation={this.props.navigation}/>,
  //   second: () => <RegisteredRoute navigation={this.props.navigation}/>,

  //   //second: RegisteredRoute,
  //   third: ResultsRoute,
  // });
  _renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'first':
        return <UpcomingRoute navigation={this.props.navigation} />
      case 'second':
        return <RegisteredRoute navigation={this.props.navigation} />
      case 'third':
        return <ResultsRoute navigation={this.props.navigation} />
    }
  };

  render() {
    return (
      <TabView

        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={props =>
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#667DDB', height: 4 }}
            style={{ backgroundColor: 'white', elevation: 0 }}
            labelStyle={{ color: '#404040', fontFamily: 'Quicksand-Regular', }}
          />
        }
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
