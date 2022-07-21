import React from 'react'

import { View, Text, Image } from 'react-native'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { ScrollView } from 'react-native-gesture-handler';


class ImageGuidelines extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {

        }


    }



    render() {

        return (

            <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>

                <ScrollView style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>
                    <View
                        style={{
                            margin: 16,
                            flex: 1,
                            marginTop: 10,
                            // justifyContent: 'center',
                            alignItems: 'center'

                        }}
                    >

                        <View
                            style={{
                                //justifyContent: 'center',
                                //alignItems: 'center',
                                marginTop: 20
                            }} >

                            {/* <Text style={defaultStyle.bold_text_14}>
                                Edit Image Guidelines:
                            </Text> */}

                            <Text style={[style.text, {
                                marginTop: 10
                            }]}>
                                These guidelines are only for the players profile photo appearing on the player dashboard and not for coaches/parents profile. We recommend following guidelines while clicking player photos:
                                </Text>
                            <Text style={[style.text, {
                                marginTop: 10,
                                fontstyle: 'italic'
                            }]}>
                                (These guidelines are recommended as we are using Machine Learning (ML) to automatically remove background from the players’ photo and give their profile photo a professional sportsperson feel. Our ML engines currently give best results if the following guidelines are adhered to)
                            </Text>


                            <Text style={[style.text, {
                                marginTop: 10
                            }]}>1. Ensure good lighting conditions.</Text>
                            <Text style={style.text}>2. We recommend that someone should click the player photo instead of taking a selfie.</Text>

                            <Text style={style.text}>
                            3. Player should be alone in the picture with no objects in hand and a clear background.
                            </Text>
                            <Text style={style.text}>4. Place the camera close to the body (~ 20 inches / 50 cms).
                            </Text>
                            <Text style={style.text}>
                            5. Fold your arms and look straight at the camera for a portrait profile.
                            </Text>
                            <Text style={style.text}>
                            6. Players can even wear the academy jersey for profile consistency with other academy players.
                        
                            </Text>

                            <Text style={[style.text, {
                                marginTop: 10
                            }]}>
                               Once you click on “Change Image” and “Save”, you will be re-directed to the Player Dashboard page. Here, you will first see the Player photo with background. Pull the screen down to refresh once and you should now be able to see the photo with removed background. 
                           </Text>

                        
                        <View style={{
                            marginTop:30,
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                        <Text style={defaultStyle.heavy_bold_text_14}>Player Dashboard (When you Save Photo)</Text>

                        <Image
                            resizeMode="contain"
                            source={require('../../images/guide_1.png')}
                            style={{
                                marginTop:20,
                                width: 300,
                                height: 200
                            }}
                        />

                        </View>
                        

                        <View style={{
                            marginTop:30,
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                        <Text style={defaultStyle.heavy_bold_text_14}>Player Dashboard (When you Refresh Screen)</Text>

                            <Image
                            resizeMode="contain"
                            source={require('../../images/guide_2.png')}
                            style={{
                                marginTop:20,
                                width: 300,
                                height: 200
                            }}
                        />
                        </View>


                    </View>


                    </View>
                </ScrollView>
            </View >
        );
    }

}

export default ImageGuidelines;


const style = {
    rounded_button: {
        width: '100%',
        height: 40,
        padding: 10,
        borderRadius: 20,
        //borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
    textinput: {
        textAlign: 'center',
        height: 36,
        color: '#404040',
        width: 150, borderBottomColor: '#DFDFDF',
        borderBottomWidth: 1,
        fontFamily: 'Quicksand-Regular'
    },
    text: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 12,
        color: '#404040'
    }
}