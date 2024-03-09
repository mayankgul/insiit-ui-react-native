import {
  Text,
  ScrollView,
  View,
  Pressable,
  StyleSheet,
  Image,
  useColorScheme,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Button, Card, Divider, Icon } from "react-native-paper";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/app/hooks";
import {
  computeCurrentMealId,
  getMessStorage,
} from "../../services/app/features/mess";
import { MessMenuItemCard } from "../../components/mess/messMenuItem";
import { SplashScreen } from "../splashScreen";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideInRight,
  SlideInUp,
  SlideOutLeft,
  SlideOutRight,
  SlideOutUp,
  useSharedValue,
} from "react-native-reanimated";
import { LoadingScreen } from "../loadingScreen";
import { setScrollOffsetY } from "../../services/app/features/home.screen";

export const HomeScreen = () => {
  const colorScheme = useColorScheme();

  const navigation = useNavigation();

  const [name, setName] = useState(null);
  const userData = useAppSelector((state) => state.user);
  const messData = useAppSelector((state) => state.mess);

  const dispatch = useAppDispatch();

  const [day, setDay] = useState<
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday"
  >("monday");

  useEffect(() => {
    if (userData.user !== null) {
      setName(userData.user.name.split(" ")[0]);
    } else {
      setName("Guest");
    }

    dispatch(getMessStorage());

    const date = new Date();
    const day = date.getDay();
    switch (day) {
      case 0:
        setDay("sunday");
        break;
      case 1:
        setDay("monday");
        break;
      case 2:
        setDay("tuesday");
        break;
      case 3:
        setDay("wednesday");
        break;
      case 4:
        setDay("thursday");
        break;
      case 5:
        setDay("friday");
        break;
      case 6:
        setDay("saturday");
        break;
    }
  }, []);

  const scrollOffsetY = useAppSelector(
    (state) => state.homeScreen.scrollOffsetY
  );

  if (messData.loading === null || messData.loading) {
    return <LoadingScreen text="Welcome! Starting up..." />;
  }

  return (
    <Animated.ScrollView
      style={[
        styles.scrollContainer,
        colorScheme === "light"
          ? { backgroundColor: "#ffffff" }
          : { backgroundColor: "#202020" },
      ]}
      contentContainerStyle={styles.contentContainer}
      entering={FadeIn}
      onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
        dispatch(setScrollOffsetY(e.nativeEvent.contentOffset.y));
      }}
    >
      <>
        {scrollOffsetY < 35 ? (
          <Animated.Text
            style={[
              styles.title,
              colorScheme === "light"
                ? { color: "#000000" }
                : { color: "#ffffff" },
            ]}
            entering={SlideInUp}
            exiting={SlideOutUp}
          >
            Hey {name}!
          </Animated.Text>
        ) : (
          <View style={{ height: 45 }}></View>
        )}
        <Text
          style={[
            styles.subtitle,
            colorScheme === "light"
              ? { color: "#000000" }
              : { color: "#ffffffe2" },
          ]}
        >
          How are you doing today?
        </Text>

        <View style={styles.cardContainer}>
          {/* <Pressable
            onPress={() => {
              navigation.dispatch(StackActions.push("Bus"));
            }}
            style={styles.pressable}
          >
            <Card
              mode="outlined"
              style={[
                styles.pressableCard,
                colorScheme === "light"
                  ? {
                      backgroundColor: "#e4d7ff",
                      borderColor: "#e4d7ff",
                    }
                  : {
                      backgroundColor: "#424045",
                      borderColor: "#424045",
                    },
              ]}
            >
              <Card.Content style={styles.cardContent}>
                <Icon
                  source={({ size, color }) => (
                    <Image
                      source={
                        colorScheme === "light"
                          ? require("../../assets/icons-light/bus-icon.png")
                          : require("../../assets/icons-dark/bus-icon.png")
                      }
                      style={{ width: size, height: size }}
                    />
                  )}
                  size={25}
                />
                <Text
                  style={[
                    styles.cardText,
                    colorScheme === "light"
                      ? { color: "#000000" }
                      : { color: "#ffffffd7" },
                  ]}
                >
                  Bus Schedule
                </Text>
              </Card.Content>
            </Card>
          </Pressable>

          <Pressable onPress={() => {}} style={styles.pressable}>
            <Card
              mode="outlined"
              style={[
                styles.pressableCard,
                colorScheme === "light"
                  ? {
                      backgroundColor: "#fff7b3",
                      borderColor: "#fff7b3",
                      marginRight: 15,
                    }
                  : {
                      backgroundColor: "#504e3d",
                      borderColor: "#504e3d",
                      marginRight: 15,
                    },
              ]}
            >
              <Card.Content style={styles.cardContent}>
                <Icon
                  source={({ size, color }) => (
                    <Image
                      source={
                        colorScheme === "light"
                          ? require("../../assets/icons-light/door-icon.png")
                          : require("../../assets/icons-dark/door-icon.png")
                      }
                      style={{ width: size, height: size }}
                    />
                  )}
                  size={25}
                  color="#ba9a26"
                />
                <Text
                  style={[
                    styles.cardText,
                    colorScheme === "light"
                      ? { color: "#000000" }
                      : { color: "#ffffffd7" },
                  ]}
                >
                  Book a Room
                </Text>
              </Card.Content>
            </Card>
          </Pressable> */}

          <Text
            style={{
              color: colorScheme === "light" ? "#000000" : "#ffffffe2",
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            No upcoming events!
          </Text>
        </View>

        <Pressable
          onPress={() => {
            navigation.dispatch(StackActions.push("MessMenu"));
          }}
          style={{ paddingBottom: 15 }}
        >
          <View style={styles.pressableContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ marginRight: 15 }}>
                <Icon
                  source={({ size, color }) => (
                    <Image
                      source={
                        colorScheme === "light"
                          ? require("../../assets/icons-light/spoon-fork-icon.png")
                          : require("../../assets/icons-dark/spoon-fork-icon.png")
                      }
                      style={{ width: size, height: size }}
                    />
                  )}
                  size={27}
                  color="#000000"
                />
              </View>
              <View>
                <Text
                  style={[
                    styles.text,
                    colorScheme === "light"
                      ? { color: "#000000" }
                      : { color: "#ffffffe2" },
                  ]}
                >
                  What's in the mess?
                </Text>
              </View>
            </View>

            <Icon
              source={({ size, color }) => (
                <Image
                  source={
                    colorScheme === "light"
                      ? require("../../assets/icons-light/right-arrow-icon.png")
                      : require("../../assets/icons-dark/right-arrow-icon.png")
                  }
                  style={{ width: size, height: size }}
                />
              )}
              size={16}
            />
          </View>
        </Pressable>

        <Divider
          style={{
            marginTop: 10,
            backgroundColor: colorScheme === "light" ? "#979797" : "#ffffff8c",
          }}
          bold
          horizontalInset
        />

        {messData.menu && (
          <View style={{ marginTop: 20, marginHorizontal: "5%" }}>
            {computeCurrentMealId(messData.timings) === 1 ? (
              <>
                {messData.menu[day].breakfast?.map((item) => {
                  return (
                    <View key={item.id} style={{ marginBottom: 10 }}>
                      <MessMenuItemCard
                        item={item}
                        style={[
                          styles.menuItemCard,
                          colorScheme === "light"
                            ? {
                                backgroundColor: "#f7f7f7",
                                borderColor: "#f7f7f7",
                              }
                            : {
                                backgroundColor: "#2f2f3970",
                                borderColor: "#2f2f3970",
                              },
                        ]}
                      />
                    </View>
                  );
                })}
              </>
            ) : computeCurrentMealId(messData.timings) === 2 ? (
              <>
                {messData.menu[day].lunch?.map((item) => {
                  return (
                    <View key={item.id} style={{ marginBottom: 10 }}>
                      <MessMenuItemCard
                        item={item}
                        style={[
                          styles.menuItemCard,
                          colorScheme === "light"
                            ? {
                                backgroundColor: "#f7f7f7",
                                borderColor: "#f7f7f7",
                              }
                            : {
                                backgroundColor: "#2f2f3970",
                                borderColor: "#2f2f3970",
                              },
                        ]}
                      />
                    </View>
                  );
                })}
              </>
            ) : computeCurrentMealId(messData.timings) === 3 ? (
              <>
                {messData.menu[day].snacks?.map((item) => {
                  return (
                    <View key={item.id} style={{ marginBottom: 10 }}>
                      <MessMenuItemCard
                        item={item}
                        style={[
                          styles.menuItemCard,
                          colorScheme === "light"
                            ? {
                                backgroundColor: "#f7f7f7",
                                borderColor: "#f7f7f7",
                              }
                            : {
                                backgroundColor: "#2f2f3970",
                                borderColor: "#2f2f3970",
                              },
                        ]}
                      />
                    </View>
                  );
                })}
              </>
            ) : (
              <>
                {messData.menu[day].dinner?.map((item) => {
                  return (
                    <View key={item.id} style={{ marginBottom: 10 }}>
                      <MessMenuItemCard
                        item={item}
                        style={[
                          styles.menuItemCard,
                          colorScheme === "light"
                            ? {
                                backgroundColor: "#f7f7f7",
                                borderColor: "#f7f7f7",
                              }
                            : {
                                backgroundColor: "#2f2f3970",
                                borderColor: "#2f2f3970",
                              },
                        ]}
                      />
                    </View>
                  );
                })}
              </>
            )}
          </View>
        )}
      </>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    // opacity: 0.08,
    paddingTop: 20,
    // paddingLeft: 20,
  },
  contentContainer: { paddingBottom: 50 },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  pressable: { width: "45%", marginRight: 5, marginLeft: 15 },
  pressableCard: {
    height: 100,
    borderWidth: 0,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
  cardContent: { alignItems: "center", flexDirection: "row" },
  cardText: { fontSize: 13, marginLeft: 10 },
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
  menuItemCard: { marginBottom: 7 },
});
