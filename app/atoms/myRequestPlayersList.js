import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { white } from "../containers/util/colors";
import NamedRoundedContainer from "./namedRoundedContainer";
import { Nunito_Regular } from "../containers/util/fonts";
import { getProficiencyName } from "../containers/util/utilFunctions";


const MyRequestPlayersList = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 15,
      }}
    >
      <Text style={[styles.detailsTxt, { marginRight: 8 }]}>
        {item?.name} {item?.guestCount > 0 && " + "+ item?.guestCount + " Guests"}
      </Text>
      <NamedRoundedContainer name= {getProficiencyName(item?.proficiency ? item?.proficiency.toLowerCase() : '')} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  detailsTxt: {
    fontWeight: "400",
    fontSize: 14,
    color: white,
    fontFamily: Nunito_Regular,
  },
});

export default MyRequestPlayersList;
