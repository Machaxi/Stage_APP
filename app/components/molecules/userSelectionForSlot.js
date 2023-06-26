import React, { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { greyColorVariant, yellowVariant2 } from "../../containers/util/colors";
import UserPickerForSlot from "./userPickerForSlot";
import ModalDropdown from "react-native-modal-dropdown";

const UserSelectionForSlot = ({ user, setUserVal, data, label, reset }) => {
  const dropdownRef = useRef(null);
  useEffect(() => {
    console.log(reset);
    console.log(data);
    if (!reset) {
      dropdownRef.current.select(-1);
    }
  });
  return (
    <View style={styles.userSelectionBox}>
      {/* <UserPickerForSlot
        placeHolder={{ label: label, value: null }}
        data={data}
        value={user}
        onSelect={(val) => setUserVal(val)}
      /> */}
      <ModalDropdown
        ref={dropdownRef}
        options={data}
        defaultValue={label}
        style={{
          justifyContent: "center",
          flex: 1,
          marginLeft: 10,
          marginRight: -30,
          zIndex: 1,
        }}
        textStyle={{ padding: 10, fontSize: 16, color: "white" }}
        dropdownStyle={{
          width: "75%",
          height: data.length > 0 ? data.length * 45 : 45,
          borderRadius: 10,
          borderColor: "#FCB550",
          backgroundColor: "rgba(94, 94, 94, 1)",
        }}
        dropdownTextStyle={{
          padding: 10,
          fontSize: 16,
          color: "white",
          borderRadius: 10,
          backgroundColor: "rgba(94, 94, 94, 1)",
        }}
        onSelect={(val) => setUserVal(data[val])}
      />
      <View style={{ flex: 0.1, justifyContent: "center" }}>
        <Image
          style={[
            {
              height: 24,
              width: 24,
              resizeMode: "contain",
              alignSelf: "center",
              marginLeft: -10,
            },
          ]}
          source={require("../../images/expand_more_golden.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userSelectionBox: {
    flex: 1,
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
