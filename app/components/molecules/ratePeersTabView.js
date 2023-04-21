import React, {  } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { cyanVariant, greyVariant1, greyVariant11, white } from "../../containers/util/colors";
import { Nunito_Regular } from "../../containers/util/fonts";
import NamedRoundedGradientContainer from "./roundedNamedGradientContainer";
import { GradientLine } from "./gradientLine";
// import ProgressCircle from 'react-native-progress-circle';

var peerData = [
  { name: "UserName", proficiency: "Beginner", newRating: null },
  { name: "UserName", proficiency: "Intermediate", newRating: null },
  { name: "UserName", proficiency: "Beginner", newRating: null },
  { name: "UserName", proficiency: "Advanced", newRating: null },
];

export const RatePeersTabView = ({
}) => {

    const renderProficiency = ({item}) => {
        return (
          <View style={{marginRight: 9, marginBottom: 10}}>
            <NamedRoundedGradientContainer
              name={item?.level}
              txtColor={white}
              colors={item?.colors}
              image={item?.img}
              isImg={true}
            />
          </View>
        );
    }

    const renderItems = ({ item }) => {
      return (
        <View>
          <View style={{ flexDirection: "row", marginVertical: 11 }}>
            <Text style={styles.playerName}>{item?.name}</Text>
            <Text style={styles.proficiencyStyle}>
              {item?.proficiency}
            </Text>
          </View>
          <FlatList
            data={[
              {
                level: "Beginner",
                img: require("../../images/beginner_emoji.png"),
                colors: ["#24c6a01b", "#8ef9ab24"],
              },
              {
                level: "Intermediate",
                img: require("../../images/intermediate_emoji.png"),
                colors: ["#24c6a01b", "#8ef9ab24"],
              },
              {
                level: "Advanced",
                img: require("../../images/advance_emoji.png"),
                colors: ["#24c6a01b", "#8ef9ab24"],
              },
              {
                level: "Professional",
                img: require("../../images/professional_emoji.png"),
                colors: ["#24c6a01b", "#8ef9ab24"],
              },
            ]}
            numColumns={2}
            contentContainerStyle={{}}
            renderItem={renderProficiency}
          />
          
        </View>
      );
    };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(255, 255, 255, 0.068)",
          " rgba(255, 255, 255, 0.0102)",
        ]}
        style={styles.gradient}
      >
        <Text style={styles.ratePartners}>{"Rate playing partners"}</Text>
        <Text style={styles.dateTimeInfo}>
          {"19th march, 2023 | 4 - 5 PM"}
        </Text>
        <FlatList
          data={peerData}
          contentContainerStyle={{}}
          horizontal={false}
          renderItem={renderItems}
        />
        <GradientLine
          marginBottom={14}
          marginTop={16}
          marginLeft={0}
          colors={["#6b6a76", "#2a273a"]}
        />
        <Text style={[styles.ratePartners, {marginTop: 14}]}>
          {"Machaxi Play9 Sports Centre, Whitefield"}
        </Text>
        <Text style={styles.dateTimeInfo}>
          {"68/1, 1, near Parijatha Farm, Whitefield, Siddapura."}
        </Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    borderRadius: 10,
    marginTop: 23,
    borderColor: "#70765788",
    borderWidth: 1,
  },
  ratePartners: {
    color: greyVariant11,
    fontSize: 12,
    fontFamily: Nunito_Regular,
    fontWeight: "400",
  },
  playerName: {
    color: white,
    fontSize: 14,
    fontFamily: Nunito_Regular,
    fontWeight: "500",
  },
  proficiencyStyle: {
    color: greyVariant1,
    marginLeft: 12,
    fontSize: 14,
    fontFamily: Nunito_Regular,
    fontWeight: "400",
  },
  dateTimeInfo: {
    color: greyVariant1,
    fontSize: 10,
    fontFamily: Nunito_Regular,
    marginTop: 4,
    marginBottom: 18,
    fontWeight: "400",
  },
  gradient: {
    borderRadius: 10,
    paddingBottom: 14,
    padding: 12,
  },
});
