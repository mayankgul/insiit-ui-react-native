import { StackActions, useNavigation } from "@react-navigation/native";
import { View, Text, useColorScheme } from "react-native";
import { Button } from "react-native-paper";

export const MiscScreen = () => {
  const navigation = useNavigation();

  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorScheme === "light" ? "#ffffff" : "#202020",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{ color: colorScheme === "light" ? "#000000" : "#ffffffe2" }}
      >
        Misc Screen
      </Text>
      {/* <Button
        mode="outlined"
        onPress={() => {
          navigation.dispatch(StackActions.push("Map"));
        }}
      >
        Campus Map
      </Button> */}
    </View>
  );
};
