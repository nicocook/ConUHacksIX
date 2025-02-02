import Hospitals from "@/components/home/hospitals";
import SearchBar from "@/components/home/searchbar";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { data } from "@/WebScraper/Hospitals_Data";

export default function Index() {
  return (
    <View
      style={{
        flexDirection: "column",
        paddingTop: 70,
        alignItems: "center",
        backgroundColor: "#22417F",
        gap: 20,
      }}
    >
      <SearchBar />
      <Hospitals data={data} />
    </View>
  );
}
