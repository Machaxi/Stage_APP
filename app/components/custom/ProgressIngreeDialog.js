import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import BaseComponent, {
  defaultStyle,
  getStatsImageBySportId,
} from "../../containers/BaseComponent";
import CustomProgres from "./CustomProgress";

const width = 300;

export default class ProgressIngreeDialog extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  _renderItem = ({ item, index }) => {
    //console.log('item->', item)
    var deviceWidth = width - 20;

    return (
      <TouchableOpacity
        key={item}
        activeOpacity={0.8}
        onPress={() => {
          this.props.touchOutside(item);
        }}
      >
        <View
          style={{
            margin: 10,
            alignItems: "center",
            flexDirection: "row",
            height: 60,
          }}
        >
          <Image
            resizeMode="contain"
            source={getStatsImageBySportId(this.props.sportId)}
            style={{
              width: 40,
              height: 40,
              marginRight: 20,
              alignItems: "center",
            }}
          />
          <View>
            <View
              style={{
                marginLeft: 8,
                //marginRight: 15,
                flexDirection: "row",
                alignItems: "center",
                //justifyContent: 'space-between',
              }}
            >
              <Text
                style={[
                  defaultStyle.bold_text_14,
                  {
                    width: "75%",
                  },
                ]}
              >
                {item.name}
              </Text>

              <Image
                source={require("../../images/ic_drawer_arrow.png")}
                resizeMode="contain"
                style={{
                  justifyContent: "center",
                  width: 5,
                  height: 11,
                  marginLeft: 10,
                }}
              />

              {/* <Text style={defaultStyle.bold_text_12}>
                                {item.score}
                            </Text> */}
            </View>
            {/* <Progress.Bar style={{
                        backgroundColor: '#E1E1E1',
                        color: '#305F82', borderRadius: 11, borderWidth: 0
                    }}
                        progress={item.score / 100}
                        width={deviceWidth - 130} height={14} /> */}

            {/* <CustomProgres
                            percent={0}
                            width={deviceWidth - 120}
                            height={14}
                        /> */}
          </View>
          {/* <View style={{
                        height: 50,
                        //width: 30,
                        alignItems: 'center',
                        marginTop: 26, marginRight: 10, marginLeft: 20
                    }}>
                        
                    </View> */}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const data = this.props.performance_data;

    return (
      <Dialog
        width={width}
        height={500}
        visible={this.props.visible}
        dialogStyle={{ borderRadius: 12 }}
        onTouchOutside={() => {
          this.props.touchOutside();
        }}
      >
        <DialogContent style={styles.contentContainer}>
          {/* <View style={{
                        flexDirection: 'row',
                        paddingTop: 16,
                        paddingBottom: 16,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>

                    </View>

                    <View style={styles.header}></View> */}
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={1}
            data={data}
            renderItem={this._renderItem}
          />
        </DialogContent>
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'stretch',
        paddingTop: 10,
        paddingHorizontal: 0,
        margin: 0,
    },
    text: {
        color: '#404040',
        fontSize: 14,
        // marginVertical:7,
        padding: 8
    },
    text1: {
        color: '#000',
        fontSize: 15,
        // marginVertical:7,
        padding: 8
    },
    header: {
        width: '100%',
        height: 1,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF',
    }
})

