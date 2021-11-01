import React, { FC, useState } from "react";
import { Surface } from "react-native-paper";
import Button from "../../component/common/Button";
import ProfileModule from "../../component/profile/ProfileModule";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const HouseholdProfile: FC<Props> = (): React.ReactElement => {
    const [isClickedTaskOpen, setIsClickedTaskOpen] = useState(false);
    const handleTaskClose = () => {
        setIsClickedTaskOpen(false);
    };
    const handleTaskOpen = () => {
        setIsClickedTaskOpen(true);
    };

    return (
        <Surface style={styles.profileSurface}>
            <Button text="Robin" onPress={handleTaskOpen} 
            iconType={{ type: "MaterialIcons", icons: "open-in-new" }} 
            buttonStyle={styles.button} />
            <ProfileModule isOpen={isClickedTaskOpen} handleModalClose={handleTaskClose} />
        </Surface>
    );
};

const styles = StyleSheet.create({
    profileSurface: {
        fontSize: 45,
        flexWrap: "wrap",
        flex: 1,
    },
    button: {
        marginVertical: 16, 
        width: "95%",
    },
});

export default HouseholdProfile;
