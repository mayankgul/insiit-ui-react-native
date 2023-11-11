import { View, Text, Image } from "react-native";
import { styles as barStyles } from "../styles/homeTopBarStyles";
import { IconButton } from "react-native-paper";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_LOCAL_STORAGE } from "../models/globals";
import { StackActions, useNavigation } from "@react-navigation/native";

export const HomeTopBar = () => {
  const navigation = useNavigation();

  return (
    <View style={barStyles.container}>
      <IconButton
        icon="account-circle-outline"
        onPress={() => {
          navigation.dispatch(StackActions.push("Profile"));
        }}
      />
      <IconButton
        icon="bell-outline"
        onPress={() => {
          navigation.dispatch(StackActions.push("Notifications"));
        }}
      />
      <IconButton
        icon="qrcode"
        onPress={() => {
          navigation.dispatch(StackActions.push("MessQR"));
        }}
      />
    </View>
  );
};
