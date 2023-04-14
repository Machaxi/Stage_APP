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
import SelectTimeItem from "../custom/selectTimeItem";
import { deviceWidth } from "../../containers/util/dimens";


const SelectPlayingTime = ({
  timeData,
  setSelectedTime,
  selectedTime
}) => {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      <FlatList
        data={timeData}
        extraData={selectedTime}
        contentContainerStyle={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
        renderItem={({ item, index }) => {
          return (
            <SelectTimeItem
              width={deviceWidth * 0.3}
              isSelected={item.time == selectedTime}
              image={require("../../images/playing/clock.png")}
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
              selectItem={selectedTime}
              name={item.time}
              onPress={(val) => {
                setSelectedTime(val);
              }}
            />
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default SelectPlayingTime;
