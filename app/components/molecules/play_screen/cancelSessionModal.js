import React from "react";
import {
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CancelSessionModalInnerView from "./cancelModalInnerView";


const CancelSessionModal = ({
  modalVisible,
  setModalVisibility,
  confirmType,
  onCancel,
  cancelTime,
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
        <CancelSessionModalInnerView
          cancelTime={cancelTime}
          confirmType={confirmType}
          onCancel={() =>{ 
            onCancel()
          }}
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

export default CancelSessionModal;
