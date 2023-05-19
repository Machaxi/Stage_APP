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
import * as Analytics from "../../Analytics"
import { PLAYER, PARENT, COACH } from '../../components/Constants';
import { Nunito_Regular } from '../util/fonts';
import LinearGradient from "react-native-linear-gradient";
import RequestHeaderTitle from '../../atoms/requestHeaderTitle';
import RequestHeaderBg from '../../atoms/requestHeaderBg';
import RequestHeaderLeft from '../../atoms/requestHeaderLeft';
import RequestHeaderRight from '../../atoms/requestHeaderRight';

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
        Analytics.logEvent("TournamentTabs", {userid: userid, username: username})
      }
    })

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
      headerTitle: <RequestHeaderTitle title={"Tournament"} />,
    headerTitleStyle: {
      color: "white",
    },

    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerBackground: <RequestHeaderBg />,
    headerLeft: <RequestHeaderLeft navigation={navigation} />,
    headerRight: <RequestHeaderRight navigation={navigation} />,
    }
    // return {
    //   headerTitle: "Tournament",
    //   headerTitleStyle: styles.headerStyle,
    //   headerStyle: {
    //     backgroundColor: "#141a2e",
    //   },

    //   headerLeft: ( 
    //     <TouchableOpacity
    //       onPress={() => {
    //         navigation.toggleDrawer();
    //       }}
    //       style={{ padding: 7 }}
    //       activeOpacity={0.8}
    //     >
    //       <Image
    //         source={require("../../images/hamburger_white.png")}
    //         style={{ width: 20, height: 16, marginLeft: 12 }}
    //       />
    //     </TouchableOpacity>
    //   ),
    //   headerRight: global.NEW_PLAYER_FLOW == true ? null : (
    //     <TouchableOpacity
    //       onPress={() => {
    //         navigation.navigate("SwitchPlayer");
    //       }}
    //       activeOpacity={0.8}
    //     >
    //       <Text
    //         style={{
    //           marginRight: 12,
    //           fontFamily: "Quicksand-Regular",
    //           fontSize: 10,
    //           color: "#667DDB",
    //         }}
    //       >
    //         {navigation.getParam("Title", "")}
    //       </Text>
    //     </TouchableOpacity>
    //   ),
    // };
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
      <LinearGradient
      colors={["#051732", "#232031"]}
      style={{ flex: 1 }}
    >

      <TabView

        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={props =>
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#667DDB', height: 4 }}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', elevation: 0 }}
            getLabelText={this._getLabelText}
            labelStyle={{ color: '#F3F2F5', fontFamily: Nunito_Regular, }}
          />
        }
        onIndexChange={this._handleIndexChange}
      />
      </LinearGradient>
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
  headerStyle: {
    color: "#F2F2F2",
    fontFamily: "Quicksand-Medium",
    fontWeight: "400",
    textAlign: "center",
    fontSize: 16,
    flexGrow: 1,
    alignSelf: "center",
  },
});
