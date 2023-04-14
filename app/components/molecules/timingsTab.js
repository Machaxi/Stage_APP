import React from "react";
import { Text, View, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { greyVariant10, lightBlueColor, yellowVariant7, yellowVariant4 } from "../../containers/util/colors";
import LinearGradient from "react-native-linear-gradient";
import SelectSports from "../custom/SelectSports";

const TimingsTab = ({ name, image, onPress, isSelected }) => {
  return (
    <View
      style={{
        marginRight: 20,
        marginTop: 10,
        marginBottom: 20,
      }}
    >
      <View>
        <TouchableOpacity
          onPress={() => onPress(name)}
          style={{ flexDirection: "row" }}
        >
          <Image source={image} style={{ height: 28, width: 28 }} />
          <View style={{ flexDirection: "column", alignItems: "center", marginLeft: 6 }}>
            <Text
              style={[
                styles.timings,
                { color: isSelected ? yellowVariant4 : greyVariant10 },
              ]}
            >
              {name}
            </Text>
            {isSelected && (
              <View
                style={{
                  backgroundColor: yellowVariant4,
                  height: 3,
                  width: 34,
                  borderRadius: 20,
                  marginTop: 8,
                }}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timings: {
    fontSize: 16,
    fontFamily: "Nunito-600",
    color: yellowVariant7
  },
});

export default TimingsTab;
