import React, { Component } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Linking,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Keyboard,
  Text,
  BackHandler,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { Card } from "react-native-paper";
import { Rating } from "react-native-ratings";
import { connect } from "react-redux";
import {
  getAllAcademy,
  search,
  search_auto_suggest,
} from "../../redux/reducers/BrowseAcademyReducer";
import Autocomplete from "react-native-autocomplete-input";
import axios from "axios";
import BaseComponent, {
  defaultStyle,
  getBaseUrl,
  EVENT_UPDATE_DIALOG,
} from "./../BaseComponent";
import { RateViewFill } from "../../components/Home/RateViewFill";
import { getData, storeData, isSignedIn } from "../../components/auth";
import Events from "../../router/events";
import FastImage from "react-native-fast-image";
import { GUEST } from "../../components/Constants";
import StarRating from "react-native-star-rating";
import UpdateAppDialog from "../../components/custom/UpdateAppDialog";
import Geolocation from "react-native-geolocation-service";

var filterData = "";
var notification_count = 0;

class AcademyListing extends BaseComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "Quicksand-Medium",
              fontSize: 16,
              color: "#404040",
            }}
          >
            {navigation.getParam("title") == undefined
              ? "Machaxi"
              : navigation.getParam("title")}
          </Text>
        </View>
      ),
      headerStyle: {
        elevation: 2,
        shadowOpacity: 1,
        borderBottomWidth: 0,
      },
      headerTitleStyle: styles.headerStyle,
      headerLeft: (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {navigation.getParam("show_back") ? (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{ padding: 7 }}
              activeOpacity={0.8}
            >
              <Image
                source={require("../../images/go_back_arrow.png")}
                style={{ width: 20, height: 16, marginLeft: 12 }}
              />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}
            style={{ padding: 7 }}
            activeOpacity={0.8}
          >
            <Image
              source={require("../../images/hamburger.png")}
              style={{ width: 20, height: 16, marginLeft: 12 }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight:
        navigation.getParam("show_bell") == undefined ? (
          <View />
        ) : (
          <TouchableOpacity
            style={{ marginRight: 8 }}
            onPress={() => {
              navigation.navigate("NotificationList");
            }}
            activeOpacity={0.8}
          >
            <ImageBackground
              resizeMode="contain"
              source={require("../../images/bellicon.png")}
              style={{
                width: 22,
                height: 22,
                marginLeft: 12,
                marginRight: 12,
                alignItems: "flex-end",
              }}
            >
              {navigation.getParam("notification_count", 0) > 0 ? (
                <View
                  style={{
                    width: 16,
                    height: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30 / 2,
                    backgroundColor: "#ED2638",
                  }}
                >
                  {/* <Text style={[defaultStyle.bold_text_10, { fontSize: 10, color: 'white' }]}>
                                    {navigation.getParam('notification_count', '')}</Text> */}
                  <Text
                    style={[
                      defaultStyle.bold_text_10,
                      { fontSize: 8, color: "white" },
                    ]}
                  >
                    {navigation.getParam("notification_count", "") > 99
                      ? "99+"
                      : navigation.getParam("notification_count", "")}
                  </Text>
                </View>
              ) : null}
            </ImageBackground>
          </TouchableOpacity>
        ),
    };
  };

  constructor(props) {
    super(props);
    this.secondTextInputRef = React.createRef();
    this.setNavigation(this.props.navigation);
    this.state = {
      academies: null,
      query: "",
      autodata: [],
      suggestionResult: [],
      isAutoSuggest: false,
      isRefreshing: false,
      job_vacancy: false,
      book_court: false,
      firstInstance: true,
      show_must_update_alert: false,
      latitude: 0.0,
      longitude: 0.0,
    };
    this._handleChange = this._handleChange.bind(this);
    this.state.job_vacancy = this.props.navigation.getParam("vacancy");
    this.state.book_court = this.props.navigation.getParam("book_court");

    this.refreshEvent = Events.subscribe("OPEN_PROFILE", () => {
      this.props.navigation.navigate("EditProfile");
    });
  }

  _refresh() {
    // setTimeout(()=>{
    // },100)
    //this.getAcademyList()
    //
  }

  _handleChange(e) {
    //console.warn('_handleChange => ', e)
    this.setState({
      query: e,
    });
    this.getAutoSuggestion();

    if (e == "") {
      this.getAcademyList("");
    }
  }

  getAcademyList(query) {
    const job_vacancy = this.state.job_vacancy;
    const book_court = this.state.book_court;
    //fetch user location here in query pass latlngs
    const updatedQuery =
      query +
      "&user_latitude=" +
      this.state.latitude +
      "&user_longitude=" +
      this.state.longitude;
    console.warn("query==>", updatedQuery);
    getData("header", (value) => {
      this.props
        .getAllAcademy(value, updatedQuery, job_vacancy, book_court)
        .then(() => {
          console.warn(
            "Res=> " + JSON.stringify(this.props.data.res.data.academies)
          );
          let status = this.props.data.res.success;
          if (status) {
            let list = this.props.data.res.data.academies;

            this.setState({
              academies: list,
              isRefreshing: false,
            });
            setTimeout(() => {
              this.state.firstInstance = false;
            }, 1000);
          }
        })
        .catch((response) => {
          console.log(response);
          this.setState({ isRefreshing: false });
        });
    });
  }

  async requestPermissions() {
    if (Platform.OS === "ios") {
      const auth = await Geolocation.requestAuthorization("whenInUse");
      if (auth === "granted") {
        this.fetchLocation();
      }
    }

    if (Platform.OS === "android") {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if ("granted" === PermissionsAndroid.RESULTS.GRANTED) {
        this.fetchLocation();
      } else {
        alert("Please provide location permission");
      }
    }
  }

  fetchLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        var lats = parseFloat(position.coords.latitude);
        var lngs = parseFloat(position.coords.longitude);
        console.warn(lats, "--lats");
        console.warn(lngs, "--lngs");
        // alert(lats);
        this.setState(
          {
            latitude: lats,
            longitude: lngs,
          },
          () => {
            this.getAcademyList("");
          }
        );
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  componentDidMount() {
    this.requestPermissions();
    // getData('deep_linking', (value) => {
    //     console.warn('deep->', value)
    //     if (value == 'true') {
    //         this.props.navigation.navigate('Tournament')
    //         storeData('deep_linking', null)
    //     }
    // })

    isSignedIn().then((res) => {
      if (res) {
        getData("userInfo", (value) => {
          if (value != "") {
            const data = JSON.parse(value);
            const user_type = data["user"].user_type;
            if (this.state.book_court) {
              this.props.navigation.setParams({
                title: "Book and Play",
              });
            } else if (user_type == GUEST) {
              this.props.navigation.setParams({
                title: "Machaxi",
                show_bell: true,
              });
            } else {
              navigation.setParams({
                title: "Browse Academies",
              });
            }
          } else {
            navigation.setParams({
              title: "Browse Academies",
            });
          }
        });
      } else {
        navigation.setParams({
          title: "Browse Academies",
        });
      }
    });

    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.getNotifications();
        this.requestPermissions();
      }
    );

    this.refreshEvent = Events.subscribe("NOTIFICATION_CALL", (msg) => {
      this.getNotifications();
    });

    this.refreshEvent = Events.subscribe("FROM_REGISTRATION", (deep_data) => {
      let type = null;
      console.log("deep data", deep_data);
      if (deep_data != null) {
        storeData("deep_data", JSON.stringify(deep_data));
        let player_id = deep_data.player_id;
        let academy_id = deep_data.academy_id;
        type = deep_data.type;
        if (type !== null && type === "profile") {
          this.props.navigation.navigate("OtherPlayerDeatils", {
            player_id: player_id,
            academy_id: academy_id,
          });
        }
      }
      if (type == null) {
        setTimeout(() => {
          this.props.navigation.navigate("UpcomingTournamentDetail", deep_data);
        }, 100);
      }
    });

    this.requestPermissions();

    this.checkNotification();

    this.refreshEvent = Events.subscribe("NOTIFICATION_CLICKED", (msg) => {
      this.checkNotification();
    });

    this.refreshEvent = Events.subscribe(EVENT_UPDATE_DIALOG, (must_update) => {
      // must_update = true
      console.log("must update", must_update);
      this.setState({
        show_must_update_alert: must_update,
      });
    });
  }

  checkNotification() {
    if (global.NOTIFICATION_DATA) {
      try {
        let notification_for = global.NOTIFICATION_DATA.notification_for;
        this.notificationOpenScreen(notification_for);
        global.NOTIFICATION_DATA = null;
      } catch (err) {}
    }
  }

  getNotifications() {
    this.getNotificationCount((count) => {
      this.props.navigation.setParams({ notification_count: count });
      notification_count = count;
    });
  }

  onFilterSelected(data) {
    filterData = data;

    if (data != "") {
      //query_param = query

      let sport_type = "sport=Badminton";
      let academy_rating = "";
      let coach_rating = "";
      let academy_array = filterData[1];
      let coach_array = filterData[2];

      for (let i = 0; i < academy_array.data.length; i++) {
        let obj = academy_array.data[i];
        if (obj.is_selected) {
          academy_rating = academy_rating + "academy_ratings=" + obj.name + "&";
        }
      }
      if (academy_rating.length > 0) {
        academy_rating = academy_rating.substring(0, academy_rating.length - 1);
      }

      for (let i = 0; i < coach_array.data.length; i++) {
        let obj = coach_array.data[i];
        if (obj.is_selected) {
          coach_rating = coach_rating + "coach_ratings=" + obj.name + "&";
        }
      }
      if (coach_rating.length > 0) {
        coach_rating = coach_rating.substring(0, coach_rating.length - 1);
      }

      let query = sport_type + "&" + academy_rating + "&" + coach_rating;
      console.warn("selected = > ", query);
      this.getAcademyList(query);
    } else {
      this.getAcademyList("");
    }
  }

  find(query) {
    if (query === "") {
      return [];
    }
    const { suggestionResult } = this.state;
    const regex = new RegExp(`${query.trim()}`, "i");
    console.log("regex ", regex);
    return suggestionResult.filter((item) => item.name.search(regex) >= 0);
  }

  getAutoSuggestion() {
    // this.secondTextInputRef.current.focus();
    this.state.isAutoSuggest = true;
    let search_query = this.state.query;

    // this.props.search_auto_suggest(search_query).then(() => {
    //     console.warn('search_auto_suggest=> ' + JSON.stringify(this.props.data.res))

    // }).catch((response) => {
    //     console.log(response);
    // })
    let addCart =
      getBaseUrl() +
      `global/academy/search-auto-suggest?search_query=${search_query}`;
    if (this.state.job_vacancy) {
      addCart = addCart + `&vacancy=1`;
    }

    console.log("getAutoSuggestion=> " + addCart);

    axios
      .get(addCart)
      .then((response) => {
        let res = JSON.stringify(response.data.data.localities);
        //console.warn("response " + res);
        let isFirst = true;
        let data = [];
        let count = 0;
        for (let i = 0; i < response.data.data.localities.length; i++) {
          let obj = response.data.data.localities[i];
          if (isFirst) {
            obj["is_first"] = true;
            isFirst = false;
          } else {
            obj["is_first"] = false;
          }
          obj["is_academy"] = false;
          console.log(obj);
          data[count] = obj;
          count = count + 1;
        }
        isFirst = true;
        for (let i = 0; i < response.data.data.academies.length; i++) {
          let obj = response.data.data.academies[i];
          if (isFirst) {
            obj["is_first"] = true;
            isFirst = false;
          } else {
            obj["is_first"] = false;
          }
          obj["is_academy"] = true;
          console.log(obj);
          data[count] = obj;
          count = count + 1;
        }

        //console.warn(data)
        this.state.suggestionResult = data;
        this.setState({
          suggestionResult: data,
        });
        //this.secondTextInputRef.current.focus();
      })
      .catch((error) => {
        // handle error
        console.log("error " + error);
      });
  }

  getAcademicSearchResult(hardSearch) {
    this.state.suggestionResult = [];

    this.state.isAutoSuggest = true;
    let locality_id = "";
    let search_query = "";
    console.warn(this.state.query);
    if (hardSearch) {
      search_query = this.state.query;
      locality_id =
        this.state.locality_id == undefined ? "" : this.state.locality_id;
    } else {
      locality_id = this.state.query;
    }

    search_query = encodeURI(search_query);
    this.props
      .search(search_query, locality_id)
      .then(() => {
        console.warn(
          "Res=> " + JSON.stringify(this.props.data.res.data.academies)
        );
        let status = this.props.data.res.success;
        if (status) {
          let list = this.props.data.res.data.academies;

          this.setState({
            academies: list,
          });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  handleKeyDown = (e) => {
    console.warn("handle key ", this.state.query);
    this.getAcademicSearchResult(true);

    //let text = e.key
    //let text = this.state.query
    // if (text != undefined && text.length > 0) {
    //    // this.getAutoSuggestion()
    // }
  };

  onRefresh() {
    this.setState({ isRefreshing: true }, function() {
      this.getAcademyList("");
    });
  }
  handleKeyDown(e) {
    console.warn(e.nativeEvent.key);
    if (e.nativeEvent.key == "Enter") {
      dismissKeyboard();
    }
  }

  listHeader() {
    const autoData = this.find(this.state.query);

    return (
      <View
        style={{
          marginLeft: 16,
          marginRight: 16,
          marginTop: 16,
          marginBottom: 8,
          borderRadius: 12,
        }}
      >
        <Card
          style={{
            borderRadius: 4,
            elevation: 2,
            flex: 1,
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 1,
          }}
        >
          <TextInput
            onChangeText={this._handleChange}
            // onChangeText={(text) => {
            //     this.state.query = text
            //     //console.warn(text)
            //     this.getAutoSuggestion()
            // }}
            returnKeyType="search"
            //onKeyPress={this.handleKeyDown}
            onSubmitEditing={this.handleKeyDown}
            value={this.state.query}
            style={{
              marginLeft: 8,
              backgroundColor: "white",
              borderRadius: 16,
              height: 45,
              fontFamily: "Quicksand-Regular",
            }}
            placeholder="Search"
          />

          <FlatList
            keyboardShouldPersistTaps={"handled"}
            data={autoData}
            renderItem={({ item }) => (
              <View>
                {item.is_first ? (
                  <Text
                    style={{
                      backgroundColor: "#ECECEC",
                      color: "black",
                      paddingTop: 4,
                      paddingBottom: 4,
                      paddingLeft: 8,
                      fontSize: 12,
                      fontFamily: "Quicksand-Regular",
                    }}
                  >
                    {item.is_academy
                      ? "Academies by name"
                      : "Academies by location"}
                  </Text>
                ) : null}

                <TouchableOpacity
                  onPress={() => {
                    {
                      if (!item.is_academy) {
                        //this.state.query = item.name
                        this.setState({
                          query: item.name,
                        });
                        this.state.query = item.name;
                        this.state.locality_id = item.id;
                        this.getAcademicSearchResult(true);
                      } else {
                        this.props.navigation.navigate("AcademyProfile", {
                          id: item.id,
                        });
                      }
                    }
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      padding: 6,
                      color: "#000000",
                      fontFamily: "Quicksand-Regular",
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </Card>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("AcademyFilter", {
              onFilterSelected: this.onFilterSelected.bind(this),
              filterData: filterData,
            });
          }}
        >
          <Text
            style={{
              marginTop: 55,
              paddingTop: 4,
              paddingLeft: 20,
              paddingBottom: 2,
              textAlign: "right",
              color: "#404040",
              fontSize: 12,
              fontFamily: "Quicksand-Regular",
            }}
          >
            Filter
          </Text>
        </TouchableOpacity>

        <View
          style={{ width: "100%", height: 1, backgroundColor: "#d7d7d7" }}
        />
      </View>
    );
  }

  handleClick() {
    let link = "";
    if (Platform.OS == "ios") {
      link = "itms-apps://itunes.apple.com/us/app/id${1484093762}?mt=8";
    } else {
      link = "market://details?id=com.machaxi";
    }
    Linking.canOpenURL(link).then(
      (supported) => {
        supported && Linking.openURL(link);
      },
      (err) => console.log(err)
    );
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        this.props.navigation.navigate("AcademyProfile", { id: item.id });
      }}
    >
      <Card
        style={{
          borderRadius: 16,
          marginLeft: 16,
          marginRight: 16,
          marginTop: 8,
          marginBottom: 8,
          elevation: 2,
        }}
      >
        <View>
          <FastImage
            resizeMode={FastImage.resizeMode.stretch}
            style={{ height: 150, width: "100%", borderRadius: 16 }}
            source={{ uri: item.cover_pic }}
          />
          {/* <Image
            style={{ height: 130, width: "100%", borderRadius: 16 }}
            source={{ uri: item.cover_pic }}
          /> */}

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                paddingTop: 12,
                paddingLeft: 12,
                fontSize: 16,
                flex: 1,
                color: "#707070",
                fontFamily: "Quicksand-Medium",
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                paddingTop: 12,
                paddingRight: 12,
                fontSize: 16,
                color: "#707070",
                fontFamily: "Quicksand-Medium",
              }}
            >
              {parseFloat(item.distance)}
            </Text>
          </View>

          <View
            style={{
              alignItems: "center",
              paddingTop: 12,
              paddingBottom: 12,
              marginLeft: 12,
              flexDirection: "row",
              flex: 1,
            }}
          >
            {/* <Rating
                            type='custom'
                            ratingColor='#F4FC9A'
                            ratingBackgroundColor='#D7D7D7'
                            ratingCount={5}
                            imageSize={12}
                            readonly={true}
                            startingValue={item.ratings}
                            style={{ width: 80 }}
                        /> */}

            <StarRating
              style={{
                //height: 24,
                width: 70,
                marginRight: 6,
              }}
              containerStyle={{
                width: 70,
                marginRight: 6,
              }}
              starSize={14}
              disabled={true}
              emptyStar={require("../../images/ic_empty_star.png")}
              fullStar={require("../../images/ic_star.png")}
              halfStar={require("../../images/ic_half_star.png")}
              iconSet={"Ionicons"}
              maxStars={5}
              rating={item.ratings}
              ratingBackgroundColor={"#ff2200"}
              fullStarColor={"#F4FC9A"}
            />

            {/* <Text style={{
                            backgroundColor: '#DFDFDF', height: 19, width: 30, textAlign: 'center',
                            fontSize: 12,
                            color: '#707070',
                            paddingTop: 0,
                            borderRadius: 12,
                            fontFamily: 'Quicksand-Medium'
                        }}>{item.ratings.toFixed(1)}</Text> */}
            <RateViewFill>{item.ratings}</RateViewFill>
          </View>

          {this.state.job_vacancy ? (
            <View
              style={{
                flexDirection: "row",
                marginLeft: 16,
                marginTop: 0,
                marginBottom: 16,
                marginRight: 16,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={
                  {
                    //width: "60%"
                  }
                }
              >
                <Text
                  style={[
                    defaultStyle.bold_text_12,
                    {
                      color: "#707070",
                    },
                  ]}
                >
                  Open Positions
                </Text>
                <Text
                  style={[
                    defaultStyle.bold_text_16,
                    {
                      color: "#707070",
                    },
                  ]}
                >
                  Coach
                </Text>
              </View>

              <TouchableOpacity
                style={styles.rounded_button}
                onPress={() => {
                  const phoneNumber = item.academy_contact;
                  if (phoneNumber != undefined)
                    Linking.openURL(`tel:${phoneNumber}`);
                }}
              >
                <Text
                  style={[
                    defaultStyle.bold_text_14,
                    {
                      textAlign: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      color: "white",
                    },
                  ]}
                >
                  {" "}
                  Call
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {this.state.book_court ? (
            <View
              style={{
                flexDirection: "row",
                marginBottom: 16,
                marginLeft: 4,
                marginRight: 4,
                marginTop: 8,
              }}
            >
              {item.coaching_enabled ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={defaultStyle.rounded_button}
                  onPress={() => {
                    this.props.navigation.navigate("AcademyBatch", {
                      academy_id: item.id,
                    });
                  }}
                >
                  <Text style={[defaultStyle.bold_text_14, { color: "white" }]}>
                    View Batches
                  </Text>
                </TouchableOpacity>
              ) : null}

              {item.book_and_play_enabled ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={defaultStyle.rounded_button}
                  onPress={() => {
                    this.props.navigation.navigate("ChooseTimeDate", {
                      id: item.id,
                      name: item.name,
                    });
                  }}
                >
                  <Text style={[defaultStyle.bold_text_14, { color: "white" }]}>
                    Book Court
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}
        </View>
      </Card>
    </TouchableOpacity>
  );

  render() {
    let academies = this.state.academies;
    let firstInstance = this.state.firstInstance;
    let show_must_update_alert = this.state.show_must_update_alert;

    if (
      firstInstance == true &&
      !this.state.isRefreshing &&
      this.props.data.loading &&
      !this.state.isAutoSuggest
    ) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#67BAF5" />
        </View>
      );
    }

    return (
      <View style={styles.chartContainer}>
        <View
          style={{
            zIndex: 10,
          }}
        >
          {this.listHeader()}
        </View>
        {academies != null && academies.length > 0 ? (
          <FlatList
            style={{
              zIndex: 1,
            }}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isRefreshing}
            //ListHeaderComponent={() => this.listHeader()}
            data={this.state.academies}
            extraData={this.state.academies}
            renderItem={this._renderItem}
          />
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={defaultStyle.regular_text_14}>
              {academies == null ? "" : "No Academy Found"}
            </Text>
          </View>
        )}
        <UpdateAppDialog
          navigation={this.state.navigation}
          exitPressed={() => {
            this.setState({ show_must_update_alert: false });
            BackHandler.exitApp();
            //this.props.navigation.goBack(null)
          }}
          updatePressed={() => {
            this.setState({ show_must_update_alert: false });
            this.handleClick();
          }}
          visible={show_must_update_alert}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.BrowseAcademyReducer,
  };
};
const mapDispatchToProps = {
  getAllAcademy,
  search,
  search_auto_suggest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AcademyListing);

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
  },
  rounded_button: {
    width: 100,
    padding: 10,
    borderRadius: 20,
    //borderWidth: 1,
    borderColor: "#67BAF5",
    backgroundColor: "#67BAF5",
    color: "white",
    textAlign: "center",
    fontFamily: "Quicksand-Medium",
  },
});
