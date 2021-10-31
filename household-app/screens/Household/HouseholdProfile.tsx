import React, { FC, useState } from "react";
import { Surface } from "react-native-paper";
import Button from "../../component/common/Button";
import ProfileModule from "../../component/profile/ProfileModule";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";

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
        <Surface>
            <Button text="Öppna" onPress={handleTaskOpen} iconType={{ type: "MaterialIcons", icons: "open-in-new" }} />
            <ProfileModule isOpen={isClickedTaskOpen} handleModalClose={handleTaskClose} />
        </Surface>
    );
};

export default HouseholdProfile;
