import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

const RequestHeaderTitle = ({ name }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        flex: 1,
        //alignItems: 'center'
      }}
    >
      <Text
        style={{
          fontFamily: "Nunito",
          fontSize: 20,
          fontWeight: '600',
          color: "#F2F2F2",
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default RequestHeaderTitle;
