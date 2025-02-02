import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

const CircularProgress = ({
  size = 100,
  strokeWidth = 7,
  hours = 4,
  minutes = 30,
  backgroundColor = "#eee",
  textStyle = {},
}) => {
  let hoursNew = hours + minutes / 60;
  hoursNew = hoursNew >= 10 ? 10 : hoursNew;
  const progressFiltered = (hoursNew / 10) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressFiltered / 100);

  let color = "#bbf7d0";
  if (hoursNew > 4 && hoursNew < 6) {
    color = "#fde68a";
  } else if (hoursNew >= 6) {
    color = "#fca5a5";
  }

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke={backgroundColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Progress Circle */}
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            stroke={color}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>

      {/* Percentage Text */}
      <View style={[StyleSheet.absoluteFill, styles.textContainer]}>
        {/* <Text style={[styles.text, textStyle]}>{Math.round(progress)}%</Text> */}
        <Text style={[styles.text, textStyle]}>{hours}h</Text>
        <Text style={{ fontSize: 14, color: "black", marginTop: -8 }}>
          {minutes + " "}min
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
});

export default CircularProgress;
