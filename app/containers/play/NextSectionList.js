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
    if (NextSessionData.length == 1) {
      setFilterData(NextSessionData);
    } else if (NextSessionData.length > 1) {
      const sortedData = NextSessionData.sort((a, b) => {
        const dateA = moment(a.date).format("YYYY-MM-DD") + "T" + a.startTime;
        const dateB = moment(b.date).format("YYYY-MM-DD") + "T" + b.startTime;
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
