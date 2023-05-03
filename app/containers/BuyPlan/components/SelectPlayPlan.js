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
import AsyncStorage from "@react-native-community/async-storage";
import { whiteGreyBorder } from "../../util/colors";
import { Nunito_Medium, Nunito_SemiBold } from "../../util/fonts";
import PlayPlanDetails from "../../../components/custom/PlayPlanDetails";

class SelectPlayPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlan: 100,
      proseednext: false,
    };
    this.scrollViewRef = React.createRef();
  }

  componentDidMount() {
    console.log(this.props.PlanNumber);
    var next = false;
    if (this.props.PlanNumber < 100) {
      next = true;
    }
    this.setState({ currentPlan: this.props.PlanNumber, proseednext: next });
  }

  handleLayout = () => {
    if (this.props.PlanNumber > 0 && this.props.PlanNumber < 90) {
      this.scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  render() {
    handlepress = () => {
      const id = this.state.currentPlan + 1;
      this.props.onPress(this.props.planList.find((item) => item.id === id));
    };

    return (
      <View style={styles.contain}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={this.scrollViewRef}
          onLayout={this.handleLayout}
          style={{ flex: 0.93 }}
        >
          <Text style={styles.mainText}>Select Playing plan</Text>
          <View style={styles.contained}>
            {this.props.planList.map((item, index) => (
              <PlayPlanDetails
                index={index}
                currentLevel={this.state.currentPlan}
                title={item.name}
                subtitle={item.price}
                image={item.planIconUrl}
                description={item.tagline}
                benefits={item.benefits}
                onPress={() => {
                  this.setState({ currentPlan: index, proseednext: true });
                  if (index > 1) {
                    this.scrollViewRef.current.scrollToEnd({ animated: true });
                  }
                }}
              />
            ))}
          </View>
        </ScrollView>
        <View style={{ flex: 0.07, paddingTop: 20 }}>
          <CustomButton
            name="Next "
            image={require("../../../images/playing/arrow_go.png")}
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
  },
  contain: {
    flex: 1,
    marginVertical: 20,
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
    marginBottom: 15,
    marginTop: 10,
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

export default SelectPlayPlan;
