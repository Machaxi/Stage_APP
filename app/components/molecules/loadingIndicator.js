
import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { darkBlueVariant } from "../../containers/util/colors";

const LoadingIndicator = ({ }) => {
  return (
    <View
      style={styles.container}
    >
      <ActivityIndicator size="large" color="#67BAF5" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: darkBlueVariant,
  },
});

export default LoadingIndicator;
