import { useState, useEffect } from "react";
import { View, ScrollView, Text, Image, useColorScheme } from "react-native";
import { Divider, List } from "react-native-paper";
import { DayMessMenu, MessTimings } from "../../models/mess.model";
import { MessMenuItemCard } from "./messMenuItem";

export const DayMessMenuDisplay = ({
  menu,
  timings,
  expandedAccordionId,
}: {
  menu: DayMessMenu;
  timings: MessTimings;
  expandedAccordionId: 1 | 2 | 3 | 4;
}) => {
  const colorScheme = useColorScheme();

  const [expandedId, setExpandedId] = useState<number | null>(
    expandedAccordionId
  );

  if (menu === null) {
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
            colorScheme === "light"
              ? { color: "#000000" }
              : { color: "#ffffffe2" },
          ]}
        >
          Menu not available
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        {
          flex: 1,
        },
        colorScheme === "light"
          ? { backgroundColor: "#ffffff" }
          : { backgroundColor: "#282828" },
      ]}
    >
      <List.AccordionGroup
        expandedId={expandedId}
        onAccordionPress={(id: number) =>
          expandedId === id ? setExpandedId(null) : setExpandedId(id)
        }
      >
        {Object.keys(menu).map(
          (meal: "breakfast" | "lunch" | "snacks" | "dinner") => {
            return (
              <View key={meal}>
                <List.Accordion
                  key={meal}
                  title={
                    <Text
                      key={meal}
                      style={[
                        { fontSize: 15 },
                        colorScheme === "light"
                          ? { color: "#000000" }
                          : { color: "#ffffffe2" },
                      ]}
                    >
                      {`${meal.charAt(0).toUpperCase()}${meal.slice(1)}`}
                    </Text>
                  }
                  description={
                    <Text
                      key={meal}
                      style={[
                        { fontSize: 13, paddingTop: 5 },
                        colorScheme === "light"
                          ? { color: "gray" }
                          : { color: "#ffffffbb" },
                      ]}
                    >{`${timings[meal].start} to ${timings[meal].end}`}</Text>
                  }
                  id={
                    meal === "breakfast"
                      ? 1
                      : meal === "lunch"
                      ? 2
                      : meal === "snacks"
                      ? 3
                      : 4
                  }
                  style={[
                    colorScheme === "light"
                      ? { backgroundColor: "#ffffff" }
                      : { backgroundColor: "#303030" },
                  ]}
                  rippleColor="transparent"
                  right={(_) => {
                    if (
                      (meal === "breakfast" && expandedId === 1) ||
                      (meal === "lunch" && expandedId === 2) ||
                      (meal === "snacks" && expandedId === 3) ||
                      (meal === "dinner" && expandedId === 4)
                    ) {
                      return (
                        <Image
                          key={`${meal}-active`}
                          source={
                            colorScheme === "light"
                              ? require("../../assets/icons-light/up-arrow-icon.png")
                              : require("../../assets/icons-dark/up-arrow-icon.png")
                          }
                          style={{ width: 20, height: 20 }}
                        />
                      );
                    } else {
                      return (
                        <Image
                          key={meal}
                          source={
                            colorScheme === "light"
                              ? require("../../assets/icons-light/down-arrow-icon.png")
                              : require("../../assets/icons-dark/down-arrow-icon.png")
                          }
                          style={{ width: 20, height: 20 }}
                        />
                      );
                    }
                  }}
                >
                  <View
                    key={meal}
                    style={[
                      {
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: 50,
                      },
                      colorScheme === "light"
                        ? { backgroundColor: "#ffffff" }
                        : { backgroundColor: "#282828" },
                    ]}
                  >
                    {menu[meal] ? (
                      <>
                        {menu[meal].map((item, index) => (
                          // <List.Item
                          //   style={{
                          //     alignItems: "center",
                          //     justifyContent: "center",
                          //   }}
                          //   key={item.id}
                          //   title={() => {
                          //     return (
                          <MessMenuItemCard
                            key={item.id}
                            item={item}
                            style={[
                              {
                                marginTop: index === 0 ? 15 : 10,
                                marginBottom:
                                  index === menu[meal].length - 1 ? 15 : 0,
                                width: "90%",
                              },
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
                          //     );
                          //   }}
                          // />
                        ))}
                      </>
                    ) : (
                      <Text
                        key={meal}
                        style={[
                          colorScheme === "light"
                            ? { color: "#000000" }
                            : { color: "#ffffffe2" },
                        ]}
                      >
                        Menu not available
                      </Text>
                    )}
                  </View>
                </List.Accordion>
                {colorScheme === "light" && <Divider key={meal} />}
              </View>
            );
          }
        )}
      </List.AccordionGroup>
    </ScrollView>
  );
};
