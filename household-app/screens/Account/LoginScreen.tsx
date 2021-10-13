import React, { FC } from 'react'
import { View, Text, StyleSheet } from "react-native";
import { FeedStackScreenProps, MainRoutes } from '../../routes/routes';

type Props = FeedStackScreenProps<MainRoutes.LoginScreen>;

const LoginScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
};

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#666666",
    justifyContent: "center",
  },
});
