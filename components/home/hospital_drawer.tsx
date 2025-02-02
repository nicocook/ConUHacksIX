import { View, Text, Pressable } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "../ui/actionsheet";
import HospitalOverview from "./hospital_overview";
import { hospitalData } from "./types";

export default function HospitalDrawer({
  showActionsheet,
  handleClose,
  hospitalData,
}: {
  showActionsheet: boolean;
  handleClose: () => void;
  hospitalData: hospitalData;
}) {
  return (
    <Actionsheet isOpen={showActionsheet} onClose={handleClose} className="">
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <View className="-h-screen-safe-offset-20">
          <HospitalOverview hospitalData={hospitalData} />
        </View>
      </ActionsheetContent>
    </Actionsheet>
  );
}

// isOpen={isOpen} onClose={onClose} snapPoints={["50%", "90%"]}
