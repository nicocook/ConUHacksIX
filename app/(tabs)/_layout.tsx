import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import {
  CalendarClock,
  Hospital,
  PersonStanding,
  Sparkles,
} from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        // tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <Hospital color={color} />,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <CalendarClock color={color} />,
        }}
      />
      <Tabs.Screen
        name="ai_doctor"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <Sparkles color={color} />,
        }}
      />
      {/* <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <PersonStanding color={color} />,
        }}
      /> */}
    </Tabs>
  );
}
