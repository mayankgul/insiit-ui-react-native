import { View, Text } from "react-native";
import { SplashScreen } from "../splashScreen";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 23.2127589,
          longitude: 72.6847766,
          latitudeDelta: 0.009,
          longitudeDelta: 0.004,
        }}
        mapType="hybrid"
      ></MapView>
    </View>
  );
};
