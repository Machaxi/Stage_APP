import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
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
    <ScrollView style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {timeData.length > 0 ?
        timeData.map((item) => {
          return (
            <SelectTimeItem
              // width={deviceWidth * 0.3}
              isSelected={item?.courtTimingId == selectedTime}
              image={require("../../images/playing/clock.png")}
              selectItem={selectedTime}
              id={item?.courtTimingId}
              name={`${item.startTime} - ${item.endTime}`}
              onPress={(val) => {
                setSelectedTime(val);
              }}
            />
          );
        })
      : null}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({

});

export default SelectPlayingTime;
