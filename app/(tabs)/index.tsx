import Hospitals from "@/components/home/hospitals";
import SearchBar from "@/components/home/searchbar";
import { View, Text, ScrollView, Pressable } from "react-native";
import { data as rawData } from "@/hospital_data";
import React, { useEffect, useState } from "react";
import HospitalDrawer from "@/components/home/hospital_drawer";
import { hospitalData } from "@/components/home/types";
import { Bed, Car, MapPin, User, Watch } from "lucide-react-native";

enum FilterEnum {
  travelTime,
  distance,
  waitingTime,
  occupancy,
  totalPPL,
  null,
}

export default function Index() {
  const [filter, setFilter] = useState<FilterEnum>(FilterEnum.null);
  useEffect(() => {
    if (filter === FilterEnum.waitingTime) {
      const rawDataCopy = rawData.map((e) => e);
      rawDataCopy.sort((a, b) => {
        if (a.details.estimated_waiting_time > b.details.estimated_waiting_time)
          return 1;
        if (a.details.estimated_waiting_time < b.details.estimated_waiting_time)
          return -1;
        return 0;
      });
      setData(rawDataCopy);
    }
  }, [filter]);

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
  const [data, setData] = useState<hospitalData[]>(rawData);

  const updateSearch = (value: React.SetStateAction<string>) => {
    setSearchValue(value);
    if (value) {
      const filtered = rawData.filter((hospital) =>
        hospital.name.toLowerCase().includes(value.toString().toLowerCase())
      );
      setData(filtered);
    } else {
      setData(data);
    }
  };

  const filterTags = [
    FilterEnum.distance,
    FilterEnum.occupancy,
    FilterEnum.totalPPL,
    FilterEnum.travelTime,
    FilterEnum.waitingTime,
  ];

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
      <ScrollView
        contentContainerStyle={{
          gap: 16,
        }}
        horizontal
        className="px-20"
      >
        {filterTags.map((e, k) => (
          <FilterElement
            filterElementEnum={e}
            filter={filter}
            setFilter={setFilter}
            key={k}
          />
        ))}
      </ScrollView>
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

function FilterElement({
  filterElementEnum,
  setFilter,
  filter,
}: {
  filterElementEnum: FilterEnum;
}) {
  let title = "";
  switch (filterElementEnum) {
    case FilterEnum.distance:
      title = "Distance";
      break;
    case FilterEnum.occupancy:
      title = "Occupancy";
      break;
    case FilterEnum.totalPPL:
      title = "Total People";
      break;
    case FilterEnum.travelTime:
      title = "Travel Time";
      break;
    case FilterEnum.waitingTime:
      title = "Waiting Time";
      break;
  }

  function handlePress() {
    if (filterElementEnum === filter) {
      setFilter(FilterEnum.null);
    } else {
      setFilter(filterElementEnum);
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      style={{
        backgroundColor: filter === filterElementEnum ? "#F0B223" : "white",
      }}
      className="w-25 h-9 bg-white flex-row items-center justify-center rounded-md p-2"
    >
      {filterElementEnum === FilterEnum.distance && (
        <MapPin color={filter === filterElementEnum ? "white" : "black"} />
      )}
      {filterElementEnum === FilterEnum.occupancy && (
        <Bed color={filter === filterElementEnum ? "white" : "black"} />
      )}
      {filterElementEnum === FilterEnum.totalPPL && (
        <User color={filter === filterElementEnum ? "white" : "black"} />
      )}
      {filterElementEnum === FilterEnum.travelTime && (
        <Car color={filter === filterElementEnum ? "white" : "black"} />
      )}
      {filterElementEnum === FilterEnum.waitingTime && (
        <Watch color={filter === filterElementEnum ? "white" : "black"} />
      )}
      <Text style={{ color: filter === filterElementEnum ? "white" : "black" }}>
        {title}
      </Text>
    </Pressable>
  );
}
