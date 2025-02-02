import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light"><GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView></GluestackUIProvider>
  );
}
