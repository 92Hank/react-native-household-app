import React, { FC } from 'react';
import { View, StyleSheet, Text, FlatList } from "react-native";
import { FeedStackScreenProps, MainRoutes } from '../routes/routes';

type Props = FeedStackScreenProps<MainRoutes.UsersInHouseHoldScreen>;

const UsersInHouseHoldScreen: FC<Props> = ({
  navigation,
}: Props): React.ReactElement => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { key: "Devin" },
          { key: "Dan" },
          { key: "Dominic" },
          { key: "Jackson" },
          { key: "James" },
          { key: "Joel" },
          { key: "John" },
          { key: "Jillian" },
          { key: "Jimmy" },
          { key: "Julie" },
        ]}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
};

export default UsersInHouseHoldScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
