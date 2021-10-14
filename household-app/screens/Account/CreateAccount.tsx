import React, { FC } from 'react'
import { View, Text, StyleSheet } from "react-native";
import { FeedStackScreenProps, MainRoutes } from '../../routes/routes';

type Props = FeedStackScreenProps<MainRoutes.CreateAccountScreen>;

const CreateAccountScreen: FC<Props> = ({
  navigation,
}: Props): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Account</Text>
    </View>
  );
};

export default CreateAccountScreen;

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
