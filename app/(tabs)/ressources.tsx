import HospitalOverview from "@/components/home/hospital_overview";
import { Megaphone, Plus } from "lucide-react-native";
import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// Suicidal thoughts or feelings: Call 1-866-APPELLE (1-866-277-3553)
// urgent emergencies: 911
// Sexual assault crisis line: 514-933-9007.
// emergency shelter: 211
// Canadian red cross disaster services: 1-877-362-2433
// Quebec poison control centre: 1 800 463-5060

export default function App() {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(false);
  const itemStyle = "text-xl font-semibold text-center";
  return (
    <View className="flex-col h-screen pt-16 bg-[#22417F]">
      <View className="flex-row items-center p-5 gap-5">
        <Plus color={"#E00"} size={70} strokeWidth={4} />
        <Text className="text-white font-bold text-5xl">
          Emergency Ressources
        </Text>
      </View>
      <View className="h-screen-safe bg-white rounded-t-[25px] p-5 flex-col gap-6">
        <Text className="font-bold text-3xl text-center">
          For any immediate emergency, contact 911!
        </Text>
        <View className="w-full border-t border-zinc-400"></View>
        <Text className={itemStyle}>
          {"Suicidal thoughts or feelings:\n1-866-APPELLE (1-866-277-3553)"}
        </Text>
        <Text className={itemStyle}>
          {"Sexual assault crisis line:\n 514-933-9007"}
        </Text>
        <Text className={itemStyle}>
          {"Concordia Campus Safety and Prevention Services:\n514-848-3717"}
        </Text>
        <Text className={itemStyle}>{"Emergency shelter: 211"}</Text>
        <Text className={itemStyle}>{"Professional Health Advice: 811"}</Text>
        <Text className={itemStyle}>
          {"Canadian red cross disaster services:\n1-877-362-2433"}
        </Text>
        <Text className={itemStyle}>
          {"Quebec poison control centre:\n1-800-463-5060"}
        </Text>
      </View>
    </View>
  );
}
