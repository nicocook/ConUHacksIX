import Hospitals from "@/components/home/hospitals";
import SearchBar from "@/components/home/searchbar";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { data } from "@/hospital_data";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import HospitalOverview from "@/components/home/hospital_overview";
import { useState } from "react";

export default function Index() {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(false);
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
      <Hospitals data={data} onPress={() => setShowActionsheet(true)} />
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <View className="h-5/6">
            <HospitalOverview />
          </View>
        </ActionsheetContent>
      </Actionsheet>
    </View>
  );
}
