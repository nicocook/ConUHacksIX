import { Bed, Clock, CornerUpRight } from "lucide-react-native";
import { View, Text, Pressable } from "react-native";
import CircularProgress from "./circular_progress";
import { hospitalData } from "./types";

export default function Hospital({
  data,
  onPress,
}: {
  data: hospitalData;
  onPress: () => void;
}) {
  if (!data) {
    return <View />;
  }

  const [waitHours, waitMinutes] = data.details.estimated_waiting_time.split(":");

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: "column",
          borderWidth: 1,
          borderColor: "#d4d4d8",
          paddingVertical: 20,
          paddingHorizontal: 15,
          borderRadius: 20,
          gap: 10,
          backgroundColor: "white",
        }}
      >
        {/* Top section with progress indicator, hospital name and address */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <CircularProgress
            hours={+waitHours}
            minutes={+waitMinutes}
            size={80}
            strokeWidth={10}
            textStyle={{ fontSize: 24, color: "black" }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "800",
                width: 240,
              }}
            >
              {data.name}
            </Text>
            <Text style={{ width: 240 }}>
              {data.details.address.split(",").slice(0, 2).join(",")}
            </Text>
          </View>
        </View>

        {/* Row for travel time/distance and estimated waiting time */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {/* Travel time/distance field */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <CornerUpRight color={"black"} />
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              {data.travelTime ? data.travelTime : "N/A"}
              {data.distance && data.distance !== Infinity
                ? ` (${data.distance.toFixed(1)} km)`
                : ""}
            </Text>
          </View>

          {/* Estimated wait time field */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Clock color={"black"} />
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              {+waitHours + " hours"}
            </Text>
          </View>
        </View>

        {/* Stretcher capacity field */}
        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor:
              +data.details.stretcher_occupancy_rate.split("%")[0] >= 100
                ? "#fee2e2"
                : undefined,
            borderRadius: 20,
            paddingHorizontal: 6,
          }}
        >
          <Bed color={"black"} />
          <Text style={{ fontWeight: "600", fontSize: 16 }}>
            Stretcher capacity: {data.details.stretcher_occupancy_rate}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
