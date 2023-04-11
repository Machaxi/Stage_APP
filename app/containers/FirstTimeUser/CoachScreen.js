import React, { Component } from "react";
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

const images = [
  { id: 1, url: require("../../images/playing/badminton_play.png") },
  { id: 2, url: require("../../images/playing/badminton_play.png") },
  { id: 3, url: require("../../images/playing/badminton_play.png") },
  { id: 4, url: require("../../images/playing/badminton_play.png") },
  { id: 5, url: require("../../images/playing/badminton_play.png") },
];

const coachPass = [
  {
    id: 1,
    title: "Monthly",
    price: "3,600",
    description: "Unlock the best Coaching experience in town",
  },
  {
    id: 2,
    title: "Quarterly",
    price: "7,500",
    description: "Save up to 25% as compared to monthly plan.",
  },
  {
    id: 3,
    title: "Annually",
    price: "20,000",
    description: "Save up to 35% as compared to monthly plan.",
  },
];

class CoachScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      currentImage: images[0],
      bookingSuccess: "",
    };
  }

  componentDidMount() {
    this.handleopen();
  }

  handleopen = async () => {
    const bookingsuccess = await AsyncStorage.getItem("book_trial_coaching");
    console.log(bookingsuccess);
    this.setState({ bookingSuccess: bookingsuccess });
  };

  handleSlide = (index) => {
    this.setState({ currentIndex: index });
    const newImage = images[index];
    this.setState({ currentImage: newImage });
  };

  render() {
    const contents = [
      "Certified Coaches",
      "Curriculum designed by experts",
      "Quarterly Tournaments and PTMs",
      "Flexible timings",
    ];
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 0.85 }}>
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
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                  const { contentOffset } = event.nativeEvent;
                  const index = Math.round(
                    contentOffset.x / (Dimensions.get("window").width - 40)
                  );
                  this.setState({ currentIndex: index });
                  const newImage = images[index];
                  this.setState({ currentImage: newImage });
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
                      key={this.state.currentImage.id}
                      source={this.state.currentImage.url}
                      style={styles.image}
                    />
                  </View>
                ))}
              </ScrollView>
              <View style={styles.buttonContainer}>
                {images.map((image, index) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={image.id}
                    style={[
                      styles.button,
                      this.state.currentIndex === index && styles.activeButton,
                    ]}
                    onPress={() => this.handleSlide(index)}
                  />
                ))}
              </View>
              <HeaderContentComponent
                header="Coaching Membership"
                contents={contents}
                colors={"#C773FF"}
              />
              {coachPass.map((pass) => (
                <TouchableOpacity activeOpacity={0.8}>
                  <CoachPass
                    title={pass.title}
                    subtitle={pass.price}
                    description={pass.description}
                    image={pass.id}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ImageBackground>
        </ScrollView>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.06)"]}
          locations={[0, 1]}
          style={styles.bottomcontainer}
        >
          {this.state.bookingSuccess === "Coaching" ? (
            <View style={{ width: "100%" }}>
              <CustomButton
                name="Buy Coaching Plan"
                available={true}
                onPress={this.props.onPressPlan}
              />
            </View>
          ) : (
            <View style={{ width: "100%", alignItems: "center" }}>
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
    marginTop: 10,
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "Nunito-600",
  },
  bottomcontainer: {
    flex: 0.15,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  image: {
    width: 320,
    height: 320,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#989898",
    marginHorizontal: 5,
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