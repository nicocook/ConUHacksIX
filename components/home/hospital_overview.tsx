import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { hospitalData } from "./types";

export default function HospitalOverview({
  hospitalData,
}: {
  hospitalData: hospitalData;
}) {

  const occupancyRateNumeric = parseFloat(
    hospitalData.details.stretcher_occupancy_rate.replace("%", "")
  );
  

  // 2. Create a function or inline logic to pick the status
  const getLoadStatus = (rate: number) => {
    if (rate > 120) {
      return "heavy load";
    } else if (rate >= 80 && rate <= 120) {
      return "moderate load";
    } else {
      return "low load";
    }
  };

  const getLoadColor = (rate: number) => {
    if (rate > 120) {
      return "red";     // heavy
    } else if (rate >= 80 && rate <= 120) {
      return "orange";  // moderate
    } else {
      return "green";   // low
    }
  };
  const loadColor = getLoadColor(occupancyRateNumeric);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      {/* Top Header Section (Dark Blue Background) */}
      <View
        className="rounded-xl"
        style={{
          backgroundColor: "#22417F", // A navy-ish blue
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
            onPress={() => console.log("Map Pressed")}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              Map
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#1E90FF",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
            }}
            onPress={() => console.log("Website Pressed")}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              Website
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
        <Text
          style={{
            fontSize: 36,
            fontWeight: "600",
          }}
        >
          Current Situation
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            marginBottom: 20,
            color: loadColor
          }}
        >
          Hospital is experiencing {getLoadStatus(occupancyRateNumeric)}.
        </Text>
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
              Average wait
            </Text>
            <Text style={{ color: "white" }}></Text>
          </View>

          {/* Card 2: Waiting to see a doctor */}
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
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              waiting to see a doctor
            </Text>
            <Text style={{ color: "white" }}></Text>
          </View>

          {/* Card 3: People in Urgent Care */}
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
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              in emergency rooms
            </Text>
            <Text style={{ color: "white" }}></Text>
          </View>

          {/* Card 4: Total in Emergency Room */}
          {/* <View
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
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              waiting for emergeny room
            </Text>
            <Text style={{ color: "white" }}></Text>
          </View> */}
        </View>
      </View>
    </ScrollView>
  );
}
