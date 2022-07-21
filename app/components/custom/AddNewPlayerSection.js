import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import globalStyles from "../../mystyle"
import AddNewPlayerButton from './AddNewPlayerButton';
import ItemSelector from './ItemSelector';

const AddNewPlayerSection = (props) => {

    const [isAdditionRequired, setIsAdditionRequired] = useState();
    const [playerName, setPlayerName] = useState('');
    const [parentName, setParentName] = useState('');
    const [selectedGender, setSelectedGender] = useState({ label: '-', value: '-1' });
    const [gender, setGender] = useState([{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }, { label: 'Other', value: 'Both' }]);

    useEffect(() => {        
        setIsAdditionRequired(props.visible);

        setPlayerName(props.data.name);
        setParentName(props.data.parentName);
        if(props.data.gender)
            setSelectedGender(getSelectedGender(props.data.gender));
        else
            setSelectedGender(gender[0]);
        
    }, [])

    const getSelectedGender=(item)=>{
        for(let i=0;i<gender.length;i++)
            if(gender[i].value.toLowerCase() == item.toLowerCase()){
                return gender[i];
            }
    }

    const sendPlayerInfo=()=>{
        let playerInfo = {name:playerName, gender: selectedGender.value, parentName:parentName};
        props.onChange(playerInfo)
    }

    useEffect(()=>{
        if(isAdditionRequired)
            sendPlayerInfo();
    }, [playerName, parentName, selectedGender])
    
    const clearFormData = ()=>{
        setParentName("")
        setPlayerName("")
        setSelectedGender(gender[0]);
    }
    const handleOnAddNewPlayerClicked = () => {
        setIsAdditionRequired(true);
        clearFormData();
        props.onAddNewPlayerClicked();
    }

    const handleOnCancelClicked = () => {
        setIsAdditionRequired(false);
        clearFormData();
        props.onAddNewPlayerCancelledClicked();
    }

    const onGenderSelected = (item) => {
        setSelectedGender(item);
    }

    return (
        <View>
            {
            !props.isForGuestUser?<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical:10, alignContent:"center", alignItems:"center" }}>
                <AddNewPlayerButton onPress={handleOnAddNewPlayerClicked} />
                {isAdditionRequired ? <TouchableOpacity onPress={handleOnCancelClicked}>
                    <Image
                        style={{
                            width: 32,
                            alignSelf: "center",
                            height: 32,
                            marginRight: 5
                        }}
                        source={require("../../images/ic_close.png")}
                    />
                </TouchableOpacity> : null}
            </View>:null
            }
            {isAdditionRequired ?
                <View>
                    {props.isParentFieldRequired?<View style={{ width: "100%", marginBottom: 20 }}>
                        <Text style={globalStyles.TextViewLabel}>Parent Name (Mention NA if purchasing for Adult)</Text>
                        <TextInput
                            style={globalStyles.textinput}
                            label='Parent Name'
                            value={parentName}
                            onChangeText={(parentName) => setParentName(parentName)}
                        />
                    </View>:null}
                    <View style={{ width: "100%", marginBottom: 20 }}>
                        <Text style={globalStyles.TextViewLabel}>Player Name</Text>
                        <TextInput
                            style={globalStyles.textinput}
                            label='Player Name'
                            value={playerName}
                            onChangeText={(playerName) => setPlayerName(playerName)}
                        />
                    </View>

                    <View style={{ width: "100%", marginBottom: 20 }}>
                        <Text style={globalStyles.TextViewLabel}>Select Gender</Text>
                        <ItemSelector numColumns={3} data={gender} selectedItem={selectedGender.value} onItemSelected={onGenderSelected} />
                    </View>

                </View>
                : null}
        </View>

    );

}

AddNewPlayerSection.props={
    isForGuestUser:false,
    isParentFieldRequired:false
}

export default AddNewPlayerSection;
