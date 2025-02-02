import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import * as Location from "expo-location";
import Hospital from "./hospital";
import { hospitalData } from "./types";

const GOOGLE_API_KEY = "AIzaSyBDvAj0mGQsInOZBsOls8pCqjRcvp2lQK4";

const addDistanceUsingGoogle = async (
  data: hospitalData[],
  userLoc: { latitude: number; longitude: number }
) => {
  return Promise.all(
    data.map(async (hospital) => {
      try {
        let destination = hospital.details.address;
        if (!destination) {
          destination = `${hospital.name}, Quebec, Canada`;
        } else {
          destination = destination.split("\n")[0].trim() + ", Canada";
        }
        const origin = `${userLoc.latitude},${userLoc.longitude}`;
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${encodeURIComponent(
          destination
        )}&key=${GOOGLE_API_KEY}`;
        // console.log("Distance Matrix API URL:", url);
        const response = await fetch(url);
        const json = await response.json();
        // console.log("Distance Matrix API response:", json);
        if (
          json.status === "OK" &&
          json.rows &&
          json.rows[0] &&
          json.rows[0].elements &&
          json.rows[0].elements[0] &&
          json.rows[0].elements[0].status === "OK"
        ) {
          const distanceMeters = json.rows[0].elements[0].distance.value;
          const distanceKm = distanceMeters / 1000;
          const durationText = json.rows[0].elements[0].duration.text;
          const durationSeconds = json.rows[0].elements[0].duration.value;
          const travelTimeValue = durationSeconds / 60;
          return {
            ...hospital,
            distance: distanceKm,
            travelTime: durationText,
            travelTimeValue,
          };
        } else {
          return {
            ...hospital,
            distance: Infinity,
            travelTime: null,
            travelTimeValue: Infinity,
          };
        }
      } catch (e) {
        console.error("Error in Distance Matrix API:", e);
        return {
          ...hospital,
          distance: Infinity,
          travelTime: null,
          travelTimeValue: Infinity,
        };
      }
    })
  );
};

export default function Hospitals({
  data,
  onPress,
  setHospitalData,
}: {
  data: hospitalData[];
  onPress: () => void;
  setHospitalData: React.Dispatch<React.SetStateAction<hospitalData>>;
}) {
  const [hospitals, setHospitals] = useState<hospitalData[]>(data);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        setLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const updatedData = await addDistanceUsingGoogle(data, {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setHospitals(updatedData);
      setLoading(false);
    })();
  }, [data]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading hospital distances...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        height: "85%",
        width: "100%",
        padding: 20,
        backgroundColor: "white",
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          gap: 10,
        }}
      >
        {hospitals.map((e, k) => (
          <Hospital
            key={k}
            data={e}
            onPress={() => {
              setHospitalData(e);
              onPress();
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
}
