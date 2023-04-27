import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  Nunito_Bold,
  Nunito_Regular,
  Nunito_SemiBold,
} from "../../containers/util/fonts";
import DatePicker from "react-native-datepicker";
import moment from "moment";

const PlanDetails = (props) => {
  const [selectDate, setSelectDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  const convertToDate = (dateString) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const [day, month] = dateString.split(" ");
    const date = new Date(`${currentYear}-${getMonthNumber(month)}-${day}`);
    return date;
  };

  useEffect(() => {
    const startdate = convertToDate(props.startDate);
    const endDate = convertToDate(props.endDate);
    setSelectDate(startdate);
    setStartDate(startdate);
    setEndDate(endDate);
  }, []);

  const getMonthNumber = (monthName) => {
    // Map month names to their corresponding month numbers
    const monthMap = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    return monthMap[monthName];
  };

  const options = {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  };

  handlepress = (date) => {
    setSelectDate(date);
    props.onPress(date);
  };

  return (
    <LinearGradient
      colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.06)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container]}
    >
      <View style={styles.planView}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subtitle}>
            {props.subtitle}{" "}
            <Text style={[styles.subtitle, { fontSize: 12 }]}>
              (GST Inclusive)
            </Text>
          </Text>
        </View>
        <Image
          source={props.image}
          style={[styles.image]}
          resizeMode="center"
        />
      </View>
      <View style={styles.line} />
      <View style={{ marginHorizontal: 10 }}>
        <Text style={styles.description}>Select preferred date of joining</Text>
        <View>
          <LinearGradient
            colors={["rgba(94, 94, 94, 0.6)", "rgba(94, 94, 94, 0.6)"]}
            locations={[0, 1]}
            style={{
              marginLeft: 30,
              width: 120,
              zIndex: 1,
            }}
          >
            <Text style={styles.subtext}>Date of Joining</Text>
          </LinearGradient>
          <View style={styles.inputview}>
            <View
              style={{
                flex: 0.9,
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Text style={styles.timetext}>
                {selectDate.toLocaleString("en-GB", options)}
              </Text>
              <DatePicker
                style={{ borderWidth: 0, width: "100%" }}
                date={selectDate}
                mode="date"
                placeholder="select date"
                format="DD-MMM-YYYY"
                // minDate={moment("1920-01-01")}
                minDate={startDate}
                maxDate={endDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: {
                    marginLeft: 0,
                    borderWidth: 0,
                  },
                }}
                showIcon={false}
                hideText={true}
                onDateChange={(date) => handlepress(date)}
              />
            </View>
            <View style={{ flex: 0.1 }}>
              <Image
                source={require("../../images/playing/calendar.png")}
                style={[styles.calanderimage]}
                resizeMode="center"
              />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
    marginHorizontal: 10,
    marginBottom: -5,
  },
  subtext: {
    fontSize: 13,
    fontFamily: "Nunito-SemiBold",
    color: "#E8AC43",
  },
  timetext: {
    fontSize: 14,
    fontFamily: Nunito_Regular,
    color: "#D9D9D9",
    marginRight: -90,
    marginTop: 7,
  },
  inputview: {
    flex: 1,
    marginTop: -9,
    borderColor: "#FCB550",
    borderRadius: 26,
    borderWidth: 1,
    height: 50,
    marginBottom: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  line: {
    height: 1,
    backgroundColor: "#3F3750",
    marginBottom: 10,
    marginTop: 5,
    marginHorizontal: 10,
  },
  planView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  benefits: {
    fontSize: 12,
    color: "#F2AE4D",
    fontFamily: Nunito_SemiBold,
    marginBottom: 10,
  },
  textContainer: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 12,
    color: "#F3F2F5",
    fontFamily: Nunito_SemiBold,
  },
  next: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#F2AE4D",
    fontFamily: Nunito_Bold,
  },
  description: {
    fontSize: 11,
    width: 190,
    color: "#E6E6E6",
    fontFamily: Nunito_SemiBold,
    marginBottom: 10,
  },
  descriptionbenift: {
    fontSize: 12,
    color: "#E6E6E6",
    fontFamily: Nunito_SemiBold,
  },
  image: {
    width: 90,
    height: 100,
  },
  calanderimage: {
    width: 20,
    height: 20,
  },
});

export default PlanDetails;
