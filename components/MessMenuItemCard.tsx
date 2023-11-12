import { View, Text } from "react-native";
import { Avatar, Card, Icon } from "react-native-paper";

export const MessMenuItemCard = ({
  name,
  description,
  cal,
  rating,
  image,
}: {
  name: string;
  description?: string;
  cal?: number;
  rating?: number;
  image?: string;
}) => {
  return (
    <Card mode="outlined" style={{ marginBottom: 10 }}>
      <Card.Content
        style={{
          padding: 2,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontWeight: "bold" }}>{name}</Text>
            <Text
              style={{
                fontStyle: "italic",
                fontSize: 13,
                color: "#696969",
                marginTop: 2,
              }}
            >
              {description ? description : "No description"}
            </Text>
          </View>
          <Text
            style={{
              fontStyle: "italic",
              fontSize: 13,
              color: "#696969",
              marginBottom: 2,
            }}
          >
            {cal ? `${cal} kcal` : "No calorie information"}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          {image ? (
            <Avatar.Image
              source={{ uri: image }}
              size={60}
              style={{ marginBottom: 5 }}
            />
          ) : (
            <Avatar.Icon
              icon="food-apple-outline"
              size={60}
              style={{ marginBottom: 5 }}
              color="transparent"
            />
          )}

          {rating ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon source="star-outline" size={20} color="#f0ad00" />
              <Text style={{ marginLeft: 5 }}>4.3</Text>
            </View>
          ) : null}
        </View>
      </Card.Content>
    </Card>
  );
};
