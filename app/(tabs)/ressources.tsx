import { Plus } from "lucide-react-native";
import React from "react";
import { View, Text } from "react-native";

export default function App() {
  return (
    <View className="flex-col h-screen pt-16 bg-[#22417F]">
      {/* Header */}
      <View className="flex-row items-center p-5 gap-5">
        <Plus color={"#E00"} size={70} strokeWidth={4} />
        <Text className="text-white font-bold text-5xl">
          Emergency Resources
        </Text>
      </View>

      {/* Main container */}
      <View className="h-screen-safe bg-white rounded-t-[25px] p-5 flex-col gap-3">
        <Text className="font-bold text-3xl text-center">
          If you are in urgent need of medical attention, contact 911.
        </Text>

        {/* Divider */}
        <View className="w-full border-t border-zinc-400" />

        {/* Item 1: Suicidal thoughts */}
        <View className="flex-col items-center">
          <Text className="text-2xl font-bold text-center">
            Suicidal thoughts or feelings:
          </Text>
          <Text className="text-xl text-center">
            1-866-APPELLE (1-866-277-3553)
          </Text>
        </View>

        {/* Item 2: Sexual assault */}
        <View className="flex-col items-center">
          <Text className="text-2xl font-bold text-center">
            Sexual assault crisis line:
          </Text>
          <Text className="text-xl text-center">514-933-9007</Text>
        </View>

        {/* Item 3: Concordia Campus Safety */}
        <View className="flex-col items-center">
          <Text className="text-2xl font-bold text-center">
            Concordia Campus Safety and Prevention Services:
          </Text>
          <Text className="text-xl text-center">514-848-3717</Text>
        </View>

        {/* Item 4: Emergency shelter */}
        <View className="flex-col items-center">
          <Text className="text-2xl font-bold text-center">
            Emergency shelter:
          </Text>
          <Text className="text-xl text-center">211</Text>
        </View>

        {/* Item 5: Professional Health Advice */}
        <View className="flex-col items-center">
          <Text className="text-2xl font-bold text-center">
            Professional Health Advice:
          </Text>
          <Text className="text-xl text-center">811</Text>
        </View>

        {/* Item 6: Red Cross */}
        <View className="flex-col items-center">
          <Text className="text-2xl font-bold text-center">
            Canadian red cross disaster services:
          </Text>
          <Text className="text-xl text-center">1-877-362-2433</Text>
        </View>

        {/* Item 7: Poison Control */}
        <View className="flex-col items-center">
          <Text className="text-2xl font-bold text-center">
            Quebec poison control centre:
          </Text>
          <Text className="text-xl text-center">1-800-463-5060</Text>

        </View>
      </View>
    </View>
  );
}
