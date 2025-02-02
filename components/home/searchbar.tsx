import { Search, SlidersHorizontal } from "lucide-react-native";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Button,
  Pressable,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function SearchBar() {
  return (
    <View
      style={{
        height: 40,
        width: "80%",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 20,
          backgroundColor: "white",
        }}
      >
        <Search color={"black"} />
        <TextInput
          style={{
            height: 40,
            padding: 10,
            width: "85%",
          }}
          //value={}
          placeholder="Search"
          keyboardType="numeric"
        />
      </View>
      <Pressable
        style={{
          backgroundColor: "white",
          height: 40,
          width: 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
        }}
      >
        <SlidersHorizontal color={"black"} />
      </Pressable>
    </View>
  );
}
