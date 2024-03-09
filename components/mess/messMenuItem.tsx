import {
  View,
  Text,
  Image,
  StyleProp,
  ViewStyle,
  useColorScheme,
} from "react-native";
import { Avatar, Card, Icon } from "react-native-paper";
import { MessMenuItem } from "../../models/mess.model";
import { FontAwesome } from "@expo/vector-icons";

export const MessMenuItemCard = ({
  item,
  style,
}: {
  item: MessMenuItem;
  style?: StyleProp<ViewStyle>;
}) => {
  const colorScheme = useColorScheme();

  return (
    <Card
      mode={colorScheme === "light" ? "elevated" : "outlined"}
      style={style}
    >
      <Card.Content
        style={{
          padding: 2,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ justifyContent: "space-between", width: "70%" }}>
          <View>
            <Text
              style={[
                { fontWeight: "bold", marginBottom: 3 },
                colorScheme === "light"
                  ? { color: "#000000" }
                  : { color: "#ffffffe2" },
              ]}
            >
              {item.name}
            </Text>

            <Text
              style={[
                {
                  fontStyle: "italic",
                  fontSize: 12,
                  marginTop: 2,
                  marginBottom: 10,
                },
                colorScheme === "light"
                  ? { color: "#696969" }
                  : { color: "#ffffffbe" },
              ]}
            >
              {item.description ? item.description : "No description"}
            </Text>
          </View>

          <Text
            style={[
              {
                fontStyle: "italic",
                fontSize: 11,
                // marginBottom: 2,
              },
              colorScheme === "light"
                ? { color: "#696969" }
                : { color: "#ffffff93" },
            ]}
          >
            {item.cal ? `${item.cal} kcal` : "No calorie information"}
          </Text>
        </View>

        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {item.image ? (
            <Avatar.Image source={{ uri: item.image }} size={55} />
          ) : (
            <Avatar.Icon
              icon={({ size, color }) => (
                <Image
                  source={
                    colorScheme === "light"
                      ? require("../../assets/icons-light/mess-food-icon.png")
                      : require("../../assets/icons-dark/mess-food-icon.png")
                  }
                  style={{ width: size, height: size }}
                />
              )}
              size={60}
              style={{ backgroundColor: "transparent" }}
              color="#000000"
            />
          )}

          {item.rating !== null ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Icon
                source={({ size, color }) => (
                  <Image
                    source={
                      colorScheme === "light"
                        ? require("../../assets/icons-light/star-icon.png")
                        : require("../../assets/icons-dark/star-icon.png")
                    }
                    style={{ width: size, height: size }}
                  />
                )}
                size={15}
              />
              <Text
                style={[
                  { marginLeft: 5, fontSize: 10 },
                  colorScheme === "light"
                    ? { color: "#000000" }
                    : { color: "#ffffffe2" },
                ]}
              >
                {item.rating.toFixed(1)}
              </Text>
            </View>
          ) : null}
        </View>
      </Card.Content>
    </Card>
  );
};
