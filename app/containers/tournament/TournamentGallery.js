import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import BaseComponent, { } from './../BaseComponent'

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
                borderColor: 'red',
                borderWidth: 4
            }}
            images={imageURLs} />

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


