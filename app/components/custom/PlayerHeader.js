import React from "react";
import { View, Text, ScrollView, ImageBackground, Image, Dimensions, StyleSheet } from "react-native";
import BaseComponent, {
    defaultStyle,
    getFormattedBadge,
    getFormattedCategory, getFormattedLevel, formattedName
} from "../../containers/BaseComponent";
import FastImage from 'react-native-fast-image'
import { getData, storeData } from "../auth";
import PlayerNameBox from "../../atoms/playerNameBox";
import events from "../../router/events";
import SvgUri from "react-native-svg-uri";


export default class PlayerHeader extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            childrenData: [],
            wholeData: null,
            showAcademyName : false
        }
    }

    componentDidMount(){
        // if (isParent(userData)) {
          getData("childrenData", (value) => {
            let childData = JSON.parse(value);
            if (childData?.length > 0) {
              var academyId = childData[0]?.academy_id;
              var isDifferent = false
              for(var i = 0; i < childData?.length; i++){
              
                if(academyId != childData[i].academy_id){
                
                  isDifferent = true
                }
              }
              this.setState({
                childrenData: childData,
                showAcademyName: isDifferent ? true : false
              });
            }
            
          });

          getData('userInfo', (value) => {
            userData = JSON.parse(value);
            this.setState({
                wholeData: JSON.parse(value)
            });
          })
        //}
    }

    onChildSelect(item){
        var tempuserData = this.state.wholeData;
        tempuserData["academy_id"] = item.academy_id;
        tempuserData["player_id"] = item.id;
        tempuserData["academy_name"] = item.academy_name;
        tempuserData["academy_rating"] = item.academy_rating;

        storeData("userInfo", JSON.stringify(tempuserData));

        storeData("academy_name", item.academy_name);
        storeData("academy_id", item.academy_id);
        storeData("academy_rating", item.academy_rating);
        storeData("player_id", item.id);
        events.publish(
            "REFRESH_DASHBOARD"
        );
        this.props.refreshPage();

        this.setState({})

    }


    render() {

        const { name, academy_name, badge, rank, score,
            player_level,
            reward_point,
            profile_pic,
            id,
            academy_id,
            player_category, operations } =
            this.props.player_profile

        // let is_toolbar = this.props.is_toolbar
        // console.warn('is_toolbar = ',is_toolbar)
        // if (is_toolbar == undefined)
        //     is_toolbar = false

        let is_toolbar = false
        let bg_img = require('../../images/toolbar_bottom.png')//require('../../images/RectangleImg.png')
        if (is_toolbar) {
            bg_img = require('../../images/toolbar_bottom.png')
        }

        let newName = formattedName(name)

        return (
          <View style={styles.main}>
            <ImageBackground
              //resizeMode="cover"
              source={bg_img}
              style={styles.top_container}
            >
              {/* <LinearGradient
                    colors={['#332B70', '#24262A']}
                    style={{ flex: 1 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 2.5, y: 0 }}
                > */}
              {/* <CustomHeader title="Navdeep's Academy ▼ " showBackArrow={true}
                                navigation={this.props.navigation} /> */}
              <View style={styles.profile_txt_view}>
                <Text style={styles.player_profile_txt}>
                  Players Profile
                </Text>
                <ScrollView
                  style={{ flexDirection: "row" }}
                  horizontal={true}
                >
                  {/* <PlayerNameBox
                    name={"Parent"}
                    isParent={true}
                    onSelected={this.onChildSelect.bind(this)}
                    values={null}
                    isSelected={typeof id == "undefined" || id == null}
                  /> */}
                  {this.props.is_parent &&
                    this.state.childrenData.map((val) => {
                      return (
                        <PlayerNameBox
                          name={val?.name}
                          isParent={false}
                          academyName={val?.academy_name}
                          showAcademyName={
                            this.state.showAcademyName
                          }
                          onSelected={this.onChildSelect.bind(
                            this
                          )}
                          values={val}
                          // isSelected={id == val?.id}
                          isSelected={
                            id == val?.id &&
                            academy_id == val?.academy_id
                          }
                        
                        />
                      );
                    })}
                </ScrollView>
              </View>
              <View style={{ marginTop: 36 }}>
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <View style={styles.player_picture}>
                    <FastImage
                      resizeMode={FastImage.resizeMode.contain}
                      style={styles.pic}
                      source={{ uri: profile_pic }}
                    />
                  </View>
                  <View style={styles.details_view}>
                    {/* <View style={{ transform: [{ rotate: "180deg" }] }}> */}
                    <Image
                      style={{
                        height: 22,
                        width: 30,
                        transform: [{ rotate: "180deg" }],
                      }}
                      source={require("../../images/spiked_banner.png")}
                    />
                    <View style={styles.badge_view}>
                      <Text
                        style={[
                          defaultStyle.bebas_text_blue_10,
                          styles.badge_text,
                        ]}
                      >
                        {getFormattedBadge(badge)}
                      </Text>
                    </View>
                    {/* </View> */}
                    <Image
                      style={{ height: 22, width: 30 }}
                      source={require("../../images/spiked_banner.png")}
                    />
                  </View>
                  <Text style={styles.player_name} numberOfLines={1}>
                    {newName}
                  </Text>

                  <View style={styles.flex_row}>
                    <Text style={styles.player_level}>
                      {getFormattedLevel(player_level)}
                    </Text>
                    <View style={styles.category_view}>
                      <Text style={styles.player_cat}>
                        {getFormattedCategory(player_category)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        );

    }
}
const styles = StyleSheet.create({
  scoreBox: {
    color: "white",
    marginRight: 20,
    marginTop: 16,
    marginBottom: 20,
    textAlign: "right",
    fontSize: 24,
    fontFamily: "Quicksand-Bold",
  },
  profile_txt_view: {
    marginTop: 8,
    marginLeft: 19,
    marginRight: 19,
  },
  main: {
    width: "100%",
    height: 376,
  },
  player_picture: {
      height: 113,
      width: 113,
      borderRadius: 113,
      borderColor: "#FFCB6A",
      borderWidth: 2,
      alignItems: "center",
      justifyContent: "center",
    },
  details_view: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 97,
  },
  pic: {
    height: 110,
    width: 110,
    borderRadius: 110,
  },
  player_profile_txt: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "400",
    marginBottom: 5,
  },
  badge_view:{
    backgroundColor: "#485FA0",
    height: 32,
    borderRadius: 2,
    width: 85,
    alignItems: "center",
    justifyContent: "center",
  },
  top_container: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: "hidden",
  },
  player_name: {
    width: 120,
    color: "white",
    marginRight: 0,
    textAlign: "center",
    fontFamily: "Quicksand-Bold",
    fontWeight: "700",
    fontSize: 28,
    marginTop: 19,
    marginBottom: 15,
  },
  badge_text: {
    width: 60,
    //height: 20,
    fontSize: 10,
    fontWeight: "400",
    textAlign: "center",
  },
  flex_row: {
    flexDirection: "row",
    alignItems: "center",
  },
  player_level: {
    color: "white",
    marginRight: 10,
    textAlign: "center",
    fontWeight: "400",
    fontSize: 12,
    fontFamily: "Quicksand-Medium",
  },
  box_label: {
    fontFamily: "Quicksand-Medium",
    marginLeft: 18,
    marginTop: 16,
    color: "#F4F4F4",
    fontSize: 12,
  },
  player_cat: {
    color: "white",
    marginRight: 0,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    fontFamily: "Quicksand-Bold",
  },
  category_view: {
    backgroundColor: "red",
    paddingLeft: 6,
    paddingRight: 6,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    borderRadius: 2,
  },
});