import React from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import CustomAnimationProgress from "../../components/custom/CustomAnimationProgress";
import { Card } from "react-native-paper";
var deviceWidth = Dimensions.get("window").width - 20;
import {
  defaultStyle,
  getStatsImageById,
  getStatsImageBySportId,
} from "../../containers/BaseComponent";

import RNPickerSelect from "react-native-picker-select";

const MyStats = (props) => {
  renderItem = ({ item }) => (
    <TouchableOpacity
      key={item}
      activeOpacity={0.8}
      onPress={() => {
        props.onStatItemClicked(item);
      }}
    >
      <View style={{ margin: 10, flexDirection: "row", height: 60 }}>
        <Image
          resizeMode="contain"
          source={getStatsImageBySportId(props.currentSportId)}
          style={{
            width: 40,
            height: 40,
            marginRight: 20,
            alignItems: "center",
          }}
        />
        <View>
          <View
            style={{
              marginLeft: 8,
              marginRight: 15,
              marginBottom: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={defaultStyle.bold_text_14}>{item.name}</Text>
            <Text style={defaultStyle.bold_text_12}>{item.score}</Text>
          </View>

          <CustomAnimationProgress
            percent={item.score}
            width={deviceWidth - 120}
            height={14}
          />
        </View>
        <View
          style={{
            height: 50,
            //width: 30,
            alignItems: "center",
            marginTop: 26,
            marginRight: 10,
            marginLeft: 20,
          }}
        >
          <Image
            source={require("../../images/ic_drawer_arrow.png")}
            resizeMode="contain"
            style={{
              width: 5,
              height: 11,
              marginRight: 10,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ margin: 10 }}>
      <Card style={{ borderRadius: 12 }}>
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={[
                    defaultStyle.bold_text_14,
                    { marginLeft: 10, marginTop: 10 },
                  ]}
                >
                  My Stats
                </Text>

                <View
                  style={{
                    width: 60,
                    height: 3,
                    marginLeft: 10,
                    marginTop: 2,
                    marginBottom: 8,
                    backgroundColor: "#404040",
                  }}
                />
              </View>
            </View>
            <View style={{ minWidth: "40%" }}>
              <RNPickerSelect
                placeholder={{}}
                items={props.data}
                onValueChange={(value, index) => {
                  props.onSportItemSelected(props.data[index]);
                }}
                Icon={() => {
                  return (
                    <Image
                      style={{
                        width: 10,
                        alignSelf: "center",
                        marginTop: 15,
                        height: 8,
                      }}
                      source={require("../../images/down_arrow_reward.png")}
                    />
                  );
                }}
                style={pickerSelectStyles}
                value={props.currentSportId}
                useNativeAndroidPickerStyle={false}
              />
              <View
                style={{
                  width: "100%",
                  backgroundColor: "#C7C7CD",
                  height: 1,
                  marginTop: 2,
                }}
              />
            </View>
          </View>
          {props.isStatsLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <ActivityIndicator size="small" color="#67BAF5" />
            </View>
          ) : props.strenthList.length != 0 ? (
            <FlatList
              data={props.strenthList}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => item.id}
            />
          ) : (
            <View
              style={{
                marginTop: 30,
                flex: 1,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text>No data to show</Text>
            </View>
          )}
        </View>
      </Card>
    </View>
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 8,
    //paddingHorizontal: 10,
    borderColor: "#614051",
    borderRadius: 8,
    color: "black",
    //marginBottom: 4,
    //alignItems: 'center',
    //textAlign: 'center',
    fontFamily: "Quicksand-Regular",

    // to ensure the text is never behind the icon
  },
  inputAndroid: {
    paddingVertical: 4,
    fontSize: 14,
    fontFamily: "Quicksand-Regular",
    borderColor: "#614051",
    borderRadius: 8,
    color: "black",
    paddingRight: 10, // to ensure the text is never behind the icon
  },
});
const styles = StyleSheet.create({});
export default MyStats;
