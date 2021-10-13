import React, { FC } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { MaterialIcons } from "@expo/vector-icons";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const LastWeekScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <Pressable
  //         onPress={() => navigation.navigate(MainRoutes.TasksScreen)}
  //       >
  //         <MaterialIcons name="keyboard-arrow-left" size={24} color="grey" />
  //       </Pressable>
  //     ),
  //   });
  // }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Last week</Text>
    </View>
  );
};

export default LastWeekScreen;

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
