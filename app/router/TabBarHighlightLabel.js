import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default TabBarHighlightLabel = ({
    focused,
    label,
    indicatorHeight,
    activeLabelColor,
    activeIndicatorColor,
    inactiveLabelColor,
    inactiveIndicatorColor
}) => {
  const config = {
    activeIndicatorColor: activeIndicatorColor || '#333333',
    inactiveIndicatorColor: inactiveIndicatorColor || 'transparent',
    activeLabelColor: activeLabelColor || '#333333',
    inactiveLabelColor: inactiveLabelColor || '#CCCCCC',
  };

  const indicatorColor = focused ? config.activeIndicatorColor : config.inactiveIndicatorColor;
  const labelColor = focused ? config.activeLabelColor : config.inactiveLabelColor;

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
      width: '100%',
      height: (indicatorHeight ? indicatorHeight : 2),
      justifyContent: 'flex-end',
      backgroundColor: indicatorColor
    },
  });
  const maybeRenderLabel = label && <Text style={styles.labelText}>{label}</Text>; 

  return (
    <View style={styles.labelContainer}>
      {maybeRenderLabel}
      <View style={styles.labelIndicator} />
    </View>
  );
}