import React from "react";
import {
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import PaymentModalInnerView from "./paymentModalInner";

const PaymentModal = ({ modalVisible, setModalVisibility, biggerImg, isSuccess, onBtnPress }) => {
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
        <Image
          style={styles.girlImg}
          source={biggerImg}
        />
       <PaymentModalInnerView isSuccess={isSuccess} onBtnPress={()=>onBtnPress()} />
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
    position: 'absolute',
    top: 90,
    zIndex: 4,
    width: 205,
    height: 296,
  },
  cross: {
    height: 25,
    width: 25,
  },
  modalView: {
    
  },
});

export default PaymentModal;
