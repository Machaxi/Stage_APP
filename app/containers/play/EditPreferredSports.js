import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import MoreDetails from "../BuyPlan/components/MoreDetails";
import { getBaseUrl } from "../BaseComponent";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";
import { darkBlueVariant } from "../util/colors";
import SelectPlayCenter from "../BuyPlan/components/SelectPlayCenter";
import GetBack from "../../components/custom/GetBack";

class EditPreferredSports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sportsList: null,
      academiesList: null,
      currentPage: 1,
      preferredAcademyId: null,
    };
  }

  componentDidMount() {
    this.getSportsList();
    this.getAcademyData();
  }

  onComplete = () => {
    this.props.navigation.goBack();
  };

  onPressCenter = (selectCenter, distance) => {
    this.setState({ currentPage: 2, preferredAcademyId: selectCenter.id });
  };

  moreBackPress = () => {
    this.setState({ currentPage: 1 });
  };

  getSportsList = () => {
    axios
      .get(getBaseUrl() + "/global/sports")
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        console.log(userResponce);
        let academiesData = userResponce["data"]["data"];
        this.setState({ sportsList: academiesData["sports"] });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getAcademyData = () => {
    axios
      .get(getBaseUrl() + "/global/academy/all")
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        let academiesData = userResponce["data"]["data"];
        this.setState({ academiesList: academiesData["academies"] });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <LinearGradient
        colors={[darkBlueVariant, darkBlueVariant]}
        locations={[0, 1]}
        style={styles.contain}
      >
        {this.state.academiesList && this.state.currentPage === 1 && (
          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: -20 }}>
              <GetBack title="Back" onPress={this.onComplete} />
            </View>
            <SelectPlayCenter
              onPress={this.onPressCenter}
              academiesList={this.state.academiesList}
            />
          </View>
        )}
        {this.state.sportsList && this.state.currentPage === 2 && (
          <MoreDetails
            sportList={this.state.sportsList}
            subscriptionId={this.props.navigation.state.params.sentdata}
            preferredAcademyId = {this.state.preferredAcademyId}
            title = "EditPreferredSports"
            onPress={this.onComplete}
          />
        )}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    padding: 20,
  },
});

export default EditPreferredSports;
