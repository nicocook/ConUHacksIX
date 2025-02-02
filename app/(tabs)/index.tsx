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
import HospitalDrawer from "@/components/home/hospital_drawer";

export default function Index() {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [hospitalData, setHospitalData] = useState({
    name: "",
    details: {
      address: "",
      estimated_waiting_time: "",
      people_waiting_to_see_doctor: "",
      total_people_in_emergency_room: "",
      stretcher_occupancy_rate: "",
    },
  });
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
      <Hospitals
        data={data}
        onPress={() => setShowActionsheet(true)}
        setHospitalData={setHospitalData}
      />
      <HospitalDrawer
        showActionsheet={showActionsheet}
        handleClose={handleClose}
        hospitalData={hospitalData}
      />
    </View>
  );
}
