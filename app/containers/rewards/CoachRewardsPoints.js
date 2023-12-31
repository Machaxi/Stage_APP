import React from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { Card } from "react-native-paper";
import {
  SwitchButton,
  CustomeButtonB,
} from "../../components/Home/SwitchButton";
import { CustomeCard } from "../../components/Home/Card";
import { getPlayerBatch } from "../../redux/reducers/PlayerBatchReducer";
import { getData } from "../../components/auth";
import { connect } from "react-redux";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ParentRewardComponent from "./ParentRewardComponent";
import BaseComponent, {
  defaultStyle,
  getFormattedCategory,
} from "../BaseComponent";
import RNPickerSelect from "react-native-picker-select";
import {
  getAcademyListing,
  getRewardDue,
} from "../../redux/reducers/RewardReducer";
import moment from "moment";
import Events from "../../router/events";

const placeholder = {
  label: "Select Option ",
  value: null,
  color: "#9EA0A4",
};

class CoachRewardsPoints extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFirstInstance: true,
      batchList: ["Test1", "Test2", "Test3"],
      country: "",
      academies: [],
      coach_id: "",
      dues: null,
      alert: false,
    };
    this.inputRefs = {
      country: null,
    };
    console.warn("test");
  }

  componentDidMount() {
    this.selfComponentDidMount();
    this.refreshEvent = Events.subscribe("REFRESH_REWARDS", () => {
      const value = this.state.country;
      this.fetchBatchByAcademy(value);
    });
  }

  selfComponentDidMount() {
    getData("userInfo", (value) => {
      let userData = JSON.parse(value);
      this.setState({
        coach_id: userData["coach_id"],
      });
    });

    getData("header", (value) => {
      console.log("header", value);
      this.props
        .getAcademyListing(value)
        .then(() => {
          // console.log(' user response payload ' + JSON.stringify(this.props.data));
          // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
          let user = JSON.stringify(this.props.data.data);
          console.log(" user response payload 11" + user);
          let user1 = JSON.parse(user);
          if (user1.success) {
            let array = user1.data["academies"];
            let newArray = [];
            for (let i = 0; i < array.length; i++) {
              let row = array[i];
              let obj = {
                label: row.academy_name,
                value: row.academy_id,
              };
              newArray[i] = obj;
            }

            //select by default 0 position
            if (newArray.length > 0) {
              let value = newArray[0].value;
              this.setState({
                country: value,
              });
              setTimeout(() => {
                this.fetchBatchByAcademy(value);
              }, 100);
            }

            this.setState({
              academies: newArray,
            });
          }
        })
        .catch((response) => {
          //handle form errors
          console.log(response);
        });
    });
  }

  fetchBatchByAcademy(academy_id) {
    let coach_id = this.state.coach_id;
    //coach_id = 1

    getData("header", (value) => {
      console.log("header", value);
      this.props
        .getRewardDue(value, academy_id, coach_id)
        .then(() => {
          this.setState({
            isFirstInstance: false,
          });
          console.log(
            " getRewardDue response payload " +
              JSON.stringify(this.props.data.data)
          );
          let data = JSON.stringify(this.props.data.data);
          let user1 = JSON.parse(data);
          if (user1.success) {
            let dues = user1.data["dues"];
            for (let i = 0; i < dues.length; i++) {
              let batches = dues[i].batches;
              let month = dues[i].month;
              let year = dues[i].year;

              for (let j = 0; j < batches.length; j++) {
                let batch = batches[j];
                batch.month = month;
                batch.year = year;
                console.log("batch => ", JSON.stringify(batch));
              }
            }

            console.warn("dues", JSON.stringify(dues));
            this.setState({
              dues: dues,
            });
          }
        })
        .catch((response) => {
          //handle form errors
          console.log(response);
        });
    });
  }

  _renderItem = ({ item }) => (
    <View
      style={{
        marginTop: 12,
      }}
    >
      <Text style={[defaultStyle.bold_text_14, { marginTop: 6 }]}>
        {/* {moment.item.month + "/" + item.year} */}
        {moment
          .utc(item.month + " " + item.year, "MM YYYY")
          .local()
          .format("MMM YYYY")}
      </Text>

      <FlatList
        data={item.batches}
        extraData={item}
        renderItem={this._renderSubItem}
      />
    </View>
  );

  _renderSubItem = ({ item }) => (
    <View
      style={{
        elevation: 2,
        marginTop: 10,
        borderRadius: 12,
        marginBottom: 2,
        backgroundColor: "#ffffff",
      }}
    >
      <View>
        <View
          style={{
            padding: 16,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.regular_text_10}>Batch Name</Text>
            <Text
              style={[
                defaultStyle.bold_text_14,
                { marginTop: 6, color: "#707070" },
              ]}
            >
              {item.batch_name}
            </Text>
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.regular_text_10}>Points available</Text>
            <Text style={[defaultStyle.regular_text_14, { marginTop: 10 }]}>
              {Math.floor(item.totalPointsAvailable)}
            </Text>
          </View>

          <View style={{ marginLeft: 20 }}>
            <Text style={styles.regular_text_10}>Category</Text>
            <Text
              style={[
                defaultStyle.bold_text_14,
                { marginTop: 10, color: "#707070" },
              ]}
            >
              {getFormattedCategory(item.batch_category)}
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: "flex-end",
            marginTop: 10,
            width: 150,
            marginRight: 16,
            alignSelf: "flex-end",
          }}
        >
          <CustomeButtonB
            onPress={() => {
              this.props.navigation.navigate("CoachGiveRewards", {
                month: item.month,
                year: item.year,
                batch_id: item.batch_id,
                academy_id: item.academy_id,
              });
            }}
          >
            Award Players{" "}
          </CustomeButtonB>
        </View>
      </View>
    </View>
  );

  render() {
    let isFirstInstance = this.state.isFirstInstance;
    let data = this.state.dues;
    let alert = this.state.alert;

    if (!isFirstInstance && (data == null || data.length == 0)) {
      alert = true;
    } else {
      alert = false;
    }

    if (this.props.data.loading && this.state.academies.length == []) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#67BAF5" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, padding: 16, backgroundColor: "#F7F7F7" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <RNPickerSelect
            style={{
              width: "90%",
            }}
            placeholder={placeholder}
            items={this.state.academies}
            onValueChange={(value) => {
              console.warn(value);
              this.setState({
                country: value,
              });
              this.fetchBatchByAcademy(value);
            }}
            style={pickerSelectStyles}
            value={this.state.country}
            useNativeAndroidPickerStyle={false}
            ref={(el) => {
              this.inputRefs.country = el;
            }}
          />

          <View
            style={{
              width: 220,
              backgroundColor: "#A3A5AE",
              height: 1,
            }}
          />

          {alert ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={[defaultStyle.regular_text_14, { marginTop: 40 }]}>
                Wow!! No Dues remaining.
              </Text>
            </View>
          ) : null}
        </View>

        <FlatList data={data} renderItem={this._renderItem} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.RewardReducer,
  };
};
const mapDispatchToProps = {
  getAcademyListing,
  getRewardDue,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoachRewardsPoints);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    //paddingVertical: 12,
    //paddingHorizontal: 10,
    borderColor: "#614051",
    borderRadius: 8,
    color: "black",
    marginBottom: 4,
    alignItems: "center",
    textAlign: "center",
    fontFamily: "Quicksand-Regular",
    // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontFamily: "Quicksand-Regular",
    borderColor: "#614051",
    borderRadius: 8,
    color: "black",
  },
});
const styles = StyleSheet.create({
  navBar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: 'blue',
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    // backgroundColor: 'green'
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: 'red',
  },
  rightIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    marginRight: 20,
    //backgroundColor: 'white',
  },

  scoreBox: {
    color: "white",
    marginRight: 20,
    textAlign: "right",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttomButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,

    backgroundColor: "white",
    marginTop: 10,
    marginBottom: -5,
    marginLeft: -5,
    marginRight: -5,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 1 },
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  scene: {
    flex: 1,
  },
  regular_text_10: {
    fontSize: 10,
    color: "#A3A5AE",
    fontFamily: "Quicksand-Regular",
  },
});
