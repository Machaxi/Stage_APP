import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default TabBarHighlightLabel = ({
  focused,
  label,
  indicatorHeight,
  activeLabelColor,
  activeIndicatorColor,
  inactiveLabelColor,
  inactiveIndicatorColor,
  activeIcon
}) => {
  const config = {
    activeIndicatorColor: '#667DDB',
    inactiveIndicatorColor: 'transparent',
    activeLabelColor: '#333333',
    inactiveLabelColor: "#333333",//inactiveLabelColor || '#CCCCCC',
    activeIcon: '../images/Home.png'
  };

  const indicatorColor = focused ? config.activeIndicatorColor : config.inactiveIndicatorColor;
  const labelColor = focused ? config.activeLabelColor : config.inactiveLabelColor;
  //const activeIcon1 = require(config.activeIcon)

  const styles = StyleSheet.create({
    labelContainer: {
      flex: 0,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    labelText: {
      flex: 0,
      width: '100%',
      textAlign: 'center',
      justifyContent: 'center',
      fontSize: 12,
      color: labelColor
    },
    labelIndicator: {
      flex: 0,
      width: 55,
      marginBottom: 4,
      height: 4,
      justifyContent: 'flex-end',
      backgroundColor: indicatorColor
    },
  });
  const maybeRenderLabel = label && <Text style={styles.labelText}>{label}</Text>;


  return (
    <View style={styles.labelContainer}>
      <Image
      resizeMode="contain"
        style={{
          width: 22,
          height: 22,
          marginBottom: 6
        }}
        source={activeIcon}
        size={24}
      />
      {maybeRenderLabel}
      <View style={styles.labelIndicator} />

    </View>
  );
}