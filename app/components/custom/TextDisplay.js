import React from 'react'
import { Text, View } from 'react-native';
import globalStyles from "../../mystyle"

const TextDisplay = (props)=>{
    const {label,value} = props
    return (
        <View style={{marginTop:10, width:props.width}}>
            <Text style={globalStyles.TextViewLabel}>{label}</Text>
            <Text style={{...globalStyles.LabeRegular,color:"#404040", marginTop:3}}>{value}</Text>
        </View>
    );

}
TextDisplay.defaultProps={
    width:'50%'
}
export default TextDisplay;