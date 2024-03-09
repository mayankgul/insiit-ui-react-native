import { ScrollView, StyleSheet, useColorScheme, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../../services/app/hooks";
import { MessQrSignIn } from "../../components/mess/messQrSignIn";
import { MessQrDisplay } from "../../components/mess/messQrDisplay";
import { MessQrProfile } from "../../components/mess/messQrProfile";
import { useEffect } from "react";
import { getMessQrStorage } from "../../services/app/features/mess";

export const MessQRScreen = () => {
  const colorScheme = useColorScheme();

  const dispatch = useAppDispatch();
  const messQrData = useAppSelector((state) => state.messQr);

  useEffect(() => {
    dispatch(getMessQrStorage());
  }, []);

  if (messQrData.order_id !== null) {
    return (
      <ScrollView
        style={[
          styles.scrollContainer,
          colorScheme === "light"
            ? { backgroundColor: "#ffffff" }
            : { backgroundColor: "#202020" },
        ]}
        contentContainerStyle={styles.container}
      >
        {messQrData.loading ? (
          <Text>Loading</Text>
        ) : (
          <>
            <MessQrDisplay
              order_id={messQrData.order_id}
              mess_name={messQrData.mess_name}
            />

            <MessQrProfile />
          </>
        )}
      </ScrollView>
    );
  }

  return <MessQrSignIn />;
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingTop: "8%",
  },
  container: { alignItems: "center" },
});
