import { ScrollView, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useState, useEffect } from "react";
import { API_BASE_URL, MESS_LOCAL_STORAGE, days } from "../models/globals";
import { SplashScreen } from "./SplashScreen";
import { Card, List, Avatar, Icon, Button } from "react-native-paper";
import { MessMenuItemCard } from "../components/MessMenuItemCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Tab = createMaterialTopTabNavigator();

export const MessMenuScreen = () => {
  const [day, setDay] = useState("Monday");
  const [loaded, setLoaded] = useState(false);
  const [mess, setMess] = useState(null);
  const [messes, setMesses] = useState([]);

  useEffect(() => {
    const date = new Date();
    const today = date.getDay();
    setDay(days[today]);

    AsyncStorage.getItem(MESS_LOCAL_STORAGE).then((value) => {
      if (value) {
        setMess(parseInt(value));
        setLoaded(true);
      } else {
        axios({ method: "GET", url: `${API_BASE_URL}/mess` })
          .then((res) => {
            res.data.messes.map((mess) =>
              setMesses((messes) => [
                ...messes,
                { id: mess.id, name: mess.name },
              ])
            );
            setLoaded(true);
          })
          .catch((err) => {
            console.log(err);
            setMesses(null);
            setLoaded(true);
          });
      }
    });
  }, []);

  if (!loaded) {
    return <SplashScreen />;
  }

  if (mess === null) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 20 }}>
          Please select a mess
        </Text>
        {messes.map((mess) => {
          return (
            <Button
              key={mess.id}
              textColor="#000000"
              mode="outlined"
              style={{ width: "60%", marginBottom: 10 }}
              onPress={() => {
                setLoaded(false);
                AsyncStorage.setItem(
                  MESS_LOCAL_STORAGE,
                  JSON.stringify(mess.id)
                ).then(() => {
                  setMess(mess.id);
                  setMesses(null);
                  setLoaded(true);
                });
              }}
            >
              <Text style={{ fontSize: 17 }}>{mess.name}</Text>
            </Button>
          );
        })}
      </View>
    );
  }

  return (
    <Tab.Navigator backBehavior="none" initialRouteName={`${day}Menu`}>
      <Tab.Screen name="MondayMenu" options={{ title: "M" }}>
        {() => <DayMessMenu day="monday" />}
      </Tab.Screen>
      <Tab.Screen name="TuesdayMenu" options={{ title: "T" }}>
        {() => <DayMessMenu day="tuesday" />}
      </Tab.Screen>
      <Tab.Screen name="WednesdayMenu" options={{ title: "W" }}>
        {() => <DayMessMenu day="wednesday" />}
      </Tab.Screen>
      <Tab.Screen name="ThursdayMenu" options={{ title: "Th" }}>
        {() => <DayMessMenu day="thursday" />}
      </Tab.Screen>
      <Tab.Screen name="FridayMenu" options={{ title: "F" }}>
        {() => <DayMessMenu day="friday" />}
      </Tab.Screen>
      <Tab.Screen name="SaturdayMenu" options={{ title: "S" }}>
        {() => <DayMessMenu day="saturday" />}
      </Tab.Screen>
      <Tab.Screen name="SundayMenu" options={{ title: "S" }}>
        {() => <DayMessMenu day="sunday" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const DayMessMenu = ({
  day,
}: {
  day:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
}) => {
  const [menu, setMenu] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <SplashScreen />;
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <List.AccordionGroup>
        <List.Accordion title="Breakfast" id={1}>
          <List.Item
            title={() => {
              return (
                <View>
                  <MessMenuItemCard
                    name="Aloo Onion Paratha"
                    image="https://avatars.githubusercontent.com/u/146699003?s=20006&v=4"
                  />
                  <MessMenuItemCard
                    name="Aloo Onion Paratha"
                    image="https://avatars.githubusercontent.com/u/146699003?s=20006&v=4"
                  />
                  <MessMenuItemCard
                    name="Aloo Onion Paratha"
                    image="https://avatars.githubusercontent.com/u/146699003?s=20006&v=4"
                  />
                  <MessMenuItemCard
                    name="Aloo Onion Paratha"
                    image="https://avatars.githubusercontent.com/u/146699003?s=20006&v=4"
                  />
                  <MessMenuItemCard
                    name="Aloo Onion Paratha"
                    image="https://avatars.githubusercontent.com/u/146699003?s=20006&v=4"
                  />
                </View>
              );
            }}
          />
        </List.Accordion>
        <List.Accordion title="Lunch" id={2}>
          <List.Item title=""></List.Item>
        </List.Accordion>
        <List.Accordion title="Snacks" id={3}>
          <List.Item title=""></List.Item>
        </List.Accordion>
        <List.Accordion title="Dinner" id={4}>
          <List.Item title=""></List.Item>
        </List.Accordion>
      </List.AccordionGroup>
    </ScrollView>
  );
};
