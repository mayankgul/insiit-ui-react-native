import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, ScrollView, View, Pressable } from "react-native";
import { Button, Card, Icon } from "react-native-paper";
import { USER_LOCAL_STORAGE } from "../models/globals";
import { styles as homeStyles } from "../styles/homeStyles";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
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
      <Text style={homeStyles.title}>
        Hey {name === null ? "Guest" : name}!
      </Text>
      <Text style={homeStyles.subtitle}>How are you doing today?</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          // marginRight: 10,
          marginBottom: 20,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.dispatch(StackActions.push("Bus"));
          }}
        >
          <Card
            mode="outlined"
            style={{
              width: 140,
              height: 100,
              backgroundColor: "#e4d7ff",
              borderWidth: 0,
              borderRadius: 15,
              borderColor: "#e4d7ff",
              marginRight: "6%",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
            }}
          >
            <Card.Content
              style={{ alignItems: "center", flexDirection: "row" }}
            >
              <Icon source="bus" size={25} color="#7b61ff" />
              <Text style={{ fontSize: 13, marginLeft: 10 }}>Bus Schedule</Text>
            </Card.Content>
          </Card>
        </Pressable>

        <Card
          mode="outlined"
          style={{
            width: 130,
            height: 100,
            backgroundColor: "#d7f1ff",
            borderWidth: 0,
            borderRadius: 15,
            borderColor: "#d7f1ff",
            // marginRight: 10,
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
          }}
        >
          <Card.Content style={{ alignItems: "center", flexDirection: "row" }}>
            <Icon source="bug" size={25} color="#398ab7" />
            <Text style={{ fontSize: 13, marginLeft: 10 }}>Complaints</Text>
          </Card.Content>
        </Card>
      </View>

      <Pressable
        onPress={() => {
          navigation.dispatch(StackActions.push("MessMenu"));
        }}
      >
        <View style={homeStyles.pressableContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: 10 }}>
              <Icon source="silverware-fork-knife" size={20} />
            </View>
            <View>
              <Text style={homeStyles.text}>What's in the mess?</Text>
            </View>
          </View>

          <Icon source="chevron-right" size={30} />
        </View>
      </Pressable>
    </ScrollView>
  );
};
