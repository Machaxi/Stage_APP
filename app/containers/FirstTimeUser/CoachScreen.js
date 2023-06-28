import React, { Component, createRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CoachPass from "../../components/custom/CoachPass";
import CustomButton from "../../components/custom/CustomButton";
import HeaderContentComponent from "../../components/custom/HeaderContentComponent";
import AsyncStorage from "@react-native-community/async-storage";
import { Nunito_SemiBold } from "../util/fonts";
import LoadingIndicator from "../../components/molecules/loadingIndicator";
import axios from "axios";
import { getBaseUrl } from "../BaseComponent";

const images = [
  { id: 1, url: require("../../images/sports/learn-1.jpg") },
  { id: 2, url: require("../../images/sports/learn-2.jpg") },
  { id: 3, url: require("../../images/sports/learn-3.jpg") },
  { id: 4, url: require("../../images/sports/learn-4.jpg") },
  { id: 5, url: require("../../images/sports/learn-5.jpg") },
  { id: 6, url: require("../../images/sports/learn-6.jpg") },
  { id: 7, url: require("../../images/sports/learn-7.jpg") },
];

class CoachScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      learnData: null,
    };
    this.scrollViewRef = createRef();
    this.autoScrollInterval = null;
  }

  componentDidMount() {
    this.getValue();
    this.startAutoScroll();
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      this.onScreenFocus
    );
    this.didBlurListener = this.props.navigation.addListener(
      "didBlur",
      this.onScreenBlur
    );
  }

  onScreenBlur = () => {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  };

  onScreenFocus = () => {
    this.apiCall();
  };

  componentWillUnmount() {
    this.didFocusListener.remove();
    this.didBlurListener.remove();
  }

  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      var off =
        (Dimensions.get("window").width - 40) * (this.state.currentIndex + 1);
      this.scrollViewRef?.current?.scrollTo({ x: off, animated: true });
      if (this.state.currentIndex > images.length - 2) {
        this.setState({ currentIndex: 0 });
      } else {
        this.setState({ currentIndex: this.state.currentIndex + 1 });
      }
    }, 4000);
  }

  stopAutoScroll() {
    clearInterval(this.autoScrollInterval);
  }

  getValue = async () => {
    const header = await AsyncStorage.getItem("header");
    this.setState({ header: header });
    this.apiCall();
  };

  apiCall = () => {
    axios
      .get(getBaseUrl() + "user/learn-play", {
        headers: {
          "x-authorization": this.state.header,
        },
      })
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let batchData = userResponce["data"]["data"];
        this.setState({
          learnData: batchData["learn"],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSlide = (index) => {
    this.setState({ currentIndex: index });
    var off = (Dimensions.get("window").width - 40) * index;
    this.scrollViewRef.current.scrollTo({ x: off, animated: true });
  };

  ifAlltrue = () => {
    const allTrialDone = this.state.learnData.sport_trial_details.every(
      (item) => item.isTrialDone === true
    );
    console.log(allTrialDone);
    return allTrialDone;
  };

  ifOneTrue = () => {
    const hasTrialDone = this.state.learnData.sport_trial_details.some(
      (item) => item.isTrialDone
    );
    return hasTrialDone;
  };

  render() {
    if (this.state.learnData == null) {
      return <LoadingIndicator />;
    }

    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 0.83 }} nestedScrollEnabled>
          <ImageBackground
            source={require("../../images/playing/learnbackground.png")}
            style={{
              width: "106%",
              height: "102%",
              marginLeft: -30,
            }}
            resizeMode="stretch"
          >
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginLeft: 30,
                width: "94%",
              }}
            >
              <Image
                source={require("../../images/playing/learnt.png")}
                style={{ height: 160, width: 300, marginBottom: -35 }}
              />
              <ImageBackground
                style={{
                  marginTop: 10,
                  marginLeft: 40,
                  width: 280,
                  height: 280,
                  marginBottom: -280,
                }}
                source={require("../../images/sports/Ovel.png")}
              />

              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                ref={this.scrollViewRef}
                onMomentumScrollEnd={(event) => {
                  const { contentOffset } = event.nativeEvent;
                  const index = Math.round(
                    contentOffset.x / (Dimensions.get("window").width - 40)
                  );
                  this.setState({ currentIndex: index });
                  const newImage = images[index];
                }}
              >
                {images.map((image) => (
                  <View
                    style={{
                      width: Dimensions.get("window").width - 40,
                      height: 280,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      key={image.id}
                      source={image.url}
                      style={styles.image}
                    />
                  </View>
                ))}
              </ScrollView>
              <View
                style={{
                  marginTop: -280,
                  marginLeft: 40,
                  width: 270,
                  height: 280,
                  marginBottom: 0,
                  justifyContent: "space-between",
                  paddingVertical: 30,
                }}
              >
                <View style={{ flexDirection: "row-reverse" }}>
                  <LinearGradient
                    colors={[
                      "rgba(255, 255, 255, 0.4)",
                      "rgba(118, 87, 136, 0.44)",
                    ]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={{ width: 28, height: 28, borderRadius: 14 }}
                  />
                </View>
                <View style={{ marginLeft: 20 }}>
                  <LinearGradient
                    colors={[
                      "rgba(255, 255, 255, 0.4)",
                      "rgba(118, 87, 136, 0.44)",
                    ]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={{ width: 34, height: 34, borderRadius: 17 }}
                  />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                {images.map((image, index) => (
                  <TouchableOpacity
                    key={image.id}
                    style={{ paddingHorizontal: 10 }}
                    onPress={() => this.handleSlide(index)}
                  >
                    <View
                      style={[
                        styles.button,
                        this.state.currentIndex === index &&
                          styles.activeButton,
                      ]}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <HeaderContentComponent
                header={this.state.learnData.header}
                contents={this.state.learnData["benefits"]}
                colors={"#C773FF"}
              />
              {this.state.learnData["plans"].map((pass) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={this.props.onPressPlan}
                >
                  <CoachPass
                    title={pass.name}
                    subtitle={pass.planPrice}
                    description={pass.description}
                    image={pass.porfilePic}
                    sidevalue={pass.planPriceSubText}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ImageBackground>
        </ScrollView>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.25)", "rgba(255, 255, 255, 0.06)"]}
          // locations={[0, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.bottomcontainer}
        >
          {this.ifAlltrue ? (
            this.ifOneTrue ? (
              <View
                style={{ width: "100%", alignItems: "center", paddingTop: 8 }}
              >
                <CustomButton
                  name="Book Free Trial"
                  available={true}
                  onPress={this.props.onPressTrail}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={this.props.onPressPlan}
                >
                  <Text style={styles.insideText}>Or Buy Coaching plan</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{ width: "100%", alignItems: "center", paddingTop: 8 }}
              >
                <CustomButton
                  name="Buy Coaching plan"
                  available={true}
                  onPress={this.props.onPressPlan}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={this.props.onPressTrail}
                >
                  <Text style={styles.insideText}>Or Book Free Trial</Text>
                </TouchableOpacity>
              </View>
            )
          ) : (
            <View style={{ width: "100%" }}>
              <CustomButton
                name="Buy Coaching Plan"
                available={true}
                onPress={this.props.onPressPlan}
              />
            </View>
          )}
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  insideText: {
    marginTop: 7,
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: Nunito_SemiBold,
  },
  bottomcontainer: {
    flex: 0.17,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  image: {
    width: 260,
    height: 260,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 160,
    borderTopLeftRadius: 160,
    borderTopRightRadius: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#989898",
    marginHorizontal: 0,
  },
  activeButton: {
    backgroundColor: "#5F87FF",
  },
  backgoundimage: {
    width: 320,
    height: 320,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CoachScreen;
