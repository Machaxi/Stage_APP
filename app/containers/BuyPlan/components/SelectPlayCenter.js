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
import CustomButton from "../../../components/custom/CustomButton";
import Geolocation from "react-native-geolocation-service";
import axios from "axios";
import { whiteGreyBorder } from "../../util/colors";
import Loader from "../../../components/custom/Loader";
import CenterDetails from "../../../components/custom/CenterDetails";
import {
  Nunito_Medium,
  Nunito_Regular,
  Nunito_SemiBold,
} from "../../util/fonts";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// const GOOGLE_MAPS_APIKEY = "AIzaSyAJMceBtcOfZ4-_PCKCktAGUbnfZiOSZjo";
const GOOGLE_MAPS_APIKEY = "AIzaSyAdy0zh69w3bYrzIMxuISgN_5V-PWA17RI";

class SelectPlayCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 100,
      proseednext: false,
      latitude: 0.0,
      longitude: 0.0,
      place: "             ",
      centerData: null,
      isLoading: false,
      isPermissionGranted: false,
      displayDistance: false,
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
      this.setState({ isPermissionGranted: true, displayDistance: true });
      this.fetchLocation();
    } else {
      this.setState({
        latitude: 12.9778,
        longitude: 77.5729,
        place: "Bangalore",
      });
      this.getsortedData();
    }
  }

  getsortedData() {
    const sortedAcademies = this.props.academiesList.sort((a, b) => {
      const distanceA = this.calculateDistance(a.latitude, a.longitude);
      const distanceB = this.calculateDistance(b.latitude, b.longitude);
      // return distanceB - distanceA;
      console.log(distanceA);
      console.log(distanceB);
      if (distanceA < distanceB) {
        console.log("efef");
        return -1;
      } else {
        console.log("efefv");
        return 1;
      }
    });
    console.log(sortedAcademies);
    console.log(this.props.academiesList);
    this.setState({
      centerData: sortedAcademies,
    });
  }

  fetchLocation() {
    this.setState({ isLoading: true });
    Geolocation.getCurrentPosition(
      (position) => {
        var lats = parseFloat(position.coords.latitude);
        var lngs = parseFloat(position.coords.longitude);
        this.setState({
          latitude: lats,
          longitude: lngs,
          isLoading: false,
        });
        this.getsortedData();
        // `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lats},${lngs}&radius=500&type=restaurant&key=${GOOGLE_MAPS_APIKEY}`
        // `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_APIKEY}`
        axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lats},${lngs}&key=${GOOGLE_MAPS_APIKEY}`
          )
          .then((response) => {
            const city = response.data.results[0].address_components.find(
              (component) => component.types.includes("locality")
            );
            if (city) {
              this.setState({ place: city.long_name });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      (error) => {
        this.setState({ isLoading: false });
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );
  }

  componentDidMount() {
    this.requestPermissions();
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
      return parseInt(d);
    }
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  handleSelect = async (data) => {
    const placeId = data.place_id;
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_MAPS_APIKEY}`;
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      const { lat, lng } = result.result.geometry.location;
      this.setState({
        latitude: lat,
        longitude: lng,
        displayDistance: true,
      });
      this.getsortedData();
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    handlepress = async () => {
      let centerValue = this.state.centerData.find(
        (item) => item.id === this.state.currentIndex
      );
      var distance =
        this.calculateDistance(centerValue.latitude, centerValue.longitude) +
        " Km away";
      if (!this.state.isPermissionGranted) {
        distance = "0 Km away";
      }
      this.props.onPress(centerValue, distance);
    };

    const renderItem = ({ item }) => {
      const distance =
        this.calculateDistance(item.latitude, item.longitude) + " Km away";
      return (
        <CenterDetails
          item={item}
          distance={distance}
          isExpanded={false}
          isDistance={this.state.displayDistance}
          currentIndex={this.state.currentIndex}
          onPress={() =>
            this.setState({ currentIndex: item.id, proseednext: true })
          }
        />
      );
    };

    return (
      <View style={styles.contained}>
        <Loader visible={this.state.isLoading} />
        <View style={{ flex: 0.93 }}>
          <Text style={styles.mainText}>Select preferred centre</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.addressView}>
              <Image
                source={require("../../../images/playing/my_location.png")}
                style={{ width: 17, height: 17, marginLeft: 8 }}
              />
              <GooglePlacesAutocomplete
                placeholder={this.state.place}
                onPress={this.handleSelect}
                textInputProps={{
                  placeholderTextColor: "white",
                }}
                ini
                query={{
                  key: GOOGLE_MAPS_APIKEY,
                  language: "en",
                }}
                styles={{
                  container: {
                    marginTop: -5,
                  },
                  textInputContainer: {
                    backgroundColor: "transparent",
                  },
                  textInput: {
                    height: 30,
                    backgroundColor: "transparent",
                    color: "white",
                  },
                }}
              />
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
    fontFamily: Nunito_Medium,
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
    fontFamily: Nunito_Medium,
    color: "#F0F0F0",
  },
  address: {
    flex: 0.5,
    marginVertical: 5,
    fontSize: 11,
    fontFamily: Nunito_Regular,
    color: "#DDDDDD",
  },
  line: {
    height: 1,
    backgroundColor: "#4D4D4D",
    marginBottom: 15,
    marginTop: 7,
    marginLeft: 10,
    width: "95%",
  },
  addressView: {
    flexDirection: "row",
  },
  addressText: {
    fontSize: 14,
    marginTop: -2,
    marginHorizontal: 10,
    fontFamily: Nunito_Medium,
    color: "#E7E7E7",
  },
  mainText: {
    fontSize: 16,
    marginVertical: 10,
    marginTop: 25,
    fontFamily: Nunito_SemiBold,
    color: "#D1D1D1",
  },
});

export default SelectPlayCenter;
