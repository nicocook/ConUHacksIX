import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { hospitalData } from "./types";
import { Linking } from "react-native";

export default function HospitalOverview({
  hospitalData,
}: {
  hospitalData: hospitalData;
}) {
  const occupancyRateNumeric = parseFloat(
    hospitalData.details.stretcher_occupancy_rate.replace("%", "")
  );
  
  const openMaps = () => {
    const addressForMap = hospitalData.details.address.replace(/\n/g, ", ");
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressForMap)}`;
    Linking.openURL(url).catch((err) =>
      console.error("Error opening maps:", err)
    );
  };
  


  // Determine load status
  const getLoadStatus = (rate: number) => {
    if (rate > 120) {
      return "heavy load";
    } else if (rate >= 80 && rate <= 120) {
      return "moderate load";
    } else {
      return "low load";
    }
  };

  // Determine load color
  const getLoadColor = (rate: number) => {
    if (rate > 120) {
      return "red"; // heavy
    } else if (rate >= 80 && rate <= 120) {
      return "orange"; // moderate
    } else {
      return "green"; // low
    }
  };

  const loadStatus = getLoadStatus(occupancyRateNumeric);
  const loadColor = getLoadColor(occupancyRateNumeric);

  // 1) Create animated values for scale and opacity
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 2) Create a pulsing animation that changes both scale and opacity in parallel
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.4, 
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1, 
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, [scaleAnim, opacityAnim]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Top Header Section (Dark Blue Background) */}
      <View
        style={{
          backgroundColor: "#22417F",
          paddingVertical: 40,
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          {hospitalData.name}
        </Text>

        {/* Address */}
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "400",
            textAlign: "center",
            marginTop: 5,
          }}
        >
          {hospitalData.details.address}
        </Text>

        {/* Buttons for Map & Website */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            gap: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#1E90FF",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
            }}
            onPress={openMaps}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              Map
            </Text>
          </TouchableOpacity>


        </View>
      </View>

      {/* White Container */}
      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 20,
          paddingVertical: 30,
          borderTopStartRadius: 25,
          borderStartStartRadius: 25,
        }}
      >
        <Text style={{ fontSize: 36, fontWeight: "600" }}>
          Current Situation
        </Text>

        {/* Status with pulsing circle */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            marginTop: 10,
          }}
        >
          <Animated.View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: loadColor,
              marginRight: 8,
              // 3) Apply the scale and opacity animations
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            }}
          />
          <Text style={{ fontSize: 14, fontWeight: "bold", color: loadColor }}>
            Hospital is experiencing {loadStatus}.
          </Text>
        </View>

        {/* Cards Container (2 x 2) */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {/* Card 1: Hospital Capacity */}
          <View
            style={{
              width: "47%",
              backgroundColor: "#1E3A8A",
              borderRadius: 10,
              padding: 15,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 26,
                fontWeight: "700",
                height: 38,
                textAlign: "center",
              }}
            >
              {hospitalData.details.stretcher_occupancy_rate}
            </Text>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 20,
                marginBottom: 1,
              }}
            >
              Stretcher capacity
            </Text>
          </View>

          {/* Card 2: Average Wait Time */}
          <View
            style={{
              width: "47%",
              backgroundColor: "#1E3A8A",
              borderRadius: 10,
              padding: 15,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 26,
                fontWeight: "700",
                height: 38,
                textAlign: "center",
              }}
            >
              {+hospitalData.details.estimated_waiting_time.split(":")[0] +
                "h" +
                hospitalData.details.estimated_waiting_time.split(":")[1] +
                "min"}
            </Text>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              Average wait time
            </Text>
          </View>

          {/* Card 3: People Waiting to see a Doctor */}
          <View
            style={{
              width: "47%",
              backgroundColor: "#1E3A8A",
              borderRadius: 10,
              padding: 15,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 26,
                fontWeight: "700",
                marginBottom: 5,
                height: 38,
                textAlign: "center",
              }}
            >
              {hospitalData.details.people_waiting_to_see_doctor + " people"}
            </Text>
            <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
              waiting to see a doctor
            </Text>
          </View>

          {/* Card 4: Total People in Emergency Rooms */}
          <View
            style={{
              width: "47%",
              backgroundColor: "#1E3A8A",
              borderRadius: 10,
              padding: 15,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 26,
                fontWeight: "700",
                marginBottom: 5,
                height: 38,
                textAlign: "center",
              }}
            >
              {hospitalData.details.total_people_in_emergency_room + " people"}
            </Text>
            <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
              in emergency rooms
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}