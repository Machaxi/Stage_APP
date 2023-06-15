import React from "react";
import { Text, View } from "react-native";
import BaseComponent from "../BaseComponent";
import { Nunito_Regular } from "./fonts";
import { Nunito_Medium } from "./fonts";
import LinearGradient from "react-native-linear-gradient";
import { darkBlueVariant } from "./colors";

export default class DeleteAccount extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  render() {
    return (
      <LinearGradient
        colors={[darkBlueVariant, darkBlueVariant]}
        locations={[0, 1]}
        style={{ flex: 1 }}
      >
        <View style={{ margin: 20, marginTop: 40 }}>
          <Text
            style={{ fontFamily: Nunito_Medium, fontSize: 15, color: "white" }}
          >
            Please email your details to{" "}
            <Text
              style={{
                fontFamily: Nunito_Medium,
                color: "#FFCB6A",
                fontSize: 15,
              }}
            >
              hello@machaxi.com{" "}
            </Text>
            if you need to delete your account.
          </Text>
        </View>
      </LinearGradient>
    );
  }
}
