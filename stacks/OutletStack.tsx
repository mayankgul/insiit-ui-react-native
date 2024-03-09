import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { MessQRScreen } from "../screens/MessQRScreen";
// import { NotificationScreen } from "../screens/NotificationScreen";
// import { ProfileScreen } from "../screens/ProfileScreen";
// import { TopBar } from "../components/TopBar";
import { OutletScreen } from "../screens/outlet/outletScreen";
import { useColorScheme } from "react-native";

const Stack = createNativeStackNavigator();

export const OutletStack = () => {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        animation: "none",
        headerStyle: {
          backgroundColor: colorScheme === "light" ? "#ffffff" : "#202020",
        },
        headerTintColor: colorScheme === "light" ? "#000000" : "#ffffff",
      }}
    >
      <Stack.Screen
        name="Outlet"
        component={OutletScreen}
        options={{
          headerShadowVisible: false,
          headerTitle: "Food Outlets",
          headerTitleAlign: "center",
        }}
      />
      {/* <Stack.Screen
        name="MessQR"
        component={MessQRScreen}
        options={{ headerTitle: "View Mess QR" }}
      />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
  );
};
