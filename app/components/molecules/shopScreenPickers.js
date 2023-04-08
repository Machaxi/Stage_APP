
import React from "react";
import {
  View,
  Image,
} from "react-native";
import { pickerSelectStylesShopScreen } from "../../containers/util/commonStyles";

import { deviceWidth } from "../../containers/util/dimens";
import RNPickerSelect from "react-native-picker-select";
import { greyVariant5 } from "../../containers/util/colors";

const ShopScreenPicker = ({ value, onSelect, data, placeHolder }) => {
  return (
    <View style={{ minWidth: deviceWidth * 0.3 }}>
      <RNPickerSelect
        placeholder={placeHolder}
        items={data}
        onValueChange={(value, index) => {
          onSelect(value);
        }}
        Icon={() => {
          return (
            <Image
              style={[
                {
                  height: 13,
                  width: 6,
                  resizeMode: "contain",
                  marginTop: 19,
                  marginRight: 5,
                },
                {
                  transform: [{ rotate: "90deg" }],
                },
              ]}
              source={require("../../images/ic_drawer_arrow.png")}
            />
          );
        }}
        style={pickerSelectStylesShopScreen}
        value={value}
        useNativeAndroidPickerStyle={false}
      />
      <View
        style={{
          width: deviceWidth * 0.3,
          backgroundColor: greyVariant5,
          height: 1,
          marginTop: 2,
        }}
      />
    </View>
  );
};

export default ShopScreenPicker;
