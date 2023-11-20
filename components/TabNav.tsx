import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { HomeStack } from "../stacks/HomeStack";
import { MessStack } from "../stacks/MessStack";
import { MiscStack } from "../stacks/MiscStack";
import { OutletStack } from "../stacks/OutletStack";

const Tab = createMaterialBottomTabNavigator();

export const TabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      barStyle={{ backgroundColor: "#fffbfe" }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: "home",
        }}
      />
      <Tab.Screen
        name="MessTab"
        component={MessStack}
        options={{ tabBarLabel: "Mess", tabBarIcon: "silverware-fork-knife" }}
      />
      <Tab.Screen
        name="OutletsTab"
        component={OutletStack}
        options={{ tabBarLabel: "Outlets", tabBarIcon: "food" }}
      />
      <Tab.Screen
        name="MiscTab"
        component={MiscStack}
        options={{ tabBarLabel: "More", tabBarIcon: "dots-horizontal" }}
      />
    </Tab.Navigator>
  );
};
