import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { USER_LOCAL_STORAGE } from "../models/globals";

export const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Profile Screen</Text>
      <Button
        mode="contained"
        onPress={async () => {
          await AsyncStorage.removeItem(USER_LOCAL_STORAGE);
          navigation.dispatch(StackActions.replace("Welcome"));
        }}
      >
        Logout
      </Button>
    </View>
  );
};
