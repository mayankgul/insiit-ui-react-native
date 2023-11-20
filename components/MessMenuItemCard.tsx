import { View, Text } from "react-native";
import { Avatar, Card, Icon } from "react-native-paper";
import { MessMenuItem } from "../models/mess.model";

export const MessMenuItemCard = ({ item }: { item: MessMenuItem }) => {
  return (
    <Card mode="outlined" style={{ backgroundColor: "transparent" }}>
      <Card.Content
        style={{
          padding: 2,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ justifyContent: "space-between", width: "70%" }}>
          <View>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text
              style={{
                fontStyle: "italic",
                fontSize: 12,
                color: "#696969",
                marginTop: 2,
              }}
            >
              {item.description ? item.description : "No description"}
            </Text>
          </View>
          <Text
            style={{
              fontStyle: "italic",
              fontSize: 12,
              color: "#696969",
              marginBottom: 2,
            }}
          >
            {item.cal ? `${item.cal} kcal` : "No calorie information"}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          {item.image ? (
            <Avatar.Image
              source={{ uri: item.image }}
              size={60}
              style={{ marginBottom: 5 }}
            />
          ) : (
            <Avatar.Icon
              icon="food-apple-outline"
              size={60}
              style={{ marginBottom: 5, backgroundColor: "transparent" }}
              color="#000000"
            />
          )}

          {item.rating !== null ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon source="star" size={17} color="#f0ad00" />
              <Text style={{ marginLeft: 5, fontSize: 10 }}>
                {item.rating.toFixed(1)}
              </Text>
            </View>
          ) : null}
        </View>
      </Card.Content>
    </Card>
  );
};
