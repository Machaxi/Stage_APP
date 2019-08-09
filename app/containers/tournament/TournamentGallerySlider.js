import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import BaseComponent, { } from '../BaseComponent'
import ImageBrowser from 'react-native-interactive-image-gallery'

export default class TournamentGallerySlider extends BaseComponent {

    constructor(props) {
        super(props)

    }

    componentDidMount() {


    }



    render() {

        let images = [
            'http://i.imgur.com/XP2BE7q.jpg' ,
            'http://i.imgur.com/5nltiUd.jpg',
            'http://i.imgur.com/6vOahbP.jpg',
            'http://i.imgur.com/kj5VXtG.jpg']

        const imageURLs = images.map(
            (img, index) => ({
                URI: images[index],
                thumbnail: images[index],
                id: String(index),
                title: '',
                description: ''
            })
        )
        return <ImageBrowser images={imageURLs} />
    }
}




const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#ffffff'
    },

});

