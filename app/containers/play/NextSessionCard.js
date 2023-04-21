import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
  } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { GameNameBox } from "./GameNameBox";
import { SeperatingLine } from "./SeperatingLine";
import { cyanVariant, greyVariant1, greyVariant11, redVariant, white, yellowVariant7 } from "../util/colors";
import { Nunito_Regular } from "../util/fonts";
import { GradientLine } from "../../components/molecules/gradientLine";
import NamedRoundedGradientContainer from "../../components/molecules/roundedNamedGradientContainer";

  
export const NextSessionCard = ({item,onCancelPress, expandList}) => {
    
    const renderPlayingPartnerList = ({item}) => {
       
        return (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.playerName}>
              {item?.name} {item?.guestCount > 0
                ? `+ ${item?.guestCount} Guest`
                : ""}
            </Text>
            <NamedRoundedGradientContainer
              name={item?.proficiency}
              colors={["#24c6a01b", "#8ef9ab24"]}
              txtColor={cyanVariant}
            />
          </View>
        );
    };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "(126.53deg, rgba(97, 74, 57, 0.432)",
          "rgba(91, 77, 67, 0.102)",
        ]}
        style={styles.containerInnerview}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>{item.title}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={onCancelPress}>
            <Text style={styles.cancelText}>Cancel Booking</Text>
          </TouchableOpacity>
        </View>

        <GradientLine
          marginBottom={14}
          marginTop={16}
          marginLeft={0}
          colors={["#6b6a76", "#2a273a"]}
        />
        <View style={styles.sportsDetail}>
          <Text style={styles.sports}>{item.sportsName}</Text>

          <Text style={styles.sports}>{item.sportsTime}</Text>
        </View>
        <View style={styles.gameContainer}>
          <NamedRoundedGradientContainer
            name={"Beginner"}
            colors={["#24c6a01b", "#8ef9ab24"]}
            txtColor={cyanVariant}
          />
        </View>
        <View style={{ marginTop: 12 }}>
          <Text style={styles.centerName}>{item.centreName}</Text>
          <Text style={styles.centerAddress}>{item.centreAddress}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.numberOfGUests}>Number of guests - </Text>
            <Text style={styles.numberOfGUests}> {item.numberOfGuests}</Text>
          </View>
        </View>
        <GradientLine
          marginBottom={14}
          marginTop={16}
          marginLeft={0}
          colors={["#6b6a76", "#2a273a"]}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ paddingVertical: 4 }}
          onPress={() => {
            console.log("???");
            expandList();
          }}
        >
          <View style={styles.playingPartnerContainer}>
            <Text style={[styles.playingPartnerHeading, { color: white }]}>
              Meet Playing Partners
            </Text>

            <Image
              style={[
                styles.arrow_img,
                {
                  transform: [
                    { rotate: item.isExpanded ? "270deg" : "90deg" },
                  ],
                },
              ]}
              source={require("../../images/ic_drawer_arrow.png")}
            />
          </View>
        </TouchableOpacity>

        {item.isExpanded ? (
          <View>
            <Text
              style={[
                styles.centerAddress,
                { marginTop: 16, color: greyVariant11 },
              ]}
            >
              {"Number of players right now - 5/6"}
            </Text>
            <FlatList
              data={item?.playing_partners}
              renderItem={renderPlayingPartnerList}
            />
          </View>
        ) : null}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: yellowVariant7,
    borderWidth: 0.5,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    marginHorizontal: 12,
    borderRadius: 20,
    marginTop: 32,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerInnerview: {
    borderRadius: 20,
    paddingVertical: 15,
    paddingLeft: 12,
    paddingRight: 20,
  },
  sportsDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  gameContainer: {
    width: "30%",
    justifyContent: "flex-start",
    marginTop: 6,
  },
  playingPartnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 19,
    marginTop: 10,
    fontFamily: Nunito_Regular,
    fontWeight: "500",
  },
  playerName: {
    marginRight: 12,
    color: white,
    fontFamily: Nunito_Regular,
    fontWeight: "500",
    fontSize: 14,
    marginBottom: 10
  },
  heading: {
    color: yellowVariant7,
    fontSize: 14,
    fontFamily: Nunito_Regular,
    fontWeight: "600",
  },
  playingPartnerHeading: {
    color: white,
    fontSize: 12,
    fontFamily: Nunito_Regular,
    fontWeight: "500",
  },
  cancelText: {
    color: redVariant,
    fontSize: 12,
    fontFamily: Nunito_Regular,
    fontWeight: "400",
  },
  sports: {
    color: white,
    fontSize: 14,
    fontFamily: Nunito_Regular,
    fontWeight: "600",
  },
  centerName: {
    color: white,
    fontSize: 12,
    fontFamily: Nunito_Regular,
    fontWeight: "400",
  },
  centerAddress: {
    color: greyVariant1,
    fontSize: 10,
    fontFamily: Nunito_Regular,
    marginTop: 4,
    fontWeight: "400",
  },
  numberOfGUests: {
    color: greyVariant11,
    fontSize: 12,
    fontFamily: Nunito_Regular,
    marginTop: 12,
    fontWeight: "400",
  },
  arrow_img: {
    height: 12,
    width: 15,
    marginLeft: 6,
    alignSelf: "center",
    resizeMode: "contain",
  },
});