import { View, Text, ScrollView } from "react-native";
import Hospital from "./hospital";
import { useEffect, useState } from "react";

export default function Hospitals({ data }: { data: hospitalData[] }) {
  const dataProp = data === null ? null : data[0];
  return (
    <ScrollView
      style={{
        height: "85%",
        width: "100%",
        padding: 20,
        backgroundColor: "white",
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          gap: 10,
        }}
      >
        {data.map((e, k) => (
          <Hospital key={k} data={e} />
        ))}
      </View>
    </ScrollView>
  );
}
