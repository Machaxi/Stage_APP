import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { yellowVariant } from "../../containers/util/colors";
import { commonStyles } from "../../containers/util/commonStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

const GoBackHeader = ({ title, navigation }) => {
  return (
    <TouchableOpacity onPress={()=> {
      navigation.goBack();
    }}
      style={[commonStyles.flexRowNormal, { marginTop: 9, marginLeft: 12 }]}
    >
      <Image
        source={require("../../images/backIcon.png")}
        style={styles.backIcon}
      />
      <Text style={styles.screenTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    height: 15,
    width: 15,
    marginRight: 4
  },
  screenTitle: {
    fontSize: 20,
    fontFamily: "Nunito-600",
    color: yellowVariant,
  },
});

export default GoBackHeader;
