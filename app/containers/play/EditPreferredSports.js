import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import MoreDetails from "../BuyPlan/components/MoreDetails";
import { getBaseUrl } from "../BaseComponent";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";
import { darkBlueVariant } from "../util/colors";

class EditPreferredSports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sportsList: null,
    };
  }

  componentDidMount() {
    console.log("olla");
    console.log(this.props.navigation.state.params.sentdata);
    this.getSportsList();
  }

  onComplete = () => {
    this.props.navigation.goBack();
  };

  getSportsList = () => {
    axios
      .get(getBaseUrl() + "/global/sports")
      .then((response) => {
        let data = JSON.stringify(response);
        let userResponce = JSON.parse(data);
        console.log(userResponce);
        let academiesData = userResponce["data"]["data"];
        this.setState({
          sportsList: academiesData["sports"],
        });
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
        {this.state.sportsList && (
          <MoreDetails
            sportList={this.state.sportsList}
            subscriptionId={this.props.navigation.state.params.sentdata}
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
