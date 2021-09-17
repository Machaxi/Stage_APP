import React from "react";
import * as Progress from "react-native-progress";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { getData } from "../../components/auth";
import { getPlayerPerformance } from "../../redux/reducers/PerformenceReducer";
import { connect } from "react-redux";
import BaseComponent, {
  defaultStyle,
  EVENT_CLEAR_GRAPH,
  getStatsImageBySportId,
} from "../BaseComponent";
import moment from "moment";
import RNPickerSelect from "react-native-picker-select";
import { TabView, TabBar } from "react-native-tab-view";
import PlayerPerformanceComponent from "./PlayerPerformanceComponent";
import Spinner from "react-native-loading-spinner-overlay";
import CustomProgress from "../../components/custom/CustomProgress";
import Events from "../../router/events";
import MonthYearDialog from "../../components/custom/MonthYearDialog";

var deviceWidth = Dimensions.get("window").width - 20;

class ViewPlayerPerformance extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      months: [],
      month: "",
      response: [],
      index: 0,
      routes: [],
      performanceData: null,
      currentPerformanceData: null,
      spinner: false,
      show_month_dialog: false,
      year: "",
      current_score: 0,
      sport_id: "",
    };
    this.inputRefs = {
      month: null,
    };
  }

  componentDidMount() {
    this.state.performanceData = this.props.navigation.getParam(
      "performance_data"
    );
    for (i = 0; i < 12; i++) {
      let obj = {
        label:
          moment()
            .month(i)
            .format("MMM") +
          " " +
          moment().format("YY"),
        value: (i + 1).toString(),
      };
      this.state.months.push(obj);
    }

    console.log("this.state.performanceData", this.state.performanceData);

    var today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    if (this.state.performanceData.month) {
      this.state.month = this.state.performanceData.month.toString();
    } else {
      this.state.month = mm;
    }

    if (this.state.performanceData.year) {
      this.state.year = this.state.performanceData.year.toString();
    } else {
      this.state.year = yyyy;
    }

    this.getPerformanceData();
  }

  progress(status) {
    this.setState({
      spinner: status,
    });
  }

  onSwipeStart() {}

  getPerformanceData() {
    //Events.publish(EVENT_CLEAR_GRAPH);

    this.progress(true);

    getData("userInfo", (value) => {
      userData = JSON.parse(value);
      getData("header", (value) => {
        this.props
          .getPlayerPerformance(
            value,
            this.state.performanceData.id,
            this.state.month,
            this.state.year,
            this.state.performanceData.batchId,
            userData["player_id"],
            this.state.routes.length != 0
              ? this.state.routes[this.state.index].key
              : null
          )
          .then(() => {
            this.progress(false);
            //console.log('this.props.data===========', this.props.data);
            let data = this.props.data.performencedata;
            console.log(" getPlayerPerformance " + JSON.stringify(data));

            let success = data.success;
            if (success) {
              let sportId = data.data.batch.sport_id;
              this.setState({
                response: data.data,
                current_score: data.data.attribute.score,
                sport_id: sportId,
              });

              let array = data.data.attribute.parameters;
              let newArray = [];
              for (let i = 0; i < array.length; i++) {
                let row = array[i];
                let obj = {
                  key: row.parameter_id,
                  title: row.name,
                  youtube_url: row.video_url,
                };
                newArray[i] = obj;
              }
              this.setState({
                routes: newArray,
              });
              console.warn(JSON.stringify(newArray));
            }
          })
          .catch((response) => {
            this.progress(false);
            console.log(response);
          });
      });
    });
  }

  _getLabelText = ({ route, scene }) => route.title;

  _renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      getLabelText={this._getLabelText}
      indicatorStyle={{
        backgroundColor: "#667DDB",
        height: 4,
      }}
      style={{ backgroundColor: "white", elevation: 0 }}
      tabStyle={{ width: 143 }}
      labelStyle={defaultStyle.regular_text_14}
    />
  );
  renderScene = ({ route, jumpTo }) => {
    return (
      <PlayerPerformanceComponent
        jumpTo={this.state.response}
        name={route.title}
        youtube_url={route.video_url}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    if (this.state.performanceData == null) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#67BAF5" />
        </View>
      );
    }

    const statId = this.state.performanceData.id;
    if (this.state.month != "" && this.state.year != "") {
      formatted_date = moment(
        this.state.month + "/" + this.state.year,
        "MM-YYYY"
      ).format("MMM'YY");
      //alert(formatted_date)
    }

    return (
      <View style={styles.performanceContainer}>
        <Spinner
          visible={this.state.spinner}
          textStyle={defaultStyle.spinnerTextStyle}
        />

        {/* <MonthYearDialog visible={this.state.visible} /> */}

        {/* <RNPickerSelect
                  placeholder={{}}
                  items={this.state.months}
                  onValueChange={(value) => {
                    console.log(value)
                    this.setState({
                      month: value,
                    }, () => {
                      Events.publish(EVENT_CLEAR_GRAPH);
                      this.getPerformanceData();
                    });
                  }}
                  style={pickerSelectStyles}
                  value={this.state.month}
                  useNativeAndroidPickerStyle={false}
                  ref={(el) => {
                    this.inputRefs.month = el;
                  }}
                />
 */}

        <MonthYearDialog
          touchOutside={(month, year) => {
            if (month != undefined && year != undefined) {
              this.setState(
                {
                  month: month,
                  year: year,
                },
                () => {
                  Events.publish(EVENT_CLEAR_GRAPH);
                  this.getPerformanceData();
                }
              );
            }
            this.setState({
              show_month_dialog: false,
            });
          }}
          visible={this.state.show_month_dialog}
        />

        <View style={styles.statsOuter}>
          <Image
            resizeMode="contain"
            source={
              this.state.sport_id
                ? getStatsImageBySportId(this.state.sport_id)
                : ""
            }
            style={styles.statsImg}
          />

          <View>
            <Text style={defaultStyle.bold_text_14}>
              {this.state.performanceData.name}
            </Text>

            <View style={styles.statsProgressOuter}>
              <Text style={[defaultStyle.bold_text_12, { color: "#A3A5AE" }]}>
                Current Score
              </Text>
              <Text style={defaultStyle.bold_text_12}>
                {this.state.current_score}
              </Text>
            </View>
            <CustomProgress
              percent={this.state.current_score}
              width={deviceWidth - 100}
              height={14}
            />

            {/* <Progress.Bar style={styles.progressBar} 
            progress={this.state.performanceData.score / 100} 
            width={deviceWidth - 100} height={14} /> */}

            {/* <TouchableOpacity onPress={() => {
              console.log('this.state.visible', this.state.visible)
              this.setState({
                show_month_dialog: true
              })
            }}>

              <View style={{ width: '45.33%', marginTop: 16, paddingLeft: 2 }} >

                <View><Text style={styles.filterPlaceholder}>Showing for</Text></View>
                <View style={{ flexDirection: 'row' }}>

                  <View style={{
                    width: 80,
                    backgroundColor: '#A3A5AE',
                    height: 1
                  }}></View>

                  <Image
                    source={require('../../images/triangle.png')}
                    resizeMode="contain"
                    style={{
                      width: 8,
                      marginLeft: -10,
                      height: 6,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: -38,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  />

                </View>



              </View>

            </TouchableOpacity> */}

            <View>
              <Text
                style={{
                  fontSize: 10,
                  color: "#A3A5AE",
                  paddingLeft: 2,
                  marginTop: 16,
                  fontFamily: "Quicksand-Medium",
                }}
              >
                Showing for
              </Text>

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    show_month_dialog: true,
                  });
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 8,
                    width: 90,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#404040",
                      paddingLeft: 2,
                      fontFamily: "Quicksand-Medium",
                    }}
                  >
                    {formatted_date}
                  </Text>

                  <Image
                    style={{ width: 8, height: 5 }}
                    source={require("../../images/ic_down_arrow.png")}
                  />
                </View>
                <View
                  style={{
                    width: 90,
                    marginTop: 4,
                    backgroundColor: "#A3A5AE",
                    height: 1,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <TabView
            navigationState={this.state}
            renderTabBar={this._renderTabBar}
            renderScene={this.renderScene}
            onIndexChange={(index) => {
              console.log("index", index);
              this.setState({ index });
              this.getPerformanceData();
            }}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.PerformenceReducer,
  };
};
const mapDispatchToProps = {
  getPlayerPerformance,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPlayerPerformance);

const styles = StyleSheet.create({
  performanceContainer: {
    flex: 1,
    fontFamily: "Quicksand-Regular",
  },
  statsOuter: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#DFDFDF",
  },
  statsImg: {
    width: 70,
    height: 70,
    marginRight: 20,
  },
  statsProgressOuter: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBar: {
    backgroundColor: "#E1E1E1",
    color: "#305F82",
    borderRadius: 11,
    borderWidth: 0,
  },
  filterPlaceholder: {
    fontSize: 10,
    fontFamily: "Quicksand-Medium",
    color: "#A3A5AE",
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    //paddingVertical: 12,
    //paddingHorizontal: 10,
    borderColor: "#D3D3D3",
    borderRadius: 4,
    color: "black",
    width: 200,
    height: 40,
    marginBottom: 4,
    fontFamily: "Quicksand-Regular",
    // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 0,
    paddingVertical: 8,
    fontFamily: "Quicksand-Regular",
    borderColor: "#614051",
    borderRadius: 8,
    color: "black",
  },
});
