import Hospitals from "@/components/home/hospitals";
import SearchBar from "@/components/home/searchbar";
import {
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
  View,
} from "react-native";
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
  const [searchValue, setSearchValue] = useState("");
  const handleClose = () => setShowActionsheet(false);

  const updateSearch = (value: React.SetStateAction<string>) => {
    console.log(data);
    // getFriendsForUser(user!.id).then((isFriend) => {
    //   console.log("friends", isFriend);
    // });
    // setSearch(value);

    // if (value) {
    //   const filtered = data.filter((user: User) =>
    //     user.username.toLowerCase().includes(value.toString().toLowerCase())
    //   );
    //   setFilteredData(filtered);
    // } else {
    //   setFilteredData(data);
    // }
  };
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
      <SearchBar handleChange={updateSearch} searchValue={searchValue} />
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
