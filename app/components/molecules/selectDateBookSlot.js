import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { lightBlueColor } from "../../containers/util/colors";
import LinearGradient from "react-native-linear-gradient";
import SelectSports from "../custom/SelectSports";
import DateComponent from "../custom/DateComponent";
import moment from "moment";
import { Nunito_SemiBold } from "../../containers/util/fonts";

const SelectDateBookSlot = ({ date, setDateVal }) => {
  return (
    <View>
      <Text style={styles.selectSport}>Select Date</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.subview]}
          onPress={() => {
            setDateVal(`${moment(new Date()).format("yyyy-MM-DD")}`);
          }}
        >
          <DateComponent
            currentDate={date}
            day={"Today"}
            date={`${moment(new Date()).format("DD MMM")}`}
            myDate={`${moment(new Date()).format("yyyy-MM-DD")}`}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.subview, { marginLeft: 20 }]}
          onPress={() => {
            setDateVal(
              `${moment(new Date())
                .add(1, "days")
                .format("yyyy-MM-DD")}`
            );
          }}
        >
          <DateComponent
            currentDate={date}
            day={"Tomorrow"}
            date={`${moment(new Date())
              .add(1, "days")
              .format("DD MMM")}`}
            myDate={`${moment(new Date())
              .add(1, "days")
              .format("yyyy-MM-DD")}`}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  subview: {
    width: 98,
    height: 100,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  selectSport: {
    color: lightBlueColor,
    marginTop: 24,
    marginBottom: 14,
    fontSize: 16,
    fontFamily: Nunito_SemiBold,
  },
});

export default SelectDateBookSlot;
