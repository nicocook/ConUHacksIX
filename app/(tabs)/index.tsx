import Hospitals from "@/components/home/hospitals";
import SearchBar from "@/components/home/searchbar";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  return (
    <View
      style={{
        //flex: 1,
        flexDirection: "column",
        paddingTop: 70,
        alignItems: "center",
        //gap: 20,
      }}
    >
      <SearchBar />
      <Hospitals />
    </View>
  );
}
