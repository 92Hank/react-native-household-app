import React, { FC, useContext, useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { ActivityIndicator, Colors, useTheme } from "react-native-paper";
import Button from "../../component/common/Button";
import SnackbarComponent from "../../component/snackbar/snackbarComponent";
import { snackbarContext } from "../../context/snackBarContext";
import { selectCurrentLoginUser } from "../../Redux/features/loginUser/LoginSelectors";
import { LoginAsync } from "../../Redux/features/loginUser/loginUserSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";

type Props = FeedStackScreenProps<MainRoutes.LoginScreen>;

const LoginScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const [email, setEmail] = useState<string>("foo@foo.com");
    const [password, setPassword] = useState<string>("foobar");
    const { setSnackbar, isVisible, message } = useContext(snackbarContext);

    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentLoginUser);
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        if (user) {
            setSnackbar("inloggning lyckas för :" + user.userName, true);
            navigation.navigate(MainRoutes.HouseholdScreen);
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [user]);

    const onPressLogin = () => {
        setIsLoading(true);

        dispatch(LoginAsync({ email, password })).then((s) => {
            if (s.type === "loginUser/LoginAsync/fulfilled") {
            }
            if (s.type === "loginUser/LoginAsync/rejected") {
                setSnackbar("Mail eller lösenord fel...", true);
                setIsLoading(false);
            }
        });
    };

    const onChangeTextEmail = (email: string) => {
        setEmail(email.replace(/ /g, ""));
    };
    const onChangeTextPassword = (password: string) => setPassword(password);

    return (
        <View>
            <KeyboardAvoidingView
                style={{ flexGrow: 1, height: "100%" }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                enabled
            >
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    {...(Platform.OS === "ios" ? "keyboardDismissMode='interactive'" : null)}
                    keyboardShouldPersistTaps={"handled"}
                >
                    <View style={styles.container}>
                        <SnackbarComponent isVisible={isVisible} message={message} />
                        {theme.dark ? (
                            <Image source={require("../../assets/logotypeWhite/logoWL.png")} style={styles.logo} />
                        ) : (
                            <Image source={require("../../assets/logotypeBlack/logoBL.png")} style={styles.logo} />
                        )}

                        <Text style={styles.title}>E-mail:</Text>
                        <TextInput
                            keyboardType="email-address"
                            style={styles.input}
                            onChangeText={onChangeTextEmail}
                            value={email}
                        />
                        <Text style={styles.title}>Lösenord:</Text>
                        <TextInput
                            secureTextEntry={true}
                            style={styles.input}
                            onChangeText={onChangeTextPassword}
                            value={password}
                        />
                        {!isLoading ? (
                            <Button
                                iconType={{ type: "MaterialIcons", icons: "login" }}
                                onPress={onPressLogin}
                                text="Logga in"
                            ></Button>
                        ) : (
                            <View style={{ marginTop: 20, marginBottom: 25 }}>
                                <ActivityIndicator animating={isLoading} color={Colors.tealA200} />
                            </View>
                        )}
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
    logo: {
        marginTop: 30,
        width: 300,
        height: 200,
        resizeMode: "contain",
    },
});
