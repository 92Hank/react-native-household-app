import React, { FC } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FeedStackScreenProps, MainRoutes } from '../../routes/routes';

type Props = FeedStackScreenProps<MainRoutes.LoginScreen>;

const LoginScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {

    const onPressLogin = () => {
      navigation.navigate(MainRoutes.HouseholdScreen);
    };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <TouchableOpacity
        onPress={onPressLogin}
        style={styles.loginButton}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "grey",
  },
  loginButton: {
    margin: 15,
    backgroundColor: "#D8D8D8",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    width: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "grey",
    fontSize: 16,
  },
});
