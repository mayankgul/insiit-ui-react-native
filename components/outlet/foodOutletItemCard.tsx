import { Button, Card, Divider, Icon } from "react-native-paper";
import { Text, View, Image } from "react-native";
import { FoodOutletCarousel } from "./foodOutletCarousel";
import { Outlet } from "../../models/outlet.model";

export const FoodOutletItemCard = ({ item }: { item: Outlet }) => {
  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#ffffff" }}>
          {item.name}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            source={({ size, color }) => (
              <Image
                source={require("../../assets/icons-light/star-icon.png")}
                style={{ width: size, height: size }}
              />
            )}
            size={17}
            color="#f0ad00"
          />
          <Text style={{ marginLeft: 5, fontSize: 15, color: "#ffffff" }}>
            4.5
          </Text>
        </View>
      </View>

      {/* <View style={{ alignItems: "center" }}>
        <Divider bold style={{ marginTop: 10, width: "95%" }} />
      </View> */}

      <View style={{ marginTop: 30, marginHorizontal: 10 }}>
        <Text style={{ fontSize: 13, color: "#ffffff" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
          temporibus, voluptatibus mollitia sint quo adipisci deleniti, quia.
        </Text>
      </View>
    </View>
  );
};
