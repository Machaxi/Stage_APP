import React, { useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet
  } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PeerRatingCard } from "./PeerRatingCard";
import { SelfRatingBox } from "./SelfRatingBox";
import { SeperatingLine } from "./SeperatingLine";
import { advanceColor, beginnersColor, blueVariant, greyVariant11, intermediatesColor, professionalsColor } from "../util/colors";
import { Nunito_Regular } from "../util/fonts";
import { commonStyles } from "../util/commonStyles";
import { GradientLine } from "../../components/molecules/gradientLine";

  
export const SelfRatingCard = ({editSelfRating}) => {

    const data = [
      {
        icon: require("./../../images/beginner.png"),
        title: "Beginner",
        id: 1,
        by: "4",
        titleColor: beginnersColor,
      },
      {
        icon: require("./../../images/intermediate.png"),
        title: "Intermediate",
        by: "2",
        titleColor: intermediatesColor,
      },
      {
        icon: require("./../../images/advance.png"),
        title: "Advance",
        by: "8",
        titleColor: advanceColor,
      },
      {
        // icon:<Intermediate height={50} width={50} />,
        icon: require("./../../images/professional.png"),
        title: "Professional",
        by: "5",
        titleColor: professionalsColor,
      },
    ];
      useEffect(() => {       
        
      }, [])

    const renderSocialFeedCard = ({ item }) => {
        return (
            <PeerRatingCard 
                item={item} 
            />
        );
    };
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(255, 255, 255, 0.068)",
          " rgba(255, 255, 255, 0.0102)",
        ]}
        style={styles.gradient}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Self Rating </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              {
                editSelfRating();
              }
            }}
          >
            <View style={commonStyles.flexRowNormal}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={require("../../images/edit_profile.png")}
              />

              <Text style={styles.edit}>Edit</Text>
            </View>
          </TouchableOpacity>
        </View>
        <SelfRatingBox
          title={"Beginner"}
          titleColor={"#21D096"}
          imageSize={20}
          icon={require("./../../images/beginner_emoji.png")}
        />
        <GradientLine
          marginTop={22}
          colors={["#6b6a76", "#2a273a"]}
        />
        <Text style={styles.peersRating}>Peers rating</Text>

        <FlatList data={data} renderItem={renderSocialFeedCard} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    shadowOpacity: 0.2,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    borderColor: "rgba(0, 0, 0, 0.2)",
    padding: 20
  },
  container: {
    marginHorizontal: 12,
    marginTop: 20,
    borderColor: "#70765788",
    borderWidth: 1,
    borderRadius: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },
  header: {
    color: greyVariant11,
    fontFamily: Nunito_Regular,
    fontWeight: '500',
    fontSize: 14,
    marginRight: 14
  },
  image: {
    width: 9,
    height: 9,
    borderRadius: 8,
  },
  edit: {
    color: blueVariant,
    fontFamily: Nunito_Regular,
    fontSize: 10,
    marginLeft: 4,
  },
  peersRating: {
    color: "#DFDFDF",
    marginBottom: 9,
    fontSize: 12,
    marginTop: 21,
    fontFamily: Nunito_Regular,
    fontWeight: "500",
  },
});