import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet, Modal, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

class Loader extends Component {
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
      >
        <View style={styles.centeredView}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.06)"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.modalView}
          >
            <ActivityIndicator size="large" color="#E2E2E2" />
            <Text style={styles.subtext}>Loading...</Text>
          </LinearGradient>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  subtext: {
    fontSize: 14,
    fontFamily: "Nunito-400",
    color: "#E2E2E2",
    marginLeft: 10,
    marginTop: 5,
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Loader;
