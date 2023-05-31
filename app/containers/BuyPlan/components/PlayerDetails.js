import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../../components/custom/CustomButton";
import AsyncStorage from "@react-native-community/async-storage";
import { whiteGreyBorder } from "../../util/colors";
import {
  Nunito_Medium,
  Nunito_Regular,
  Nunito_SemiBold,
} from "../../util/fonts";
import SelectLevel from "../../../components/custom/SelectLevel";
import CustomRadioButton from "../../../components/custom/CustomRadioButton";
import { getRelationsDetails } from "../../../redux/reducers/RelationReducer";
import { connect } from "react-redux";
import { getData } from "../../../components/auth";
import { deviceWidth } from "../../util/dimens";
import LoadingIndicator from "../../../components/molecules/loadingIndicator";

class PlayerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 1,
      proseednext: false,
      name: "",
      currentGender: 0,
      currentChild: 1,
      gender: "MALE",
      related_players: null,
      displayname: true,
      procednext: false,
      procedyourself: true,
      childDetails: null,
      userDetails: null,
    };
  }

  componentDidMount() {
    this.signcheck();
    this.fetchParentDetails();
  }

  signcheck = async () => {
    const userDetailsJson = await AsyncStorage.getItem("userInfo");
    const userDetailed = JSON.parse(userDetailsJson);
    const userDetails = userDetailed.user;
    console.log(userDetails);
    var gendernum = 2;
    if (userDetails.genderType == "MALE") {
      gendernum = 0;
    }else if (userDetails.genderType == "FEMALE") {
      gendernum = 1;
    }
    this.setState({ userDetails: userDetails, currentGender: gendernum });
  };

  fetchParentDetails() {
    getData("header", (value) => {
      this.props
        .getRelationsDetails(value)
        .then(() => {
          let data = this.props.data.profileData;
          if (data.success) {
            this.setState({
              related_players: data.data.players,
              currentChild: data.data.players.length,
            });
          }
        })
        .catch((response) => {
          console.log(response);
        });
    });
  }

  render() {
    handlepress = () => {
      var name = this.state.name;
      var parent = "Parent";
      var gend = this.state.gender;
      if (this.state.procednext) {
        name = this.state.related_players[this.state.currentChild].name;
      }
      if (this.state.currentIndex == 2) {
        parent = "Child";
      } else {
        name = this.state.userDetails.name;
        gend = this.state.userDetails.genderType;
      }
      this.props.onPress(name, gend, parent, this.state.childDetails);
    };

    if (this.state.userDetails == null) {
      return <LoadingIndicator />;
    }

    return (
      <View style={styles.contain}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 0.93 }}>
          <Text style={styles.mainText}>Is this for yourself or child?</Text>
          <View style={styles.contained}>
            <SelectLevel
              index={1}
              url={false}
              currentLevel={this.state.currentIndex}
              image={require("../../../images/playing/yourself.png")}
              id={1}
              name="Yourself (Adult)"
              onPress={() => {
                var gendernum = 1;
                if (this.state.userDetails.genderType == "MALE") {
                  gendernum = 0;
                }
                this.setState({
                  currentIndex: 1,
                  proseedLevel: true,
                  currentGender: gendernum,
                  procedyourself: true,
                });
              }}
            />
            <View style={{ marginHorizontal: 20 }} />
            <SelectLevel
              index={2}
              currentLevel={this.state.currentIndex}
              image={require("../../../images/playing/child.png")}
              id={2}
              url={false}
              name="Child (Kids)"
              onPress={() => {
                if (
                  this.state.related_players &&
                  this.state.related_players.length > 1 &&
                  this.props.title == "Coaching Trial"
                ) {
                  this.setState({ displayname: false });
                }
                this.setState({
                  currentIndex: 2,
                  proseedLevel: true,
                  procedyourself: false,
                });
              }}
            />
          </View>
          <Text style={styles.mainText}>Player Details</Text>
          {this.state.currentIndex == 2 &&
            this.state.related_players &&
            this.state.related_players.length > 0 && (
              <View>
                <Text style={styles.subText}>Select Player</Text>
                <View style={styles.usercontained}>
                  {this.state.related_players.map((item, index) => (
                    <CustomRadioButton
                      disabled={false}
                      index={index}
                      currentLevel={this.state.currentChild}
                      name={item.name}
                      width={deviceWidth * 0.3}
                      onPress={() => {
                        this.setState({
                          currentChild: index,
                          displayname: false,
                          procednext: true,
                          childDetails: this.state.related_players[index],
                        });
                      }}
                    />
                  ))}
                  {this.props.title == "Coaching Trial" &&
                    this.state.related_players.length < 2 && (
                      <CustomRadioButton
                        disabled={false}
                        index={this.state.related_players.length}
                        currentLevel={this.state.currentChild}
                        name="Add New Player"
                        onPress={() => {
                          this.setState({
                            currentChild: this.state.related_players.length,
                            displayname: true,
                            procednext: false,
                          });
                        }}
                      />
                    )}
                  {this.props.title != "Coaching Trial" && (
                    <CustomRadioButton
                      disabled={false}
                      index={this.state.related_players.length}
                      currentLevel={this.state.currentChild}
                      name="Add New Player"
                      onPress={() => {
                        this.setState({
                          currentChild: this.state.related_players.length,
                          displayname: true,
                          procednext: false,
                        });
                      }}
                    />
                  )}
                </View>
              </View>
            )}
          {this.state.displayname && (
            <View>
              <Text style={styles.subText}>Player Name</Text>
              <View style={styles.inputview}>
                <TextInput
                  style={styles.input}
                  value={
                    this.state.currentIndex == 2
                      ? this.state.name
                      : this.state.userDetails.name
                  }
                  placeholder="Enter Player Name"
                  placeholderTextColor="#7E7E7E"
                  editable={this.state.currentIndex == 2}
                  maxLength={30}
                  onChangeText={(value) => {
                    this.setState({ name: value });
                  }}
                />
                {this.state.name.length > 0 && this.state.currentIndex == 2 && (
                  <TouchableOpacity
                    style={{ flex: 0.1 }}
                    activeOpacity={0.8}
                    onPress={() => {
                      this.setState({ name: "" });
                    }}
                  >
                    <Image
                      source={require("../../../images/cancel.png")}
                      style={{ width: 25, height: 25 }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.subText}>Player Gender</Text>
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <CustomRadioButton
                  disabled={this.state.currentIndex == 1}
                  index={0}
                  currentLevel={this.state.currentGender}
                  name="Male"
                  onPress={() => {
                    this.setState({
                      currentGender: 0,
                      proseedLevel: true,
                      gender: "MALE",
                    });
                  }}
                />
                <View style={{ marginHorizontal: 20 }} />
                <CustomRadioButton
                  disabled={this.state.currentIndex == 1}
                  index={1}
                  currentLevel={this.state.currentGender}
                  name="Female"
                  onPress={() => {
                    this.setState({
                      currentGender: 1,
                      proseedLevel: true,
                      gender: "FEMALE",
                    });
                  }}
                />
                <View style={{ marginHorizontal: 20 }} />
                <CustomRadioButton
                  disabled={this.state.currentIndex == 1}
                  index={2}
                  currentLevel={this.state.currentGender}
                  name="Prefer not to say"
                  onPress={() => {
                    this.setState({
                      currentGender: 2,
                      proseedLevel: true,
                      gender: "PREFER_NOT_TO_SAY",
                    });
                  }}
                />
              </View>
            </View>
          )}
        </ScrollView>
        <View style={{ flex: 0.07, paddingTop: 20 }}>
          <CustomButton
            name="Next "
            image={require("../../../images/playing/arrow_go.png")}
            available={
              this.state.name.length > 1 ||
              this.state.procednext ||
              this.state.procedyourself
            }
            onPress={handlepress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contained: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    margin: 10,
  },
  usercontained: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  contain: {
    flex: 1,
    marginVertical: 20,
  },
  inputview: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#484848",
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 0.7,
    marginRight: 10,
    fontFamily: "Nunito-Regular",
    color: "#DEDEDE",
  },
  subview: {
    width: 100,
    height: 120,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  sportsview: {
    width: 100,
    height: 93,
    justifyContent: "center",
    alignItems: "center",
    borderColor: whiteGreyBorder,
    borderWidth: 1,
    borderRadius: 10,
  },
  imageitem: {
    width: 64,
    height: 64,
    zIndex: 2,
  },
  sportText: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: Nunito_Medium,
    color: "#BBBBBB",
  },
  mainText: {
    fontSize: 16,
    marginVertical: 8,
    fontFamily: Nunito_SemiBold,
    color: "#D1D1D1",
  },
  subText: {
    fontSize: 12,
    marginVertical: 8,
    fontFamily: Nunito_Regular,
    color: "#B4B4B4",
  },
  imaged: {
    marginTop: 5,
    width: 100,
    height: 93,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    data: state.RelationReducer,
  };
};
const mapDispatchToProps = {
  getRelationsDetails,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerDetails);
