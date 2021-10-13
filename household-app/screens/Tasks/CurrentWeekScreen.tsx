import React, { FC } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { MaterialIcons } from "@expo/vector-icons";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const LastMonthScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Week</Text>
    </View>
  );
};

export default LastMonthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "grey",
  },
});
