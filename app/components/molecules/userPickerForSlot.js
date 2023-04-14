import React from "react";
import { View, Image } from "react-native";
import { pickerSelectStylesSelectUser, pickerSelectStylesShopScreen } from "../../containers/util/commonStyles";

import { deviceWidth } from "../../containers/util/dimens";
import RNPickerSelect from "react-native-picker-select";
import { greyVariant5 } from "../../containers/util/colors";

const UserPickerForSlot = ({ value, onSelect, data, placeHolder }) => {
  return (
    <View style={{ width: '100%' }}>
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
                  height: 24,
                  width: 24,
                  resizeMode: "contain",
                  alignSelf:'center',
                  marginTop: 8
                },
              ]}
              source={require("../../images/expand_more_golden.png")}
            />
          );
        }}
        style={pickerSelectStylesSelectUser}
        value={value}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
};

export default UserPickerForSlot;
