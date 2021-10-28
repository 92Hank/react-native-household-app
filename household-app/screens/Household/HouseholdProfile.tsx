import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import ToggleDarkThemeSwitch from "../../component/common/ToggleDarkThemeSwitch";
import EmojiSelector from "../../component/common/EmojiSelector";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../Redux/hooks";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const HouseholdProfile: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const household = useAppSelector(selectSelectedHousehold);
    if (!household) return <></>;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>hushåll</Text>
            {/*eslint-disable-next-line @typescript-eslint/no-empty-function*/}
            <EmojiSelector
                Household={household!}
                avatarSelect={(selected) => {
                    console.log(selected);
                }}
                selected={0}
            ></EmojiSelector>

            <Text style={styles.text}>Global</Text>
            <ToggleDarkThemeSwitch />
        </View>
    );
};

export default HouseholdProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "grey",
    },
    card: {
        flexDirection: "row",
        shadowOffset: { width: 5, height: 5 },
        width: "90%",
        borderRadius: 12,
        alignSelf: "center",
        marginTop: 5,
        marginBottom: 5,
    },
    householdButton: {
        margin: 15,
        backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 100,
        width: 140,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
    },
    householdButtonText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
    },
    buttonsContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "flex-end",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: 20,
        marginRight: 10,
        marginLeft: 10,
    },
    preference: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
