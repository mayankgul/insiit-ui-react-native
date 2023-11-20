import { Text, ScrollView, View, Pressable, StyleSheet } from "react-native";
import { Button, Card, Icon } from "react-native-paper";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useAppSelector } from "../services/app/hooks";

export const HomeScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState(null);
  const userData = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userData.user !== null) {
      setName(userData.user.name.split(" ")[0]);
    } else {
      setName("Guest");
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Hey {name}!</Text>
      <Text style={styles.subtitle}>How are you doing today?</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.dispatch(StackActions.push("Bus"));
          }}
          style={{ width: "45%", marginRight: 5, marginLeft: 15 }}
        >
          <Card
            mode="outlined"
            style={{
              height: 100,
              backgroundColor: "#e4d7ff",
              borderWidth: 0,
              borderRadius: 15,
              borderColor: "#e4d7ff",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
            }}
          >
            <Card.Content
              style={{ alignItems: "center", flexDirection: "row" }}
            >
              <Icon source="bus" size={25} color="#7b61ff" />
              <Text style={{ fontSize: 13, marginLeft: 10 }}>Bus Schedule</Text>
            </Card.Content>
          </Card>
        </Pressable>

        <Pressable
          onPress={() => {}}
          style={{ width: "45%", marginLeft: 5, marginRight: 15 }}
        >
          <Card
            mode="outlined"
            style={{
              height: 100,
              backgroundColor: "#fff7b3",
              borderWidth: 0,
              borderRadius: 15,
              borderColor: "#fff7b3",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
            }}
          >
            <Card.Content
              style={{ alignItems: "center", flexDirection: "row" }}
            >
              <Icon source="door-open" size={25} color="#ba9a26" />
              <Text style={{ fontSize: 13, marginLeft: 10 }}>Book a Room</Text>
            </Card.Content>
          </Card>
        </Pressable>
      </View>

      <Pressable
        onPress={() => {
          navigation.dispatch(StackActions.push("MessMenu"));
        }}
      >
        <View style={styles.pressableContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: 10 }}>
              <Icon source="silverware-fork-knife" size={20} color="#000000" />
            </View>
            <View>
              <Text style={styles.text}>What's in the mess?</Text>
            </View>
          </View>

          <Icon source="chevron-right" size={30} color="#000000" />
        </View>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // opacity: 0.08,
    paddingTop: 20,
    // paddingLeft: 20,
  },
  title: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 20,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    fontStyle: "italic",
    marginBottom: 35,
    marginLeft: 20,
  },
  text: {
    fontSize: 17,
  },
  subText: {
    fontSize: 13,
    marginTop: 2,
    color: "#696969",
  },
  pressableContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 25,
    marginLeft: 20,
    marginTop: 15,
  },
});
