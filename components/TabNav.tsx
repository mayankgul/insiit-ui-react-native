import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { HomeStack } from "../stacks/homeStack";
import { MiscStack } from "../stacks/miscStack";
import { OutletStack } from "../stacks/outletStack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, useColorScheme } from "react-native";
import { BusScreen } from "../screens/bus/busScreen";
import { BusStack } from "../stacks/busStack";

const Tab = createMaterialBottomTabNavigator();

export const TabNav = () => {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      barStyle={
        colorScheme === "light"
          ? { backgroundColor: "#f7f7f7" }
          : { backgroundColor: "#2f2f39" }
      }
      shifting
      activeColor={colorScheme === "light" ? "#000000" : "#ffffffe2"}
      inactiveColor={colorScheme === "light" ? "#000000" : "#ffffffe2"}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "",
          tabBarIcon: ({ focused, color }) => {
            if (focused) {
              return (
                <Image
                  source={
                    colorScheme === "light"
                      ? require("../assets/icons-light/home-icon.png")
                      : require("../assets/icons-dark/home-icon.png")
                  }
                  style={{ width: 22, height: 22 }}
                />
              );
            } else {
              return (
                <Image
                  source={
                    colorScheme === "light"
                      ? require("../assets/icons-light/home-outline-icon.png")
                      : require("../assets/icons-dark/home-outline-icon.png")
                  }
                  style={{ width: 23, height: 23 }}
                />
              );
            }
          },
        }}
      />

      <Tab.Screen
        name="BusTab"
        component={BusStack}
        options={{
          tabBarLabel: "Bus",
          tabBarIcon: ({ focused, color }) => {
            if (!focused) {
              return (
                <Image
                  source={
                    colorScheme === "light"
                      ? require("../assets/icons-light/bus-tab-icon.png")
                      : require("../assets/icons-dark/bus-tab-icon.png")
                  }
                  style={{ width: 25, height: 25 }}
                />
              );
            } else {
              return (
                <Image
                  source={
                    colorScheme === "light"
                      ? require("../assets/icons-light/bus-filled-tab-icon.png")
                      : require("../assets/icons-dark/bus-filled-tab-icon.png")
                  }
                  style={{ width: 26, height: 26 }}
                />
              );
            }
          },
        }}
      />

      {/* <Tab.Screen
        name="OutletsTab"
        component={OutletStack}
        options={{
          tabBarLabel: "Outlets",
          tabBarIcon: ({ focused, color }) => {
            if (focused) {
              return (
                <Image
                  source={
                    colorScheme === "light"
                      ? require("../assets/icons-light/outlet-tab-icon.png")
                      : require("../assets/icons-dark/outlet-tab-icon.png")
                  }
                  style={{ width: 24, height: 24 }}
                />
              );
            } else {
              return (
                <Image
                  source={
                    colorScheme === "light"
                      ? require("../assets/icons-light/outlet-tab-outline-icon.png")
                      : require("../assets/icons-dark/outlet-tab-outline-icon.png")
                  }
                  style={{ width: 26, height: 26 }}
                />
              );
            }
          },
        }}
      /> */}

      <Tab.Screen
        name="MiscTab"
        component={MiscStack}
        options={{
          tabBarLabel: "More",
          tabBarIcon: ({ focused, color }) => {
            if (focused) {
              return (
                <Image
                  source={
                    colorScheme === "light"
                      ? require("../assets/icons-light/dots-icon.png")
                      : require("../assets/icons-dark/dots-icon.png")
                  }
                  style={{ width: 22, height: 22 }}
                />
              );
            } else {
              return (
                <Image
                  source={
                    colorScheme === "light"
                      ? require("../assets/icons-light/dots-outline-icon.png")
                      : require("../assets/icons-dark/dots-outline-icon.png")
                  }
                  style={{ width: 24, height: 24 }}
                />
              );
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};
