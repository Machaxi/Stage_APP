import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import BaseComponent, { } from '../BaseComponent'
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import GallerySwiper from "react-native-gallery-swiper";



export default class TournamentGallerySliderZoom extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            // images: [
            //     {
            //         url: 'http://i.imgur.com/XP2BE7q.jpg',
            //         dimensions: { width: 100, height: 100 }
            //     },
            //     {
            //         url: 'http://i.imgur.com/5nltiUd.jpg',
            //         dimensions: { width: 100, height: 100 }
            //     },
            //     {
            //         url: 'http://i.imgur.com/6vOahbP.jpg',
            //         dimensions: { width: 100, height: 100 }
            //     },
            //     {
            //         url: 'http://i.imgur.com/kj5VXtG.jpg',
            //         dimensions: { width: 100, height: 100 }
            //     },
            //     {
            //         url: 'http://i.imgur.com/XP2BE7q.jpg',
            //         dimensions: { width: 100, height: 100 }
            //     },
            //     {
            //         url: 'http://i.imgur.com/5nltiUd.jpg',
            //         dimensions: { width: 100, height: 100 }
            //     },
            //     {
            //         url: 'http://i.imgur.com/6vOahbP.jpg',
            //         dimensions: { width: 100, height: 100 }
            //     },
            //     {
            //         url: 'http://i.imgur.com/kj5VXtG.jpg',
            //         dimensions: { width: 100, height: 100 }
            //     },
            //     {
            //         url: 'http://i.imgur.com/XP2BE7q.jpg',
            //         dimensions: { width: 100, height: 100 }
            //     },
            //     {
            //         url: 'http://i.imgur.com/5nltiUd.jpg',
            //         dimensions: { width: 100, height: 100 }
            //     },
            //     {
            //         url: 'http://i.imgur.com/6vOahbP.jpg',
            //         dimensions: { width: 100, height: 100 }
            //     },
            //     {
            //         url: 'http://i.imgur.com/kj5VXtG.jpg',
            //         dimensions: { width: 100, height: 100 }
            //     }
            // ],
            images: [],
            show_zoom: true

        }
        let images = this.props.navigation.getParam('images')
        console.log('images=>', JSON.stringify(images))
        for (let i = 0; i < images.length; i++) {
            let obj = { ...images[i], dimensions: { width: 500, height: 500 } }
            images[i] = obj
        }

        // const imageURLs = images.map(
        //     (img, index) => ({
        //         url: images[index].image,
        //         dimensions: { width: 500, height: 500 }
        //     })
        // )
        console.log('imageURLs=> ', JSON.stringify(images))
        this.state.images = images
    }

    componentDidMount() {

    }



    render() {

        let data = this.state.images
        let show_zoom = this.state.show_zoom

        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>

                <GallerySwiper
                    images={this.state.images}
                    sensitiveScroll={true}
                />

            </View>

        );
    }
}




const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#ffffff'
    },

});

