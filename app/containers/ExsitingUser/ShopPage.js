import React, { Component } from "react";
import LinearGradient from "react-native-linear-gradient";
import ShopScreen from "../FirstTimeUser/ShopScreen";

class ShopPage extends Component {
  render() {
    return (
      <LinearGradient
        colors={["#332B70", "#24262A"]}
        locations={[0, 1]}
        style={{flex: 1}}
      >
         <ShopScreen/>
      </LinearGradient>
    );
  }
}

export default ShopPage;
