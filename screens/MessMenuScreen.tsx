import { Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../models/constants";
import { SplashScreen } from "./SplashScreen";
import { Button } from "react-native-paper";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../services/app/hooks";
import { getMessStorage, setMessStorage } from "../services/app/features/mess";
import { Mess, MessTimings } from "../models/mess.model";
import { DayMessMenuDisplay } from "../components/dayMessMenuDisplay";

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

  /**
   * Returns ID (1, 2, 3 or 4) corresponding to current meal according to local time
   * @param  {MessTimings} timings The timings object
   * @return {number}              ID corresponding to current meal
   */
  const computeCurrentMealId = (timings: MessTimings): 1 | 2 | 3 | 4 => {
    const current = new Date();

    const breakfastStartTime = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      parseInt(timings.breakfast.start.split(":")[0]),
      parseInt(timings.breakfast.start.split(":")[1])
    );
    const breakfastEndTime = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      parseInt(timings.breakfast.end.split(":")[0]),
      parseInt(timings.breakfast.end.split(":")[1])
    );

    const lunchStartTime = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      parseInt(timings.lunch.start.split(":")[0]),
      parseInt(timings.lunch.start.split(":")[1])
    );
    const lunchEndTime = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      parseInt(timings.lunch.end.split(":")[0]),
      parseInt(timings.lunch.end.split(":")[1])
    );

    const snacksStartTime = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      parseInt(timings.snacks.start.split(":")[0]),
      parseInt(timings.snacks.start.split(":")[1])
    );
    const snacksEndTime = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      parseInt(timings.snacks.end.split(":")[0]),
      parseInt(timings.snacks.end.split(":")[1])
    );

    const dinnerStartTime = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      parseInt(timings.dinner.start.split(":")[0]),
      parseInt(timings.dinner.start.split(":")[1])
    );
    const dinnerEndTime = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      parseInt(timings.dinner.end.split(":")[0]),
      parseInt(timings.dinner.end.split(":")[1])
    );

    if (current >= breakfastStartTime && current <= breakfastEndTime) return 1;
    if (current >= lunchStartTime && current <= lunchEndTime) return 2;
    if (current >= snacksStartTime && current <= snacksEndTime) return 3;
    if (current >= dinnerStartTime && current <= dinnerEndTime) return 4;
    if (current >= breakfastEndTime && current <= lunchStartTime) return 2;
    if (current >= lunchEndTime && current <= snacksStartTime) return 3;
    if (current >= snacksEndTime && current <= dinnerStartTime) return 4;
    if (current >= dinnerEndTime && current <= breakfastStartTime) return 1;
  };

  if (loading || mess.loading) {
    return <SplashScreen />;
  }

  if (mess.id === null) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 20 }}>
          Please select a mess
        </Text>
        {messes.map((mess) => {
          return (
            <Button
              key={mess.id}
              textColor="#000000"
              mode="outlined"
              style={{ width: "60%", marginBottom: 10 }}
              onPress={() => dispatch(setMessStorage(mess))}
            >
              <Text style={{ fontSize: 17 }}>{mess.name}</Text>
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
          initialRouteName={`${day.charAt(0).toUpperCase()}${day.slice(
            1
          )}MessMenu`}
        >
          <Tab.Screen name="MondayMessMenu" options={{ title: "M" }}>
            {() => (
              <DayMessMenuDisplay
                menu={mess.menu.monday}
                timings={mess.timings}
                expandedAccordionId={computeCurrentMealId(mess.timings)}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="TuesdayMessMenu" options={{ title: "T" }}>
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
          </Tab.Screen>
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
