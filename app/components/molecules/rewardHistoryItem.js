import React from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import {
    greyVariant1,
  greyVariant5,
  redVariant,
  white,
  yellowVariant2,
} from "../../containers/util/colors";
import moment from "moment";
import { Nunito_Medium, Nunito_Regular, Nunito_SemiBold } from "../../containers/util/fonts";

const RewardHistoryItem = ({ data, isLast }) => {
  return (
    <View style={[isLast ? { marginBottom: 20 } : null]}>
      <View style={styles.outerMain}>
        <Text style={styles.redeemInfo}>{data.remark ?? ''}</Text>
        <Text
          style={[
            styles.pts,
            {
              color:
                data.transaction_type == "CREDIT"
                  ? yellowVariant2
                  : redVariant,
            },
          ]}
        >
          {data.transaction_type == "CREDIT" ? "+ " : "- "}{" "}
           {typeof data.amount != undefined ? (data.amount  + " pts") : '0 pts'}
        </Text>
      </View>
      <Text style={styles.gameDetails}>{data.secondary_remark ?? ''}</Text>
      <Text style={styles.timing}>{moment(data.date).isValid ? `${moment(data.date).format("DD MMM, h:mm A")}` : ''}</Text>
      {isLast == false ? <View style={styles.bar} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  redeemInfo: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: Nunito_Medium,
    color: white,
  },
  outerMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bar: {
    width: "100%",
    backgroundColor: greyVariant5,
    height: 1,
    marginVertical: 18,
  },
  timing: {
    fontSize: 10,
    fontWeight: "500",
    fontFamily: Nunito_Medium,
    color: yellowVariant2,
  },
  pts: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: Nunito_SemiBold,
  },
  gameDetails: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: Nunito_Regular,
    color: greyVariant1,
    marginBottom: 11
  },
});

export default RewardHistoryItem;
