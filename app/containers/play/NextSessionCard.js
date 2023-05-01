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
import { cyanVariant, greyVariant1, greyVariant11, redVariant, redVariant3, white, yellowVariant2, yellowVariant7 } from "../util/colors";
import { Nunito_Regular } from "../util/fonts";
import { GradientLine } from "../../components/molecules/gradientLine";
import NamedRoundedGradientContainer from "../../components/molecules/roundedNamedGradientContainer";
import { commonStyles } from "../util/commonStyles";
import moment from "moment";
import { getProficiencyColor, getProficiencyGradients, getProficiencyName } from "../util/utilFunctions";

  
export const NextSessionCard = ({item, userId,onCancelPress, expandList}) => {
  
    var isToday = false;
    var gamePartners = []
    if(item?.date != null){
      if(moment(item?.date).format('MM-DD-YY') == moment(new Date()).format('MM-DD-YY')){
        isToday = true;
      }
    }
    
    if(item?.players?.length > 0){
      for (var i = 0; i < item?.players?.length; i++) {
        if (userId != item?.players[i]?.id) {
          gamePartners.add(item?.players[i]);
        }
      }
    }
    const renderPlayingPartnerList = ({item}) => {
       
        return (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.playerName}>
              {item?.name + (userId == item?.id ? "(You)" : "")}{" "}
              {item?.guestCount > 0
                ? `+ ${item?.guestCount} Guest`
                : ""}
            </Text>
            <NamedRoundedGradientContainer
              name={getProficiencyName(item?.proficiency)}
              colors={getProficiencyGradients(item?.proficiency)}
              txtColor={getProficiencyColor(item?.proficiency)}
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
          <Text style={styles.heading}>
            {"Next Session - " +
              (isToday ? "Today" : moment(item?.date).format("Mo MMMM YYYY"))}
          </Text>
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
          <Text style={styles.sports}>{item?.sport?.name}</Text>

          <Text style={styles.sports}>{item?.displayTime}</Text>
        </View>
        <View style={styles.gameContainer}>
          <NamedRoundedGradientContainer
            name={getProficiencyName(item?.proficiency)}
            colors={getProficiencyGradients(item?.proficiency)}
            txtColor={getProficiencyColor(item?.proficiency)}
          />
        </View>
        <View style={{ marginTop: 12 }}>
          <Text style={styles.centerName}>{item?.academy?.name}</Text>
          <Text style={styles.centerAddress}>{item?.academy?.address}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.numberOfGUests}>Number of guests - </Text>
            <Text style={styles.numberOfGUests}> {item?.guestCount}</Text>
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
          gamePartners != null && gamePartners?.length > 0 ? (
            <View>
              <Text
                style={[
                  styles.centerAddress,
                  { marginTop: 16, color: greyVariant11 },
                ]}
              >
                {/* TODO: */}
                {`Number of players right now - ${item?.maxPlayersAllowed}/${
                  gamePartners?.length
                }`}
              </Text>
              <FlatList
                data={gamePartners}
                renderItem={renderPlayingPartnerList}
              />
            </View>
          ) : (
            <Text style={styles.noPartners}>
              {
                "We apologise, but no one has scheduled sessions for this slot."
              }
            </Text>
          )
        ) : null}
        {item.isExpanded ? (
          <>
            <View style={{ height: 18, width: "100%" }} />
            <GradientLine
              marginBottom={14}
              marginTop={0}
              marginLeft={0}
              colors={["#6b6a76", "#2a273a"]}
            />
            <View
              style={[commonStyles.flexRowAlignStart, { marginVertical: 16 }]}
            >
              <Image
                source={require("../../images/info_red.png")}
                style={{ height: 18, width: 18, marginRight: 4 }}
              />
              <Text style={styles.noteTxt}>
                {
                  // TODO: need to handle this
                  "To cancel a session player, you must do so at least three hours before the booking time."
                }
              </Text>
            </View>
          </>
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
  noteTxt: {
    fontSize: 12,
    marginRight: 10,
    color: redVariant3,
    fontFamily: Nunito_Regular,
    fontWeight: '400'
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
    marginBottom: 10,
  },
  noPartners: {
    color: yellowVariant2,
    fontFamily: Nunito_Regular,
    fontWeight: "400",
    fontSize: 12,
    marginBottom: 16,
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