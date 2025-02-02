import { Bed, Clock, CornerUpRight } from "lucide-react-native";
import { View, Text, Image, Pressable } from "react-native";
import * as Progress from "react-native-progress";
import CircularProgress from "./circular_progress";

export default function Hospital({
  data,
  onPress,
}: {
  data: hospitalData;
  onPress: () => void;
}) {
  if (data === null) {
    return <View></View>;
  }

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
        <View
          style={{
            flexDirection: "row",
            //width: "100%",
            alignItems: "center",
            gap: 10,
          }}
        >
          <CircularProgress
            hours={+data.details.estimated_waiting_time.split(":")[0]}
            minutes={+data.details.estimated_waiting_time.split(":")[1]}
            size={80}
            strokeWidth={10}
            textStyle={{ fontSize: 24, color: "black" }}
          />
          {/* name, address and logo */}
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
        {/* time to get there field */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <CornerUpRight color={"black"} />
            <Text style={{ fontWeight: 600, fontSize: 16 }}>
              {data.details.estimated_waiting_time}
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
            <Text style={{ fontWeight: 600, fontSize: 16 }}>
              {+data.details.estimated_waiting_time.split(":")[0] + " hours"}
            </Text>
          </View>
        </View>
        {/* Capacity field */}
        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor:
              +data.details.stretcher_occupancy_rate.split("%")[0] >= 100
                ? "#fee2e2"
                : "",
            borderRadius: 20,
            paddingHorizontal: 6,
          }}
        >
          <Bed color={"black"} />
          <Text style={{ fontWeight: 600, fontSize: 16 }}>
            Stretcher capacity: {data.details.stretcher_occupancy_rate}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
