import { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import { Divider, List } from "react-native-paper";
import { DayMessMenu, MessTimings } from "../models/mess.model";
import { MessMenuItemCard } from "./MessMenuItemCard";

export const DayMessMenuDisplay = ({
  menu,
  timings,
  expandedAccordionId,
}: {
  menu: DayMessMenu;
  timings: MessTimings;
  expandedAccordionId: 1 | 2 | 3 | 4;
}) => {
  const [expandedId, setExpandedId] = useState<number | null>(
    expandedAccordionId
  );

  if (menu === null) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Menu not available</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <List.AccordionGroup
        expandedId={expandedId}
        onAccordionPress={(id: number) =>
          expandedId === id ? setExpandedId(null) : setExpandedId(id)
        }
      >
        <List.Accordion
          title={<Text style={{ fontSize: 15 }}>Breakfast</Text>}
          description={
            <Text
              style={{ fontSize: 13, paddingTop: 5, color: "gray" }}
            >{`${timings.breakfast.start} to ${timings.breakfast.end}`}</Text>
          }
          id={1}
        >
          {menu.breakfast ? (
            <>
              {menu.breakfast.map((item) => (
                <List.Item
                  key={item.id}
                  title={() => {
                    return (
                      <View>
                        <MessMenuItemCard item={item} />
                      </View>
                    );
                  }}
                />
              ))}
            </>
          ) : (
            <Text>Menu not available</Text>
          )}
        </List.Accordion>

        <List.Accordion
          title={<Text style={{ fontSize: 15 }}>Lunch</Text>}
          description={
            <Text
              style={{ fontSize: 13, paddingTop: 5, color: "gray" }}
            >{`${timings.lunch.start} to ${timings.lunch.end}`}</Text>
          }
          id={2}
        >
          {menu.lunch ? (
            <>
              {menu.lunch.map((item) => (
                <List.Item
                  key={item.id}
                  title={() => {
                    return (
                      <View>
                        <MessMenuItemCard item={item} />
                      </View>
                    );
                  }}
                />
              ))}
            </>
          ) : (
            <Text>Menu not available</Text>
          )}
        </List.Accordion>

        <List.Accordion
          title={<Text style={{ fontSize: 15 }}>Snacks</Text>}
          description={
            <Text
              style={{ fontSize: 13, paddingTop: 5, color: "gray" }}
            >{`${timings.snacks.start} to ${timings.snacks.end}`}</Text>
          }
          id={3}
        >
          {menu.snacks ? (
            <>
              {menu.snacks.map((item) => (
                <List.Item
                  key={item.id}
                  title={() => {
                    return (
                      <View>
                        <MessMenuItemCard item={item} />
                      </View>
                    );
                  }}
                />
              ))}
            </>
          ) : (
            <Text>Menu not available</Text>
          )}
        </List.Accordion>

        <List.Accordion
          title={<Text style={{ fontSize: 15 }}>Dinner</Text>}
          description={
            <Text
              style={{ fontSize: 13, paddingTop: 5, color: "gray" }}
            >{`${timings.dinner.start} to ${timings.dinner.end}`}</Text>
          }
          id={4}
        >
          {menu.dinner ? (
            <>
              {menu.dinner.map((item) => (
                <List.Item
                  key={item.id}
                  title={() => {
                    return (
                      <View>
                        <MessMenuItemCard item={item} />
                      </View>
                    );
                  }}
                />
              ))}
            </>
          ) : (
            <Text>Menu not available</Text>
          )}
        </List.Accordion>
      </List.AccordionGroup>
    </ScrollView>
  );
};
