import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import globalStyles from "../../mystyle";

const AddNewPlayerButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../images/add_circle.png")}
        />
        <Text style={{ ...globalStyles.LabelRegular, color: "#667DDB" }}>
          Add New Player
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 14,
    alignSelf: "center",
    height: 14,
    marginRight: 5,
  },
});

export default AddNewPlayerButton;
