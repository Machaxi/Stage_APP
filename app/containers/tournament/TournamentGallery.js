import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import BaseComponent, { } from './../BaseComponent'
import ImageBrowser from 'react-native-interactive-image-gallery'

export default class TournamentGallery extends BaseComponent {

    constructor(props) {
        super(props)

    }

    componentDidMount() {

    }



    render() {

        let images = this.props.navigation.getParam('images')


        const imageURLs = images.map(
            (img, index) => ({
                URI: images[index].image,
                thumbnail: images[index].image,
                id: String(index),
                title: '',
                description: ''
            })
        )
        return <ImageBrowser 
        infoTitleStyles={{
            borderColor:'red',
            borderWidth:4
        }}
        images={imageURLs} />
    }
}




const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    rounded_button: {
        width: '48%',
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
});

