import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { white } from "../containers/util/colors";
import NamedRoundedContainer from "./namedRoundedContainer";


const MyRequestPlayersList = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 15,
      }}
    >
      <Text style={[styles.detailsTxt, { marginRight: 8 }]}>
        {item?.name}
      </Text>
      <NamedRoundedContainer name={item?.proficiency} />
    </View>
  );
};

const styles = StyleSheet.create({
  detailsTxt: {
    fontWeight: "400",
    fontSize: 14,
    color: white,
    fontFamily: "Nunito-400",
  },
});

export default MyRequestPlayersList;
