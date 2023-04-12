import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  PermissionsAndroid,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../../components/custom/CustomButton";
import Geolocation from "react-native-geolocation-service";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { whiteGreyBorder } from "../../util/colors";

// const data = [
//   {
//     id: "1",
//     title: "Machaxi Play9 Sports Centre, Whitefield",
//     address: "68/1, 1, near Parijatha Farm, Whitefield, Siddapura.",
//     image: require("../../../images/playing/machaxicentre.png"),
//     distance: " 3.4 km away ",
//   },
//   {
//     id: "2",
//     title: "Machaxi Badminton Center Marathahalli",
//     address: "68/1, 1, near Parijatha Farm, Whitefield, Siddapura.",
//     image: require("../../../images/playing/machaxicentre.png"),
//     distance: " 3.4 km away ",
//   },
//   {
//     id: "3",
//     title: "Machaxi J Sports, Hoodi circle",
//     address: "68/1, 1, near Parijatha Farm, Whitefield, Siddapura.",
//     image: require("../../../images/playing/machaxicentre.png"),
//     distance: " 3.4 km away ",
//   },
//   {
//     id: "4",
//     title: "Machaxi Play9 Sports Centre, Whitefield",
//     address: "68/1, 1, near Parijatha Farm, Whitefield, Siddapura.",
//     image: require("../../../images/playing/machaxicentre.png"),
//     distance: " 3.4 km away ",
//   },
//   {
//     id: "5",
//     title: "Machaxi Badminton Center Marathahalli",
//     address: "68/1, 1, near Parijatha Farm, Whitefield, Siddapura.",
//     image: require("../../../images/playing/machaxicentre.png"),
//     distance: " 3.4 km away ",
//   },
//   {
//     id: "6",
//     title: "Machaxi J Sports, Hoodi circle",
//     address: "68/1, 1, near Parijatha Farm, Whitefield, Siddapura.",
//     image: require("../../../images/playing/machaxicentre.png"),
//     distance: " 3.4 km away ",
//   },
// ];
const GOOGLE_MAPS_APIKEY = "AIzaSyAJMceBtcOfZ4-_PCKCktAGUbnfZiOSZjo";

class SelectCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 100,
      proseednext: false,
      latitude: 0.0,
      longitude: 0.0,
      place: "             ",
      centerData: null,
    };
  }

  async requestPermissions() {
    let isPermissionGranted = false;

    if (Platform.OS === "ios") {
      const auth = await Geolocation.requestAuthorization("whenInUse");
      if (auth === "granted") isPermissionGranted = true;
    }

    if (Platform.OS === "android") {
      let res = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (res === PermissionsAndroid.RESULTS.GRANTED)
        isPermissionGranted = true;
    }

    if (isPermissionGranted) {
      this.fetchLocation();
    } else {
      alert(
        "Please provide location permission to show distance of societies."
      );
    }
  }

  fetchLocation() {
    this.setState({ loading: true });
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        var lats = parseFloat(position.coords.latitude);
        var lngs = parseFloat(position.coords.longitude);
        this.setState({
          latitude: lats,
          longitude: lngs,
          centerData: this.props.academiesList,
        });
        // `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lats},${lngs}&radius=500&type=restaurant&key=${GOOGLE_MAPS_APIKEY}`
        // `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_APIKEY}`
        const address = "del";
        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lats}&lon=${lngs}`
          )
          .then((response) => {
            console.log(response);
            this.setState({ place: response.data.address.village });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      (error) => {
        this.setState({ loading: false });
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  componentDidMount() {
    this.requestPermissions();
    this.setState({ centerData: this.props.academiesList });
  }

  hasSport(sportList) {
    for (let i = 0; i < sportList.length; i++) {
      if (sportList[i].name === this.props.selectSport.name) {
        return true;
      }
    }
    return false;
  }

  calculateDistance(lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - this.state.latitude);
    const dLon = this.deg2rad(lon2 - this.state.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(this.state.latitude)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    if (this.state.latitude == 0) {
      return "loading";
    } else {
      return " " + d.toFixed(1) + " km away";
    }
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  render() {
    handlepress = async () => {
      // const myArrayString = JSON.stringify(this.props.academiesList[this.state.currentIndex - 1]);
      // AsyncStorage.setItem("center", myArrayString);
      let centerValue = this.props.academiesList.find(
        (item) => item.id === this.state.currentIndex
      );
      let distance = this.calculateDistance(
        centerValue.latitude,
        centerValue.longitude
      );
      this.props.onPress(
        this.props.academiesList.find(
          (item) => item.id === this.state.currentIndex
        )
      );
    };

    const renderItem = ({ item }) => {
      if (this.hasSport(item.sports)) {
        return (
          <TouchableOpacity
            onPress={() =>
              this.setState({ currentIndex: item.id, proseednext: true })
            }
          >
            <LinearGradient
              colors={
                item.id === this.state.currentIndex
                  ? ["rgba(251, 172, 79, 0.81)", "rgba(118, 87, 136, 0)"]
                  : ["rgba(255, 255, 255, 0.15)", "rgba(118, 87, 136, 0)"]
              }
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.item}
            >
              <View style={{ flex: 0.3 }}>
                <Image source={{ uri: item.cover_pic }} style={styles.image} />
                <Text style={styles.distance}>
                  {this.calculateDistance(item.latitude, item.longitude)}
                </Text>
              </View>
              <View style={styles.textContainer}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.title,
                      item.id === this.state.currentIndex && {
                        color: "#DFA35D",
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text style={styles.address}>{item.address}</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        );
      } else {
        return null;
      }
    };

    return (
      <View style={styles.contained}>
        <View style={{ flex: 0.93 }}>
          <Text style={styles.mainText}>Select preferred centre</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.addressView}>
              <Image
                source={require("../../../images/playing/my_location.png")}
                style={{ width: 17, height: 17, marginLeft: 8 }}
              />
              <Text style={styles.addressText}>{this.state.place}</Text>
              <Image
                source={require("../../../images/playing/arrow_back.png")}
                style={{ width: 12, height: 7, marginLeft: 13, marginTop: 6 }}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.line} />
          <FlatList
            data={this.state.centerData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            extraData={[this.state.currentIndex, this.state.centerData]}
          />
        </View>
        <View style={{ flex: 0.07, paddingTop: 10 }}>
          <CustomButton
            name="Next "
            image={require("../../../images/playing/arrow_go.png")}
            available={this.state.proseednext}
            onPress={handlepress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contained: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
    borderColor: whiteGreyBorder,
    borderWidth: 1,
    borderRadius: 10,
  },
  textContainer: {
    flex: 0.7,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  distance: {
    width: "88%",
    fontSize: 10,
    marginTop: -20,
    marginBottom: 5,
    fontFamily: "Nunito-500",
    color: "#FFFFFF",
    backgroundColor: "rgba(35, 35, 35, 0.66)",
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 5,
  },
  image: {
    width: 100,
    height: 90,
    marginRight: 10,
    marginVertical: 5,
    borderRadius: 6,
  },
  title: {
    flex: 0.5,
    fontSize: 14,
    marginTop: 8,
    fontFamily: "Nunito-500",
    color: "#F0F0F0",
  },
  address: {
    flex: 0.5,
    marginVertical: 5,
    fontSize: 11,
    fontFamily: "Nunito-400",
    color: "#DDDDDD",
  },
  line: {
    height: 1,
    backgroundColor: "#4D4D4D",
    marginBottom: 15,
    marginTop: 7,
    width: "40%",
  },
  addressView: {
    flexDirection: "row",
  },
  addressText: {
    fontSize: 14,
    marginTop: -2,
    marginHorizontal: 10,
    fontFamily: "Nunito-500",
    color: "#E7E7E7",
  },
  mainText: {
    fontSize: 16,
    marginVertical: 10,
    fontFamily: "Nunito-600",
    color: "#D1D1D1",
  },
});

export default SelectCenter;
