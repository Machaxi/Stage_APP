import React, { useState, useEffect } from "react";
import { Alert, FlatList, Text } from "react-native";
import { NextSessionCard } from "./NextSessionCard";
import moment from "moment";

export const NextSessionList = ({
  NextSessionData,
  onCancelPress,
  expandList,
  cancelDisplayTime,
  userId,
}) => {
  const [refresh, setRefresh] = useState(false);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    console.log("ollad");
    console.log(NextSessionData);
    if (NextSessionData.length == 1) {
      setFilterData(NextSessionData);
    } else {
      const sortedData = NextSessionData.sort((a, b) => {
        const dateA = new Date(
          moment(a.date).format("YYYY-MM-DD") + "T" + a.startTime
        );
        const dateB = new Date(
          moment(a.date).format("YYYY-MM-DD") + "T" + b.startTime
        );
        return dateA - dateB;
      });
      const filteredData = sortedData.filter(
        (item) => item.isCancelled === false
      );
      if (filteredData.length > 0) {
        setFilterData([filteredData[0]]);
      } else {
        setFilterData([sortedData[0]]);
      }
    }
  }, [NextSessionData]);

  const renderNextScreenCard = ({ item }) => {
    return (
      <NextSessionCard
        userId={userId}
        expandList={() => {
          setRefresh(!refresh);
          expandList(item);
        }}
        onCancelPress={(val) => {
          onCancelPress(val);
          cancelDisplayTime(item?.displayTime, item?.sport.name);
        }}
        item={item}
      />
    );
  };

  return (
    <FlatList
      extraData={refresh}
      data={filterData}
      renderItem={renderNextScreenCard}
    />
  );
};
