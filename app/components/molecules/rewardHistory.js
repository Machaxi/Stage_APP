import React from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { commonStyles } from "../../containers/util/commonStyles";
import {
  greyVariant3,
  greyVariant4,
  lightYellow1,
  white,
  whiteGreyBorder,
  yellowVariant2,
  yellowVariant5,
} from "../../containers/util/colors";
import Strings from "../../containers/util/strings";
import { deviceWidth } from "../../containers/util/dimens";
import RedeemInfo from "./redeemInfo";
import RewardHistoryItem from "./rewardHistoryItem";
import { rewardHistoryData } from "../../containers/util/dummyData/rewardHistoryData";
import { MonthNames } from "../../containers/util/utilFunctions";

const RewardHistory = ({ selectedMonth, selectedYear, rewardHistoryData }) => {
  return (
    <LinearGradient
      colors={["#ffffff11", "#ffffff03"]}
      style={styles.rewardContainer}
    >
      <Text style={[styles.reward]}>{Strings.rewardHistory}</Text>
      <LinearGradient
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        colors={["#dfc1886b", "#a975282b"]}
        style={[{ paddingVertical: 8, paddingHorizontal: 12 }]}
      >
        <Text style={[styles.date]}>{MonthNames[selectedMonth - 1] + ` ${selectedYear}`}</Text>
      </LinearGradient>
      <View style={{ paddingHorizontal: 14, marginTop: 25 }}>
        <FlatList
          data={rewardHistoryData}
          renderItem={({ item, index }) => (
            <RewardHistoryItem
              data={item}
              isLast={rewardHistoryData.length == index + 1}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  reward: {
    fontSize: 16,
    marginTop: 14,
    marginLeft: 12,
    fontWeight: "600",
    fontFamily: "Nunito-600",
    color: white,
    marginBottom: 25
  },
  date: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Nunito-400",
    color: white,
  },
  rewardContainer: {
    marginTop: 12,
    
    marginHorizontal: 15,
    borderColor: whiteGreyBorder,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default RewardHistory;
