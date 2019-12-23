import * as React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import UpcomingRoute from './UpcomingRoute'
import RegisteredRoute from './RegisteredRoute'
import ResultsRoute from './ResultsRoute'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { getData, storeData } from '../../components/auth';
import { getTournamentFilter, } from "../../redux/reducers/TournamentFilter";
import { connect } from 'react-redux';
import { TOURNAMENT_FILTER } from '../../actions/actionTypes';
import firebase from "react-native-firebase";
import { PLAYER, PARENT, COACH } from '../../components/Constants';

class TournamentTabs extends BaseComponent {

  constructor(props) {
    super(props)
    this.getFilterData()
  }

  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Upcoming' },
      { key: 'second', title: 'Registered' },
      { key: 'third', title: 'Results' }
    ],
  };
  componentDidMount() {
    getData('userInfo', (value)=>{
      var userData = JSON.parse(value)
      if(userData.user){
          var userid = userData.user['id']
          var username = userData.user['name']
          firebase.analytics().logEvent("TournamentTabs", {userid: userid, username: username})
      }
    })
    // firebase.analytics().logEvent("TournamentTabs", {})

    getData('userInfo', (value) => {
      userData = JSON.parse(value)
      if (userData.user['user_type'] == PLAYER) {
        this.props.navigation.setParams({ Title: "Switch Academy" });
      }
      else if (userData.user['user_type'] == PARENT) {
        this.props.navigation.setParams({ Title: "Switch Child" });
      }
      else if (userData.user['user_type'] == COACH) {
        this.props.navigation.setParams({ Title: "Switch Academy" });
      } else {
        this.props.navigation.setParams({ Title: "" });
      }

    });




  }

  getFilterData() {
    this.props.getTournamentFilter().then(() => {
      let data = this.props.data.data
      console.log(' getTournamentFilter ' + JSON.stringify(data));

      let success = data.success
      if (success) {
        let res = data.data
        console.warn('filter ', JSON.stringify(res))
        storeData(TOURNAMENT_FILTER, JSON.stringify(res))
      }

    }).catch((response) => {
      console.log(response);
    })
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
          style={{padding: 7}}
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
              labelStyle={{ color: '#000000', }}
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

  _getLabelText = ({ route, scene }) => (
    route.title
  );

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
            getLabelText={this._getLabelText}
            labelStyle={{ color: '#404040', fontFamily: 'Quicksand-Regular', }}
          />
        }
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.TournamentFilter,
  };
};
const mapDispatchToProps = {
  getTournamentFilter
};
export default connect(mapStateToProps, mapDispatchToProps)(TournamentTabs);


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
