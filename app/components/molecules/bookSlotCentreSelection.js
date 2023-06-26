import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  PermissionsAndroid,
  KeyboardAvoidingView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Geolocation from "react-native-geolocation-service";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import CenterDetails from "../custom/CenterDetails";
import Loader from "../custom/Loader";
import CustomButton from "../custom/CustomButton";
import { whiteGreyBorder } from "../../containers/util/colors";
import BookSlotNextBtn from "./bookSlotNextBtn";
import {
  Nunito_Medium,
  Nunito_Regular,
  Nunito_SemiBold,
} from "../../containers/util/fonts";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "../../containers/util/utilFunctions";
import moment from "moment";

// const GOOGLE_MAPS_APIKEY = "AIzaSyAJMceBtcOfZ4-_PCKCktAGUbnfZiOSZjo";

class BookSlotCentreSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 100,
      proseednext: false,
      latitude: 0.0,
      longitude: 0.0,
      place: "             ",
      isLoading: false,
      selectedTime: "Morning",
      centerData: null,
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
    // const sortedAcademies = this.props.academiesList.sort((a, b) => {
    //   const distanceA = this.calculateDistance(a?.latitude, a?.longitude);
    //   const distanceB = this.calculateDistance(b?.latitude, b?.longitude);
    //   return distanceA - distanceB;
    // });
    // const updatedList = sortedAcademies.sort((a, b) => {
    //   if (a.academy.id === this.props.preferredAcademyId) return -1; // move item with id 3 to the top
    //   if (b.academy.id === this.props.preferredAcademyId) return 1; // move item with id 3 to the top
    //   return 0; // maintain original order
    // });
    // this.setState({
    //   centerData: updatedList,
    // });

    const data = this.props.academiesList;
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const originLatitude = this.state.latitude;
      const originLongitude = this.state.longitude;

      const destinationLatitude = item.academy?.latitude ?? 12.9778;
      const destinationLongitude = item.academy?.longitude ?? 77.5729;
      axios
        .get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originLatitude},${originLongitude}&destinations=${destinationLatitude},${destinationLongitude}&key=${GOOGLE_MAPS_APIKEY}`
        )
        .then((response) => {
          const { status, rows } = response.data;
          console.log(response.data);
          if (status === "OK") {
            const { elements } = rows[0];
            const { distance } = elements[0];
            const d = distance.value;
            const numericDistance = parseInt(d);
            data[i].distance = numericDistance;
            data[i].displayDistance = distance.text;
            console.log(distance.text);
            console.log("olla");
            setTimeout(() => {
              const sortedAcademies = data.sort((a, b) => {
                return a.distance - b.distance;
              });
              this.setState({ centerData: sortedAcademies });
            }, 1000);
          }
        })
        .catch((error) => {
          this.setState({
            centerData: this.props.academiesList,
          });
          console.error("error");
        });
    }
  }

  fetchLocation = async () => {
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
        axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lats},${lngs}&key=${GOOGLE_MAPS_APIKEY}`
          )
          .then((response) => {
            const city = response.data.results[0]?.formatted_address;
            if (city.length > 30) {
              let cityString = city.substring(0, 30);
              let lastCommaIndex = cityString.lastIndexOf(",");
              let truncatedString = cityString.substring(0, lastCommaIndex);
              this.setState({ place: truncatedString });
            } else {
              this.setState({ place: city });
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
      { enableHighAccuracy: false, timeout: 25000 }
    );
  };

  hasSport(sportList) {
    for (let i = 0; i < sportList.length; i++) {
      if (sportList[i]?.sport_id === this.props.selectSport) {
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
      return parseInt(d);
    }
  }

  componentDidMount() {
    if (this.props.preferredAcademyId != null) {
      this.setState({
        currentIndex: this.props.preferredAcademyId,
        proseednext: true,
      });
    }
    this.requestPermissions();
    const now = new Date();
    if (now.getHours() > 12) {
      this.setState({ selectedTime: "Evening" });
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

  setSelectedTime(val) {
    this.setState({
      selectedTime: val,
    });
  }

  checkIfSlotActive(val, bookings) {
    const courtData = bookings.find(
      (item) => item.courtId === val.courtId && item.startTime == val.startTime
    );
    var guestvalue = 0;
    var showData = true;
    if (courtData) {
      guestvalue = courtData.maxPlayersAllowed - courtData.totalPlayers;
      console.log(guestvalue);
      if (this.props.entirecourt && guestvalue > 0) {
        showData = false;
      }
      if (this.props.guestCount >= guestvalue) {
        showData = false;
      }
    }
    return showData;
  }

  renderItem = ({ item }) => {
    distance = item.displayDistance;
    //TODO: verify whether bookings will be here
    if (this.hasSport(item?.academy?.sports)) {
      const greaterThan12 = [];
      const lessThan12 = [];
      for (let i = 0; i < item.courts.length; i++) {
        const startHour = parseInt(item.courts[i].startTime.split(":")[0]);
        if (startHour >= 12) {
          greaterThan12.push(item.courts[i]);
        } else {
          lessThan12.push(item.courts[i]);
        }
      }

      const EveningTime = greaterThan12.sort((a, b) => {
        const dateA = new Date(
          moment().format("YYYY-MM-DD") + "T" + a.startTime
        );
        const dateB = new Date(
          moment().format("YYYY-MM-DD") + "T" + b.startTime
        );
        return dateA - dateB;
      });
      const greaterThan = this.removeDublicateValue(EveningTime, item.bookings);

      const MorningTime = lessThan12.sort((a, b) => {
        const dateA = new Date(
          moment().format("YYYY-MM-DD") + "T" + a.startTime
        );
        const dateB = new Date(
          moment().format("YYYY-MM-DD") + "T" + b.startTime
        );
        return dateA - dateB;
      });
      const lessThan = this.removeDublicateValue(MorningTime, item.bookings);

      return (
        <CenterDetails
          item={item?.academy}
          distance={distance}
          isDistance={this.state.displayDistance}
          isExpanded={true}
          morningTimeData={lessThan}
          eveningTimeData={greaterThan}
          bookings={item?.bookings}
          entirecourt={this.props.entirecourt}
          guestCount={this.props.guestCount}
          preferredDate={this.props.preferredDate}
          selectedMorningTime={this.props.selectedMorningTime}
          selectedEveningTime={this.props.selectedEveningTime}
          setSelectedEveningTimeVal={(val) => {
            this.props.setSelectedEveningTimeVal(val);
            this.props.setSelectedMorningTimeVal(null);
          }}
          setSelectedMorningTimeVal={(val) => {
            this.props.setSelectedEveningTimeVal(null);
            this.props.setSelectedMorningTimeVal(val);
          }}
          currentIndex={this.state.currentIndex}
          selectedTime={this.state.selectedTime}
          setTime={(val) => this.setSelectedTime(val)}
          selectedTimePeriod={(val) => {
            console.log("valval--->0");
            console.log({ val });
            this.props.selectedTimePeriod(val);
          }}
          onPress={() => {
            this.setState({
              currentIndex: item?.academy.id,
              proseednext: true,
            });
            this.props.onAcademySelection(item);
          }}
        />
      );
    } else {
      return null;
    }
  };

  removeDublicateValue = (data, bookings) => {
    const uniqueData = [];
    for (let i = 0; i < data.length; i++) {
      const currentObject = data[i];
      let isDuplicate = false;
      for (let j = 0; j < uniqueData.length; j++) {
        if (uniqueData[j].displayTime === currentObject.displayTime) {
          if (this.checkIfSlotActive(currentObject, bookings)) {
            uniqueData[j] = currentObject;
          }
          isDuplicate = true;
          break;
        }
      }
      if (!isDuplicate) {
        uniqueData.push(currentObject);
      }
    }
    return uniqueData;
  };

  // handlepress = async () => {
  //   this.props.onPress()
  //   console.log('--')
  //   // let centerValue = this.props.academiesList.find(
  //   //   (item) => item.id === this.state.currentIndex
  //   // );
  //   // let distance = this.calculateDistance(
  //   //   centerValue.latitude,
  //   //   centerValue.longitude
  //   // );
  //   // const academiesList = this.props.academiesList.find(
  //   //   (item) => item.id === this.state.currentIndex
  //   // );
  //   //this.props.onPress(academiesList, distance);
  // };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.contained}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Loader visible={this.state.isLoading} />
        <View style={{ flex: 0.93 }}>
          <Text style={styles.mainText}>Select Centre</Text>
          {/* <TouchableOpacity activeOpacity={0.8}> */}
          <View style={styles.addressView}>
            <Image
              source={require("../../images/playing/my_location.png")}
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
            {/* <Text style={styles.addressText}>{this.state.place}</Text> */}
            <Image
              source={require("../../images/playing/arrow_back.png")}
              style={{
                width: 12,
                height: 7,
                marginLeft: 13,
                marginTop: 6,
              }}
            />
          </View>
          {/* </TouchableOpacity> */}
          <View style={styles.line} />
          <FlatList
            data={this.state.centerData}
            keyExtractor={(item) => item.id}
            renderItem={(item) => this.renderItem(item)}
            extraData={[this.state.currentIndex, this.state.centerData]}
          />
        </View>
      </KeyboardAvoidingView>
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
    width: "100%",
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
    fontFamily: Nunito_SemiBold,
    color: "#D1D1D1",
  },
});

export default BookSlotCentreSelection;
