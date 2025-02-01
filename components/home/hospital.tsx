import { View, Text, Image } from "react-native";

export default function Hospital() {
  return (
    <View
      style={{
        flexDirection: "column",
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Image
          source={{
            uri: "",
          }}
        />
        {/* name, address and logo */}
        <View style={{ flexDirection: "column" }}>
          <Text>Name</Text>
          <Text>Address</Text>
        </View>
      </View>
    </View>
  );
}
