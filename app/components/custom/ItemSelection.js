import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Dialog, { DialogContent } from "react-native-popup-dialog";
const ItemSelection = (props) => {
  const renderList = () => {
    if (props.data)
      return props.data.map((item) => {
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              props.onItemSelected(item);
            }}
          >
            <View>
              <Text style={styles.itemStyle}>{item.name}</Text>
              <View
                style={{
                  borderBottomColor: "#EFEFEF",
                  borderBottomWidth: 0.5,
                }}
              />
            </View>
          </TouchableOpacity>
        );
      });
  };

  return (
    <Dialog
      width="70%"
      style={styles.dialogStyle}
      visible={props.visible}
      onTouchOutside={() => {
        props.onSelectionCancelled();
      }}
    >
      <DialogContent>
        <Text style={styles.header}>Select Sport</Text>
        <ScrollView
          style={{ maxHeight: 300 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {renderList()}
        </ScrollView>
      </DialogContent>
    </Dialog>
  );
};
const styles = StyleSheet.create({
  dialogStyle: {
    width: "50%",
  },

  header: {
    color: "#000000",
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "Quicksand-Bold",
  },
  itemStyle: {
    color: "#000000",
    textAlign: "center",
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: "Quicksand-Regular",
  },
});
export default ItemSelection;
