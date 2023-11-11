import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, ScrollView, View, Pressable } from "react-native";
import { Button, Icon } from "react-native-paper";
import { USER_LOCAL_STORAGE } from "../models/globals";
import { styles as homeStyles } from "../styles/homeStyles";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { HomeTopBar } from "../components/HomeTopBar";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const HomeScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(USER_LOCAL_STORAGE).then((value) => {
      if (value) {
        setName(JSON.parse(value).name.split(" ")[0]);
      }
    });
  }, []);

  return (
    <ScrollView style={homeStyles.container}>
      <HomeTopBar />
      <Text style={homeStyles.title}>
        Hey {name === null ? "Guest" : name}!
      </Text>
      <Text style={homeStyles.subtitle}>How are you doing today?</Text>

      <Pressable
        onPress={() => {
          navigation.dispatch(StackActions.push("MessMenu"));
        }}
      >
        <View style={homeStyles.pressableContainer}>
          <View>
            <Text style={homeStyles.text}>Hungry?</Text>
            <Text style={homeStyles.subText}>Check what's for snacks</Text>
          </View>

          <Icon source="arrow-right" size={25} />
        </View>
      </Pressable>
    </ScrollView>
  );
};
