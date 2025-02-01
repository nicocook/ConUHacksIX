import { View, Text, ScrollView } from "react-native";
import Hospital from "./hospital";

export default function Hospitals() {
  return (
    <ScrollView
      style={{
        height: "85%",
        width: "100%",
        padding: 20,
        // borderWidth: 2,
      }}
    >
      <Hospital />
    </ScrollView>
  );
}
