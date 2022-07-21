import React from 'react'
import { Text, View } from 'react-native';
import globalStyles from "../../mystyle"

const TextDisplay = (props)=>{

    const {label,value} = props

    const getValueFont =()=>{
        if(props.isSmall)
            return {...globalStyles.LabelSmall,color:"#404040", marginTop:3}
        else
            return {...globalStyles.LabelRegular,color:"#404040", marginTop:3}
    }
   
    return (
        <View style={{marginTop:10, width:props.width}}>
            <Text style={globalStyles.TextViewLabel}>{label}</Text>
            <Text style={getValueFont()}>{value}</Text>
        </View>
    );

}
TextDisplay.defaultProps={
    width:'50%',
    isSmall:false

}
export default TextDisplay;