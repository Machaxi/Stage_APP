import React from 'react'
import { View,Text } from 'react-native'
import globalStyles from "../../mystyle"
const LabelValueDisplayItem = (props)=>{
    const {data} = props;
    return (
    <View style={{  flexDirection:'row', alignContent:"space-between", justifyContent:"space-between", paddingVertical:5}}>
        <Text style={props.isBigDisplay?globalStyles.LabelBig:globalStyles.LabelRegular}>{data.label}</Text>
        <Text style={props.isBigDisplay?globalStyles.LabelBig:globalStyles.LabelRegular}>{data.value}</Text>
    </View>);
}
LabelValueDisplayItem.defaultProps = {
    isBigDisplay: false,
  }
export default LabelValueDisplayItem
