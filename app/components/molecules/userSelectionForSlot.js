import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { greyColorVariant, yellowVariant2 } from "../../containers/util/colors";
import UserPickerForSlot from "./userPickerForSlot";

const UserSelectionForSlot = ({ user, setUserVal }) => {
  return (
    <View
      style={styles.userSelectionBox}
    >
      <UserPickerForSlot
        placeHolder={{ label: "Select user", value: null }}
        data={[
          { label: "Yourself", value: "yourself" },
          { label: "Entire Court", value: "entire_court" },
          { label: "Coming with Guest", value: "with_guest" },
        ]}
        value={user}
        onSelect={(val) => setUserVal(val)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userSelectionBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: yellowVariant2,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default UserSelectionForSlot;
