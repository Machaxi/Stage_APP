import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import BaseComponent, { } from '../BaseComponent'
import Gallery from 'react-native-image-gallery';

export default class TournamentGallerySlider extends BaseComponent {

    constructor(props) {
        super(props)

    }

    componentDidMount() {

    }

    render() {


        return (
            <Gallery
                style={{ flex: 1, backgroundColor: 'black' }}
                images={[
                    { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
                    { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
                    { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
                    { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
                ]}
            />
        );
    }
}




const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#ffffff'
    },

});

