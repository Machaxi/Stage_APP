import React from "react";
import { Text, View, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { lightBlueColor } from "../../containers/util/colors";
import LinearGradient from "react-native-linear-gradient";
import SelectSports from "../custom/SelectSports";
import { Nunito_SemiBold } from "../../containers/util/fonts";

const SelectSportsBookSlot = ({ sportsList, selectedSportsId, setSelectedSportsIdVal }) => {
  return (
    <View>
      <Text style={styles.selectSport}>Select Sport</Text>
      <View>
        <FlatList
          data={sportsList}
          extraData={selectedSportsId}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
          renderItem={({ item, index }) => {
            return (
              <SelectSports
                id={item.id}
                image={item.image}
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
                selectItem={selectedSportsId}
                name={item.name}
                onPress={(id) => {
                  setSelectedSportsIdVal(id);
                }}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  selectSport: {
    color: lightBlueColor,
    marginTop: 24,
    marginBottom: 14,
    fontSize: 16,
    fontFamily: Nunito_SemiBold,
  },
});

export default SelectSportsBookSlot;
