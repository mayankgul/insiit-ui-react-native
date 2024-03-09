import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Image,
  ScrollView,
  ImageBackground,
  useColorScheme,
  Text,
} from "react-native";
import { Button, Card, Divider, IconButton } from "react-native-paper";
import { FoodOutletItemCard } from "../../components/outlet/foodOutletItemCard";
import { FoodOutletCarousel } from "../../components/outlet/foodOutletCarousel";
import { LoadingScreen } from "../loadingScreen";
import { useAppDispatch, useAppSelector } from "../../services/app/hooks";
import {
  getOutletStorage,
  setOutletStorage,
} from "../../services/app/features/outlet";
import axios from "axios";
import { API_BASE_URL } from "../../models/constants";
import { Outlet } from "../../models/outlet.model";

export const OutletScreen = () => {
  const colorScheme = useColorScheme();

  const dispatch = useAppDispatch();

  const outlet = useAppSelector((state) => state.outlet);
  const activeCarouselIndex = useAppSelector(
    (state) => state.outletScreen.activeCarouselIndex
  );

  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getOutletStorage());

    if (outlet.loading === false && outlet.outlets === null) {
      setLoading(true);

      axios({
        method: "GET",
        url: `${API_BASE_URL}/food-outlet`,
      })
        .then((res) => {
          const fetchedOutlets: Outlet[] = res.data.outlets;

          setLoading(false);

          dispatch(setOutletStorage(fetchedOutlets));
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
  }, []);

  if (
    loading ||
    outlet.loading ||
    outlet.outlets === null ||
    outlet.loading === null
  )
    return <LoadingScreen text="Getting munchies for you" />;

  return (
    <ScrollView
      style={[
        {
          flex: 1,
          paddingTop: "5%",
        },
        colorScheme === "light"
          ? { backgroundColor: "#ffffff" }
          : { backgroundColor: "#202020" },
      ]}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <View
          style={[
            {
              backgroundColor: "transparent",
              borderWidth: searchFocused ? 2 : 1,
              width: "80%",
              borderRadius: 100,
              marginRight: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            },
            colorScheme === "light"
              ? { borderColor: "#000000" }
              : { borderColor: "#ffffffbb" },
          ]}
        >
          <Image
            source={
              colorScheme === "light"
                ? require("../../assets/icons-light/search-icon.png")
                : require("../../assets/icons-dark/search-icon.png")
            }
            style={{ width: 22, height: 22, marginLeft: 15 }}
          />
          <TextInput
            editable
            onChangeText={(text) => setSearch(text)}
            value={search}
            style={{ padding: 10, paddingLeft: 15, width: "85%" }}
            cursorColor={colorScheme === "light" ? "#000000" : "#ffffff"}
            placeholder="Search..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            showSoftInputOnFocus
            onPointerLeave={() => setSearchFocused(false)}
            placeholderTextColor={
              colorScheme === "light" ? "#000000" : "#ffffffe2"
            }
          />
        </View>
      </View>

      <View style={{ width: "87%", marginTop: 20 }}>
        <Card style={{ backgroundColor: "#ffffff", marginTop: 10 }}>
          <Card.Content
            style={[
              {
                paddingHorizontal: 0,
                paddingVertical: 0,
                borderRadius: 10,
              },
              !outlet.outlets[activeCarouselIndex]?.image
                ? {
                    backgroundColor:
                      colorScheme === "light" ? "gray" : "#303030",
                  }
                : {},
            ]}
          >
            <ImageBackground
              source={
                outlet.outlets[activeCarouselIndex]?.image
                  ? {
                      uri: outlet.outlets[activeCarouselIndex].image,
                    }
                  : {}
              }
              style={[
                {
                  width: "100%",
                  alignItems: "center",
                  height: 250,
                  opacity: 0.85,
                  justifyContent: "center",
                },
              ]}
              borderRadius={10}
            >
              <FoodOutletCarousel data={outlet.outlets} />
            </ImageBackground>
          </Card.Content>
        </Card>
      </View>

      <View
        style={{
          width: "90%",
          marginTop: 25,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            { fontSize: 22, marginLeft: 5, fontWeight: "bold" },
            colorScheme === "light"
              ? { color: "#000000" }
              : { color: "#ffffffe2" },
          ]}
        >
          Top Dishes
        </Text>

        <Button onPress={() => {}} rippleColor="transparent">
          <Text
            style={[
              { fontSize: 16 },
              colorScheme === "light"
                ? { color: "#000000" }
                : { color: "#ffffffe2" },
            ]}
          >
            See all
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};
