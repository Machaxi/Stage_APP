import React from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import BaseComponent from "../BaseComponent";
import FastImage from "react-native-fast-image";

export default class TournamentGallerySlider extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      show_zoom: true,
    };

    let images = this.props.navigation.getParam("images");

    const imageURLs = images.map((img, index) => ({
      url: images[index].image,
    }));
    this.state.images = imageURLs;
  }

  openFullView(index) {
    this.props.navigation.navigate("TournamentGallerySliderZoom", {
      images: [index],
    });
  }

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          width: "33.33%",
          margin: 2,
        }}
        onPress={() => {
          this.openFullView(item);
        }}
        key={index}
      >
        <FastImage
          resizeMode={FastImage.resizeMode.center}
          style={{
            width: "100%",
            height: 150,
          }}
          source={{ uri: item.url }}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <FlatList
          style={{
            width: "100%",
          }}
          numColumns={3}
          data={this.state.images}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
