import { Formik } from "formik";
import React, { FC, useContext, useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import * as Yup from "yup";
import Button from "../../component/common/Button";
import { snackbarContext } from "../../context/snackBarContext";
import { useCreateUserMutation } from "../../Redux/Service/user/userApi";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import TextInput from "./textInput";

interface User {
    email: string;
    userName: string;
    password: string;
}

type PostSchemaType = Record<keyof User, Yup.AnySchema>;

const PostSchema = Yup.object().shape<PostSchemaType>({
    email: Yup.string().required("Email is required").email("Email is invalid").trim(),
    password: Yup.string().required().min(6, "Minimum 6 characters").trim(),
    userName: Yup.string().required().trim(),
});

type Props = FeedStackScreenProps<MainRoutes>;

const CreateAccountScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const { setSnackbar } = useContext(snackbarContext);

    const defaultUser: User = { userName: "", email: "", password: "" };
    const [
        CreateUser, // This is the mutation trigger

        { status, isSuccess, error, isLoading }, // This is the destructured mutation result
    ] = useCreateUserMutation();

    useEffect(() => {
        if (isSuccess) {
            setSnackbar("Du har skapat ett konto!", true);
            navigation.goBack();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            setSnackbar("Ett oväntat fel dök upp", true);
            console.log("error", error);
        }
    }, [error]);

    const handleSubmitForm = async (createAccountUser: User) => {
        CreateUser(createAccountUser);
        navigation.navigate(MainRoutes.LoginScreen);
    };

    return (
        <KeyboardAvoidingView
            style={{ flexGrow: 1, height: "100%" }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            enabled
        >
            <ScrollView
                {...(Platform.OS === "ios" ? "keyboardDismissMode='interactive'" : null)}
                keyboardShouldPersistTaps={"handled"}
            >
                <View style={styles.container}>
                    <Formik
                        initialValues={defaultUser}
                        onSubmit={handleSubmitForm}
                        validationSchema={PostSchema}
                        validateOnChange={false}
                    >
                        {({ errors, values, handleChange, handleSubmit }) => (
                            <>
                                <TextInput
                                    keyboardType="email-address"
                                    label="E-mail"
                                    style={styles.input}
                                    value={values.email}
                                    onChangeText={handleChange<keyof User>("email")}
                                    helperText={errors.email}
                                />
                                <TextInput
                                    label="Lösenord"
                                    style={styles.input}
                                    value={values.password}
                                    onChangeText={handleChange<keyof User>("password")}
                                    helperText={errors.password}
                                />
                                <TextInput
                                    label="Användarnamn"
                                    value={values.userName}
                                    style={styles.input}
                                    onChangeText={handleChange<keyof User>("userName")}
                                    helperText={errors.userName}
                                />
                                {!isLoading && (
                                    <Button
                                        iconType={{ type: "FontAwesome", icons: "user-plus" }}
                                        onPress={handleSubmit}
                                        text="Skapa konto"
                                    ></Button>
                                )}
                                <View style={{ marginTop: 10 }}>
                                    <ActivityIndicator animating={isLoading} color={Colors.tealA200} />
                                </View>
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100%",
    },
    buttonText: {
        color: "black",
        fontSize: 16,
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
    submitButton: {
        margin: 15,
        backgroundColor: "#D8D8D8",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 100,
        width: 150,
        alignItems: "center",
    },
    os: {
        display: "none",
    },
});
