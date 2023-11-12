import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MessQRScreen } from "../screens/MessQRScreen";
import { NotificationScreen } from "../screens/NotificationScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { TopBar } from "../components/TopBar";
import { OutletScreen } from "../screens/OutletScreen";

const Stack = createNativeStackNavigator();

export const OutletStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Outlet"
        component={OutletScreen}
        options={{
          headerRight: (_) => {
            return <TopBar />;
          },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="MessQR"
        component={MessQRScreen}
        options={{ headerTitle: "View Mess QR" }}
      />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
