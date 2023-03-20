import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
const HeaderContentComponent = ({ header, contents, colors }) => {
  useEffect(() => {
    console.log(contents);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.header, { color: colors }]}>{header}</Text>
        {contents.map((index) => (
          <View style={styles.items}>
            <Image
              source={require("../../images/playing/dot.png")}
              style={{ width: 6, height: 6, marginRight: 10 }}
            />
            <Text style={styles.content}>{index}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: "#DDDDDD",
    fontWeight: "400",
    fontFamily: "Nunito-Regular",
  },
  items: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default HeaderContentComponent;
