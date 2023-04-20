import React from "react";
import {
  Text,
  View,
  Modal,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import {
  goldenYellowVariant,
  white,
  yellowVariant,
  yellowVariant4,
  yellowVariant6,
} from "../../containers/util/colors";
import { commonStyles } from "../../containers/util/commonStyles";
import { deviceWidth } from "../../containers/util/dimens";
import CouponAppliedModal from "./couponAppliedModal";
import SlotBookedModalInnerView from "./slotBookedModalInnerView";

const SlotBookedModal = ({ slotInfo,  modalVisible, setModalVisibility }) => {
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
        <SlotBookedModalInnerView
          slotInfo={slotInfo}
          setModalVisibility={() => setModalVisibility(false)}
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
});

export default SlotBookedModal;
