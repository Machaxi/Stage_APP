import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  Nunito_Bold,
  Nunito_Regular,
  Nunito_SemiBold,
} from "../../containers/util/fonts";
import DatePicker from "react-native-datepicker";

const PlanDetails = (props) => {
  const [selectDate, setSelectDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  const convertToDate = (dateString) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    var [day, month] = dateString.split(" ");
    if (day < 10) {
      day = "0" + day;
    }
    const date = new Date(`${currentYear}-${getMonthNumber(month)}-${day}`);
    return date;
  };

  const convertToNextDate = (dateString) => {
    const currentDate = new Date();
    const currentYear = parseInt(currentDate.getFullYear()) + 1;
    var [day, month] = dateString.split(" ");
    if (day < 10) {
      day = "0" + day;
    }
    const date = new Date(`${currentYear}-${getMonthNumber(month)}-${day}`);
    return date;
  };

  useEffect(() => {
    console.log("ollla");
    console.log(props.startDate);
    const startdate = convertToDate(props.startDate);
    var endDate = convertToDate(props.endDate);
    if (endDate < startdate) {
      endDate = convertToNextDate(props.endDate);
    }
    console.log(props.startDate);
    setSelectDate(startdate);
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

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const options = {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  };

  const formatDateToCustomDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const monthIndex = months.findIndex((m) => m === month) + 1;
    const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : monthIndex;
    const formattedDate = `${year}-${formattedMonth}-${day}`;
    return formattedDate;
  };

  const formateDate = (date) => {
    var day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var month = date.getMonth();
    const year = date.getFullYear();
    datastring = day + " " + months[month] + " " + year;
    return datastring;
  };

  handlepress = (date) => {
    console.log(formatDateToCustomDate(date));
    var presentDate = new Date(formatDateToCustomDate(date));
    setSelectDate(presentDate);
    props.onPress(formatDateToCustomDate(date));
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
        {props.url ? (
          <Image
            source={{ uri: props.image }}
            style={[styles.image, { marginBottom: 10 }]}
          />
        ) : (
          <Image source={props.image} style={[styles.image]} />
        )}
      </View>
      <View style={styles.line} />
      <View style={{ marginHorizontal: 10 }}>
        <Text style={styles.description}>Select preferred date of joining</Text>
        <View>
          <Text style={styles.subtext}>Date of Joining</Text>
          <View style={styles.inputview}>
            <View
              style={{
                flex: 0.9,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.timetext}>{formateDate(selectDate)}</Text>
              <DatePicker
                style={{ borderWidth: 0, width: "140%", zIndex: 2 }}
                date={selectDate}
                mode="date"
                format="DD-MMM-YYYY"
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
              {/* </View>
            <View style={{ flex: 0.1 }}> */}
              <Image
                source={require("../../images/playing/calendar.png")}
                style={[styles.calanderimage]}
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
    marginRight: -160,
    marginLeft: 30,
  },
  inputview: {
    flex: 1,
    marginTop: 7,
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
    height: 70,
    marginRight: 10,
    marginTop: 10,
  },
  calanderimage: {
    width: 20,
    height: 20,
    marginLeft: -30,
  },
});

export default PlanDetails;
