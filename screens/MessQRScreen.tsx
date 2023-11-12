import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";
import { USER_LOCAL_STORAGE } from "../models/globals";
import { useState, useEffect } from "react";

export const MessQRScreen = () => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(USER_LOCAL_STORAGE).then((value) => {
      if (value) {
        setEmail(JSON.parse(value).email);
      }
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Mess QR Screen</Text>
      <Text>{email}</Text>
    </View>
  );
};
