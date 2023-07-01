import React from "react";
import { Modal, TouchableOpacity, Image, StyleSheet } from "react-native";
import PaymentModalInnerView from "./paymentModalInner";
import AddGuestUserModalInnerView from "./addGuestUserModalInnerView";
import BeginnerWarningModalInnerView from "./beginnerWarningModalInnerView";

const BeginnerWarningModal = ({
  modalVisible,
  setModalVisibility,
  biggerImg,
  onBtnPress,
  forBeginner,
  onRequestBookSlot,
  forlevel,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisibility(!modalVisible);
      }}
    >
      <TouchableOpacity
        style={styles.centeredView}
        onPress={() => {
          setModalVisibility(false);
        }}
      >
        <Image style={styles.girlImg} source={biggerImg} />
        <BeginnerWarningModalInnerView
          setModalVisibility={() => setModalVisibility()}
          onRequestBookSlot={() => onRequestBookSlot()}
          forBeginner={forBeginner}
          forlevel = {forlevel}
          onBtnPress={() => onBtnPress()}
        />
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  girlImg: {
    position: "absolute",
    top: 90,
    zIndex: 4,
    width: 205,
    resizeMode: "contain",
    height: 296,
  },
  cross: {
    height: 25,
    width: 25,
  },
  modalView: {},
});

export default BeginnerWarningModal;
