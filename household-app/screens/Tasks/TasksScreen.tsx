import React, { FC } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { FeedStackScreenProps, MainRoutes } from '../../routes/routes';

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const TasksScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tasks</Text>
    </View>
  );
};

export default TasksScreen;

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
