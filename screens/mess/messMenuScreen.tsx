import { Text, View, useColorScheme } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../models/constants";
import { Button } from "react-native-paper";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../services/app/hooks";
import {
  computeCurrentMealId,
  getMessStorage,
  setMessStorage,
} from "../../services/app/features/mess";
import { Mess, MessTimings } from "../../models/mess.model";
import { DayMessMenuDisplay } from "../../components/mess/dayMessMenuDisplay";
import { LoadingScreen } from "../loadingScreen";

const Tab = createMaterialTopTabNavigator();

const days = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
};

export const MessMenuScreen = () => {
  const colorScheme = useColorScheme();

  const dispatch = useAppDispatch();

  const mess = useAppSelector((state) => state.mess);

  const [day, setDay] = useState<
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday"
  >("monday");

  const [messes, setMesses] = useState<Mess[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const date = new Date();
    const today = date.getDay();
    setDay(days[today]);

    dispatch(getMessStorage());
  }, []);

  useEffect(() => {
    if (mess.loading === false) {
      if (mess.id === null) {
        setLoading(true);
        axios({
          method: "GET",
          url: `${API_BASE_URL}/mess`,
        })
          .then((res) => {
            setMesses(res.data.messes);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
            console.log(err.message);
          });
      }
    }
  }, [mess.loading]);

  if (loading || mess.loading) {
    return <LoadingScreen text="Getting your mess menu" />;
  }

  if (mess.id === null) {
    return (
      <View
        style={[
          {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          },
          colorScheme === "light"
            ? { backgroundColor: "#ffffff" }
            : { backgroundColor: "#282828" },
        ]}
      >
        <Text
          style={[
            { fontSize: 20, marginBottom: 20 },
            colorScheme === "light"
              ? { color: "#000000" }
              : { color: "#ffffffe2" },
          ]}
        >
          Please select your mess
        </Text>
        {messes.map((mess) => {
          return (
            <Button
              key={mess.id}
              mode="outlined"
              style={{
                width: "60%",
                marginBottom: 10,
                backgroundColor:
                  colorScheme === "light" ? "#000000" : "#3f3f3f",
              }}
              onPress={() => dispatch(setMessStorage(mess))}
            >
              <Text style={[{ fontSize: 17, color: "#ffffffe2" }]}>
                {mess.name}
              </Text>
            </Button>
          );
        })}
      </View>
    );
  }

  return (
    <>
      {mess.menu ? (
        <Tab.Navigator
          backBehavior="none"
          initialRouteName={`${day}-mess-menu`}
          screenOptions={{
            tabBarPressColor: "transparent",
            tabBarActiveTintColor:
              colorScheme === "light" ? "#000000" : "#ffffff",
            tabBarInactiveTintColor:
              colorScheme === "light" ? "gray" : "#ffffffbb",
            tabBarStyle: {
              backgroundColor: colorScheme === "light" ? "#ffffff" : "#202020",
            },
          }}
          // style={{
          //   backgroundColor: colorScheme === "light" ? "#000000" : "#ffffffe2",
          // }}
        >
          {Object.values(days).map(
            (
              d:
                | "monday"
                | "tuesday"
                | "wednesday"
                | "thursday"
                | "friday"
                | "saturday"
                | "sunday"
            ) => {
              return (
                <Tab.Screen
                  key={d}
                  name={`${d}-mess-menu`}
                  options={{ title: `${d.charAt(0).toUpperCase()}` }}
                >
                  {() => (
                    <DayMessMenuDisplay
                      menu={mess.menu[d]}
                      timings={mess.timings}
                      expandedAccordionId={computeCurrentMealId(mess.timings)}
                    />
                  )}
                </Tab.Screen>
              );
            }
          )}

          {/* <Tab.Screen name="TuesdayMessMenu" options={{ title: "T" }}>
            {() => (
              <DayMessMenuDisplay
                menu={mess.menu.tuesday}
                timings={mess.timings}
                expandedAccordionId={computeCurrentMealId(mess.timings)}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="WednesdayMessMenu" options={{ title: "W" }}>
            {() => (
              <DayMessMenuDisplay
                menu={mess.menu.wednesday}
                timings={mess.timings}
                expandedAccordionId={computeCurrentMealId(mess.timings)}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="ThursdayMessMenu" options={{ title: "Th" }}>
            {() => (
              <DayMessMenuDisplay
                menu={mess.menu.thursday}
                timings={mess.timings}
                expandedAccordionId={computeCurrentMealId(mess.timings)}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="FridayMessMenu" options={{ title: "F" }}>
            {() => (
              <DayMessMenuDisplay
                menu={mess.menu.friday}
                timings={mess.timings}
                expandedAccordionId={computeCurrentMealId(mess.timings)}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="SaturdayMessMenu" options={{ title: "S" }}>
            {() => (
              <DayMessMenuDisplay
                menu={mess.menu.saturday}
                timings={mess.timings}
                expandedAccordionId={computeCurrentMealId(mess.timings)}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="SundayMessMenu" options={{ title: "S" }}>
            {() => (
              <DayMessMenuDisplay
                menu={mess.menu.sunday}
                timings={mess.timings}
                expandedAccordionId={computeCurrentMealId(mess.timings)}
              />
            )}
          </Tab.Screen> */}
        </Tab.Navigator>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Menu not available for this mess</Text>
        </View>
      )}
    </>
  );
};
