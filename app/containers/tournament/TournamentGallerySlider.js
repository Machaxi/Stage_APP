import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, Platform, Dimensions } from 'react-native';
import BaseComponent, { } from '../BaseComponent'
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import ToastExample from '../../native/ToastExample';
import FastImage from 'react-native-fast-image'



export default class TournamentGallerySlider extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            // images: [
            //     { url: 'http://i.imgur.com/XP2BE7q.jpg' },
            //     { url: 'http://i.imgur.com/5nltiUd.jpg' },
            //     { url: 'http://i.imgur.com/6vOahbP.jpg' },
            //     { url: 'http://i.imgur.com/kj5VXtG.jpg' },
            //     { url: 'http://i.imgur.com/XP2BE7q.jpg' },
            //     { url: 'http://i.imgur.com/5nltiUd.jpg' },
            //     { url: 'http://i.imgur.com/6vOahbP.jpg' },
            //     { url: 'http://i.imgur.com/kj5VXtG.jpg' },
            //     { url: 'http://i.imgur.com/XP2BE7q.jpg' },
            //     { url: 'http://i.imgur.com/5nltiUd.jpg' },
            //     { url: 'http://i.imgur.com/6vOahbP.jpg' },
            //     { url: 'http://i.imgur.com/kj5VXtG.jpg' }
            // ],
            images: [],
            show_zoom: true
        }

        let images = this.props.navigation.getParam('images')

        const imageURLs = images.map(
            (img, index) => ({
                url: images[index].image,
            })
        )
        this.state.images = imageURLs
    }

    componentDidMount() {

    }

    openFullView(index) {
        if (Platform.OS == 'android') {
            const images = this.props.navigation.getParam('images')
            ToastExample.show(JSON.stringify(images), index);
        } else {
            this.props.navigation.navigate('TournamentGallerySliderZoom',
                { images: this.state.images }
            )
        }
    }

    _renderItem = ({ item, index }) => {

        console.log('Item => ', JSON.stringify(item.url))

        return (
            <TouchableOpacity
                style={{
                    width: "33.33%",
                    margin: 2,
                }}
                onPress={() => {
                    this.openFullView(index)

                }}
            >
                {/* <Image
                    style={{
                        width: "100%",
                        height: 150,

                    }}
                    source={{ uri: item.url }}
                /> */}

                <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                        width: "100%",
                        height: 150,
                    }}
                    source={{ uri: item.url }}
                />
            </TouchableOpacity>

        )
    };


    render() {

        let data = this.state.images
        let show_zoom = this.state.show_zoom

        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>

                <FlatList
                    style={{
                        width: "100%"
                    }}
                    numColumns={3}
                    data={data}
                    renderItem={this._renderItem}
                />

                {/* <Modal visible={show_zoom}
                    transparent={false}>
                    <ImageViewer
                        saveToLocalByLongPress={true}
                        imageUrls={data} />
                </Modal> */}

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

