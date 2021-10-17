import React, { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput
} from "react-native";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";

type Props = FeedStackScreenProps<MainRoutes.LoginScreen>;

const LoginScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");


   const onPressLogin = () => {
     // thunk här!
     navigation.navigate(MainRoutes.HouseholdScreen);
   };

   const onChangeTextEmail = (email: string) => {
     setEmail(email.replace(/ /g, ""));
   };
  const onChangeTextPassword = (password: string) => setPassword(password);

  return (
      <View >
        <KeyboardAvoidingView
          style={{ flexGrow: 1, height: "80%" }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
        >
          <ScrollView
            contentContainerStyle={{ flex: 1 }}
            {...(Platform.OS === "ios"
              ? "keyboardDismissMode='interactive'"
              : null)}
            keyboardShouldPersistTaps={"handled"}
          >
            <View style={styles.container}>
              <Text style={styles.title}>Email:</Text>
              <TextInput
                keyboardType="email-address"
                style={styles.input}
                onChangeText={onChangeTextEmail}
                value={email}
              />
              <Text style={styles.title}>Password:</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                onChangeText={onChangeTextPassword}
                value={password}
              />
              <TouchableOpacity
                onPress={onPressLogin}
                style={styles.loginButton}
              >
                <Text style={styles.buttonText}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },
  itemGroup: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 16,
    marginTop: 16,
    color: "gray",
  },
  input: {
    width: 300,
    height: 40,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    margin: 8,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
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
});

