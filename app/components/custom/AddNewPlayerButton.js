import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";
import globalStyles from "../../mystyle"
const AddNewPlayerButton = (props)=>{

    return (
        <TouchableOpacity onPress={props.onPress} >
        <View style={{ minWidth:0, flexDirection: 'row', alignItems: "center" }}>
            <Image
                style={{
                    width: 14,
                    alignSelf: "center",

                    height: 14,
                    marginRight: 5
                }}
                source={require("../../images/add_circle.png")}
            />
            <Text style={{...globalStyles.LabelRegular, color:'#667DDB'}}>Add New Player</Text></View>
    </TouchableOpacity>
    );

}

export default AddNewPlayerButton;
