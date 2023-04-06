
import React from "react";
import {Text, StyleSheet, TouchableOpacity} from "react-native";

const PlayerNameBox = ({ isParent, name, onSelected, isSelected, values }) => {
  return (
    <TouchableOpacity
      onPress= {()=>{
        if(!isParent)
        onSelected(values);
      }}
      style={[styles.container ,{
        backgroundColor: isSelected ? "#67BAF5" : "transparent",
        borderColor: isSelected ? "transparent" : "#656565",
      }]}
    >
      <Text
        style={[styles.name,{
          color: isSelected ? "#fff" : "#656565",
          fontWeight: isSelected ? "700" : "400",
        }]}
      >
        {isParent ? 'Parent' : name}
      </Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    marginRight: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  name: {
    fontSize: 12,
  },
});

export default PlayerNameBox;
