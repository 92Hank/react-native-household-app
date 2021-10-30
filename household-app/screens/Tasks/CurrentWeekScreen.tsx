import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const CurrentWeekScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nuvarande vecka</Text>
        </View>
    );
};

export default CurrentWeekScreen;

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
