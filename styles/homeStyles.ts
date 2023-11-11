import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 20,
    paddingLeft: 20,
  },
  title: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    fontStyle: "italic",
    marginBottom: 35,
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
  },
});
