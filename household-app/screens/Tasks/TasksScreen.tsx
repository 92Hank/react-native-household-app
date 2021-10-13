import React, { FC } from 'react'
import { View, Text, StyleSheet } from "react-native";
import { FeedStackScreenProps, MainRoutes } from '../../routes/routes';

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const TasksScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text>Tasks</Text>
    </View>
  );
};

export default TasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#666666",
    justifyContent: "center",
  },
});
