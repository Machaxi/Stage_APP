import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { commonStyles } from "../../containers/util/commonStyles";
import { goldenBgColor, offWhiteVariant } from "../../containers/util/colors";
import { Nunito_SemiBold } from "../../containers/util/fonts";

const SlotRelatedNotes = ({ courtBookingNotes }) => {
  const HighlightedText = ({ text }) => {
    const highlights = text.match(/<highlight>(.*?)<\/highlight>/g);
    if (!highlights) {
      return <Text style={styles.descriptionbenift}>{text}</Text>;
    }
    const parts = text.split(/(<highlight>.*?<\/highlight>)/g);
    const renderedText = parts.map((part, i) => {
      if (part.startsWith("<highlight>")) {
        const highlightText = part.replace(/<\/?highlight>/g, "");
        return (
          <Text
            key={i}
            style={[styles.descriptionbenift, { color: "#FF9C33" }]}
          >
            {highlightText}
          </Text>
        );
      } else {
        return (
          <Text key={i} style={styles.descriptionbenift}>
            {part}
          </Text>
        );
      }
    });
    return <Text>{renderedText}</Text>;
  };

  return (
    <View
      style={[
        {
          backgroundColor: goldenBgColor,
          borderRadius: 10,
          paddingVertical: 12,
          paddingHorizontal: 10,
        },
      ]}
    >
      <View style={[commonStyles.flexRowAlignStart, { marginBottom: 10 }]}>
        <Image
          source={require("../../images/info_icon.png")}
          style={{ height: 18, width: 18, marginRight: 4 }}
        />
        <Text style={styles.note}>{"Note"}</Text>
      </View>
      {courtBookingNotes &&
        courtBookingNotes.map((item) => (
          <View
            style={[
              commonStyles.flexRowAlignStart,
              { marginBottom: 6, paddingRight: 6 },
            ]}
          >
            <Image
              source={require("../../images/tickIcon.png")}
              style={{ height: 18, width: 18, marginRight: 4 }}
            />
            <HighlightedText text={item} />
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  note: {
    fontSize: 12,
    color: offWhiteVariant,
    fontFamily: Nunito_SemiBold,
  },
  descriptionbenift: {
    fontSize: 12,
    color: "#E6E6E6",
    fontFamily: Nunito_SemiBold,
  },
});

export default SlotRelatedNotes;
