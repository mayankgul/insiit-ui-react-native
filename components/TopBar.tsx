import { View, Text, Image } from "react-native";
import { styles as barStyles } from "../styles/topBarStyles";
import { Icon, IconButton } from "react-native-paper";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_LOCAL_STORAGE } from "../models/globals";
import { StackActions, useNavigation } from "@react-navigation/native";

export const TopBar = () => {
  const navigation = useNavigation();

  return (
    <View style={barStyles.container}>
      <IconButton
        icon="account-circle-outline"
        onPress={() => {
          navigation.dispatch(StackActions.push("Profile"));
        }}
        iconColor="#000000"
        rippleColor="transparent"
      />
      <IconButton
        icon="bell-outline"
        onPress={() => {
          navigation.dispatch(StackActions.push("Notifications"));
        }}
        iconColor="#000000"
        rippleColor="transparent"
      />
      <IconButton
        icon={({ size, color }) => {
          return (
            <View
              style={{
                backgroundColor: "#cfdaff",
                // padding: 1,
                borderRadius: 5,
              }}
            >
              <Icon source="qrcode" size={30} />
            </View>
          );
        }}
        onPress={() => {
          navigation.dispatch(StackActions.push("MessQR"));
        }}
        iconColor="#000000"
        rippleColor="transparent"
      />
    </View>
  );
};
