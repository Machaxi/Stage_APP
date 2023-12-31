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
  selectedTime,
  bookings,
  guestCount,
  entirecourt,
  selectedTimePeriod,
  preferredDate,
}) => {
  return (
    <ScrollView style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {timeData.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={timeData}
          renderItem={({ item }) => {
            return (
              <SelectTimeItem
                width={deviceWidth * 0.37}
                preferredDate={preferredDate}
                isSelected={item?.courtTimingId == selectedTime}
                image={require("../../images/playing/clock.png")}
                selectItem={selectedTime}
                startTime={item?.startTime}
                id={item?.courtTimingId}
                bookings= {bookings}
                guestCount={guestCount}
                entirecourt={entirecourt}
                item={item}
                // name={`${item.startTime} - ${item.endTime}`}
                name={`${item?.displayTime}`}
                onPress={(val) => {
                  selectedTimePeriod({
                    startTime: item?.startTime,
                    endTime: item.endTime,
                  });
                  setSelectedTime(val);
                }}
              />
            );
          }}
        />
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default SelectPlayingTime;
