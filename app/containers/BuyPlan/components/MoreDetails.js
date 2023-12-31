import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../../components/custom/CustomButton";
import { whiteGreyBorder } from "../../util/colors";
import { Nunito_Medium, Nunito_SemiBold } from "../../util/fonts";
import SelectLevel from "../../../components/custom/SelectLevel";
import GetBack from "../../../components/custom/GetBack";
import { selectPreferredSports } from "../../../redux/reducers/PlayerReducer";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

class MoreDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 100,
      currentLevel: 10,
      proseednext: false,
      selectsports: true,
      selectLevel: false,
      header: null,
      levelData: [],
      sportList: null,
    };
  }

  componentDidMount() {
    this.getData();
    if (this.props.sportList.length % 3 == 2) {
      var sportsdata = [...this.props.sportList, []];
      this.setState({ sportList: sportsdata });
    } else {
      this.setState({ sportList: this.props.sportList });
    }
  }

  getData = async () => {
    const header = await AsyncStorage.getItem("header");
    this.setState({ header: header });
  };

  preferredSport = () => {
    return (
      <View>
        {this.props.title == "EditPreferredSports" && (
          <GetBack title="Back" onPress={this.hadleBack} />
        )}
        <Text style={styles.mainText}>
          Select preferred sport{" "}
          <Text style={[styles.mainText, { fontSize: 11 }]}>
            (To personalize your experience)
          </Text>
        </Text>
        <View style={styles.contained}>
          {this.state.sportList &&
            this.state.sportList.map((item) => (
              <View>
                {item.name ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={item.id}
                    style={[styles.subview]}
                    onPress={() => {
                      const sport = this.state.sportList.find(
                        (items) => items.id === item.id
                      );
                      const { proficiencies } = sport;
                      const sortdata = proficiencies.sort(
                        (a, b) => parseInt(a.order) - parseInt(b.order)
                      );
                      this.setState({
                        currentIndex: item.id,
                        proseednext: true,
                        levelData: sortdata,
                      });
                    }}
                  >
                    <LinearGradient
                      colors={[
                        "rgba(255, 255, 255, 0.1)",
                        "rgba(118, 87, 136, 0)",
                      ]}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      style={styles.sportsview}
                    >
                      <ImageBackground
                        source={
                          item.id === this.state.currentIndex
                            ? require("../../../images/playing/select_sports.png")
                            : null
                        }
                        style={styles.imaged}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={styles.imageitem}
                          resizeMode="contain"
                        />
                      </ImageBackground>
                    </LinearGradient>
                    <Text style={styles.sportText}>{item.name}</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={{ width: 100, height: 93, opacity: 0 }} />
                )}
              </View>
            ))}
        </View>
      </View>
    );
  };

  hadleBack = () => {
    this.props.onBackPress();
  };

  hadleBackPress = () => {
    this.setState({
      selectLevel: false,
      selectsports: true,
      proseednext: true,
    });
  };

  playerLevel = () => {
    return (
      <View>
        <GetBack title="Back" onPress={this.hadleBackPress} />
        <Text style={styles.mainText}>Select player Level</Text>
        <View style={styles.levelContained}>
          {this.state.levelData.map((item, index) => (
            <View style={{ marginRight: 15 }}>
              <SelectLevel
                index={index}
                currentLevel={this.state.currentLevel}
                image={item.url}
                id={item.id}
                url={true}
                name={item.displayText}
                onPress={() => {
                  this.setState({ currentLevel: index, proseednext: true });
                }}
              />
            </View>
          ))}
        </View>
      </View>
    );
  };

  render() {
    handlepress = () => {
      if (this.state.selectLevel == false) {
        this.setState({
          selectLevel: true,
          selectsports: false,
          proseednext: false,
        });
      } else {
        console.log(this.state.levelData);
        const sportsId = this.state.currentIndex;
        const level = this.state.levelData[this.state.currentLevel].name;
        const subId = this.props.subscriptionId;
        var dataDic = {};
        var dict = {};
        dict["subscriptionId"] = subId;
        dict["sportId"] = sportsId;
        dict["proficiency"] = level;
        console.log(this.props.title);
        if (this.props.title == "EditPreferredSports") {
          dict["preferredAcademyId"] = "" + this.props.preferredAcademyId;
        }
        dataDic["data"] = dict;
        this.props
          .selectPreferredSports(dataDic, this.state.header)
          .then(() => {
            let jsondata = JSON.stringify(this.props.data.sportsData);
            let responcedata = JSON.parse(jsondata);
            console.log(responcedata.data);
            this.props.onPress();
          })
          .catch((response) => {
            console.log(response);
          });
      }
    };

    return (
      <View style={styles.contain}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 0.93 }}>
          {this.state.selectsports && this.preferredSport()}
          {this.state.selectLevel && this.playerLevel()}
        </ScrollView>
        <View style={{ flex: 0.07, paddingTop: 20 }}>
          <CustomButton
            name="Submit"
            available={this.state.proseednext}
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
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  levelContained: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  contain: {
    flex: 1,
    marginVertical: 10,
  },
  heading: {
    fontSize: 20,
    marginTop: 8,
    fontFamily: Nunito_SemiBold,
    color: "#FFCB6A",
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
  return { data: state.PlayerReducer };
};

const mapDispatchToProps = { selectPreferredSports };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoreDetails);
