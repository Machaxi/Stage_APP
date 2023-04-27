import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Nunito_Regular, Nunito_SemiBold } from "../util/fonts";

class ShopScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../images/playing/shop.png")}
          style={{ marginBottom: 5, height: 128, width: 220 }}
        />
        <TouchableOpacity activeOpacity={0.8} disabled={true}>
          <LinearGradient
            colors={["#4E316A", "#774E92", "rgba(134, 92, 172, 0.89)"]}
            locations={[0, 0.46, 1]}
            style={styles.shopItem}
          >
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../images/playing/gift.png")}
                style={styles.image}
              />
              <Image
                source={require("../../images/playing/shadow_ellipse.png")}
                style={styles.shadowimage}
              />
            </View>
            <Text style={styles.insideText}>
              Guaranteed lowest pricing across online and offline channels
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} disabled={true}>
          <LinearGradient
            colors={["#545B82", "#4D5E80", "#477996"]}
            locations={[0, 0.46, 1]}
            style={styles.shopItem}
          >
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../images/playing/shoe.png")}
                style={styles.image}
              />
              <Image
                source={require("../../images/playing/shadow_ellipse.png")}
                style={styles.shadowimage}
              />
            </View>
            <Text style={styles.insideText}>
              Play more, Earn more, Shop more
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} disabled={true}>
          <LinearGradient
            colors={["#768254", "#5E7A3A", "#529647"]}
            locations={[0, 0.46, 1]}
            style={styles.shopItem}
          >
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../images/playing/cock.png")}
                style={styles.image}
              />
              <Image
                source={require("../../images/playing/shadow_ellipse.png")}
                style={styles.shadowimage}
              />
            </View>
            <Text style={styles.insideText}>Instant delivery</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 27,
  },
  shopItem: {
    flexDirection: "row",
    borderRadius: 8,
    alignItems: "center",
    height: 150,
    marginVertical: 10,
  },
  shop: {
    color: "transparent",
    fontSize: 94,
    fontFamily: Nunito_Regular,
  },
  image: {
    marginLeft: 10,
    width: 111,
    height: 111,
    marginVertical: 7,
  },
  shadowimage: {
    width: 85,
    height: 4,
    marginLeft: 3,
  },
  insideText: {
    marginLeft: 40,
    width: 150,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 14,
    color: "#F3F2F5",
    fontFamily: Nunito_SemiBold,
  },
});
export default ShopScreen;
