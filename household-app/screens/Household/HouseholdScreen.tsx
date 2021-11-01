/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FontAwesome5 } from "@expo/vector-icons";
import React, { FC, useContext, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { household } from "../../../Common/household";
import Button from "../../component/common/Button";
import AddHouseholdModal from "../../component/householdComponents/addHouseholdModal/addHouseholdModal.component";
import HouseholdComponent from "../../component/householdComponents/household.component/household.component";
import JoinHouseholdModal from "../../component/householdComponents/joinHouseholdModal/joinHouseholdModal.component";
import PendingHouseHoldCard from "../../component/householdComponents/peningHouseholdCard/pendingHouseholdCard";
import RejectedCard from "../../component/householdComponents/rejectedCard/rejectedCard";
import SnackbarComponent from "../../component/snackbar/snackbarComponent";
import { snackbarContext } from "../../context/snackBarContext";
import { selectCurrentLoginUser } from "../../Redux/features/loginUser/LoginSelectors";
import { logout } from "../../Redux/features/loginUser/loginUserSlice";
// import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { setSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { useLazyGetHouseholdByUserIdQuery } from "../../Redux/Service/household/householdApi";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import styles from "./styles";

type Props = FeedStackScreenProps<MainRoutes.HouseholdScreen>;

const HouseholdScreen: FC<Props> = ({ navigation, route }: Props): React.ReactElement => {
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const [joinModalIsOpen, setJoinModalIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentLoginUser);
    const { isVisible, message, setSnackbar } = useContext(snackbarContext);
    const [userHouseholds, setHouseholds] = useState<household[]>();
    const [userRejectedHouseholds, setRejectedHouseholds] = useState<household[]>();
    const [userPendingHouseholds, setPendingHouseholds] = useState<household[]>();
    const { colors } = useTheme();

    // const currentHousehold = useAppSelector(selectSelectedHousehold);
    const [loadData, result] = useLazyGetHouseholdByUserIdQuery();
    const { data } = result;

    useEffect(() => {
        if (!user) return;
        loadData(user.id!);
    }, []);

    if (!user) {
        navigation.navigate(MainRoutes.LoginScreen);
        return <View></View>;
    }
    const clickOnHousehold = (item: household) => {
        let rights = true;
        item.member.forEach((m) => {
            if (m.userId === user.id && m.AcceptedStatus === "pending") {
                rights = false;
            }
        });
        dispatch(setSelectedHousehold(item));
        if (!rights) {
            setSnackbar("Du har inte rättigheter att se detta hushåll än", true);
        } else {
            navigation.navigate(MainRoutes.TasksScreen);
        }
    };

    const onPressLogout = () => {
        dispatch(logout());
        navigation.navigate(MainRoutes.LoginScreen);
    };

    const onPressCreateHousehold = () => {
        setCreateModalIsOpen(true);
    };

    const onPressJoinHousehold = () => {
        setJoinModalIsOpen(true);
    };
    const handleCreateModalClose = () => {
        setCreateModalIsOpen(false);
    };
    const handleJoinModalClose = () => {
        setJoinModalIsOpen(false);
    };

    // const onPressUsersInHousehold = () => {
    //     navigation.navigate(MainRoutes.UsersInHouseHoldScreen);
    // };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={onPressLogout}
                    // style={styles.householdButton}
                >
                    <FontAwesome5 name="sign-out-alt" size={24} color={colors.whiteBlackToggle} />
                    {/* <Text style={styles.householdButtonText}>Medlemmar</Text> */}
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        if (data) {
            console.log("data", data);
            const accepted: household[] = [];
            data.forEach((h) => {
                h.member.forEach((m) => {
                    if (m.AcceptedStatus === "accepted" && m.userId === user.id) {
                        accepted.push(h);
                    }
                });
            });

            setHouseholds(accepted);

            const rej: household[] = [];
            data.forEach((h) => {
                h.member.forEach((m) => {
                    if (m.AcceptedStatus === "rejected" && m.userId === user.id) {
                        rej.push(h);
                    }
                });
            });

            setRejectedHouseholds(rej);

            const pend: household[] = [];
            data.forEach((h) => {
                h.member.forEach((m) => {
                    if (m.AcceptedStatus === "pending" && m.userId === user.id) {
                        pend.push(h);
                    }
                });
            });

            setPendingHouseholds(pend);
        }
    }, [result.data]);

    return (
        <>
            <View style={styles.container}>
                <SnackbarComponent isVisible={isVisible} message={message} />
                <View>
                    <View style={styles.listContainer}>
                        <FlatList
                            data={userHouseholds}
                            keyExtractor={(item: any) => item.id}
                            renderItem={({ item }) => (
                                <>
                                    <HouseholdComponent
                                        key={item.id}
                                        household={item}
                                        onPress={() => clickOnHousehold(item)}
                                    />
                                </>
                            )}
                        />
                        {userRejectedHouseholds?.length! >= 1 && (
                            <RejectedCard households={userRejectedHouseholds as household[]} />
                        )}
                        {userPendingHouseholds?.length! >= 1 && (
                            <PendingHouseHoldCard households={userPendingHouseholds as household[]} />
                        )}
                    </View>
                </View>
                <AddHouseholdModal
                    isOpen={createModalIsOpen}
                    handleModalClose={handleCreateModalClose}
                    navigation={navigation}
                    route={route}
                />
                <JoinHouseholdModal
                    isOpen={joinModalIsOpen}
                    handleModalClose={handleJoinModalClose}
                    navigation={navigation}
                    route={route}
                />
                <View style={styles.buttonsContainer}>
                    <Button
                        iconType={{ type: "MaterialIcons", icons: "add-circle-outline" }}
                        onPress={onPressCreateHousehold}
                        text="Nytt hushåll"
                    ></Button>
                    {/* <TouchableOpacity onPress={onPressCreateHousehold} style={styles.householdButton}>
                        <MaterialIcons name="add-circle-outline" size={30} color="black" />
                        <Text style={styles.householdButtonText}>Nytt hushåll</Text>
                    </TouchableOpacity> */}
                    <Button
                        iconType={{ type: "MaterialCommunityIcons", icons: "home-circle-outline" }}
                        onPress={onPressJoinHousehold}
                        text="Gå med"
                    ></Button>
                    {/* <TouchableOpacity onPress={onPressJoinHousehold} style={styles.householdButton}>
                        <MaterialCommunityIcons name="home-circle-outline" size={30} color="black" />
                        <Text style={styles.householdButtonText}>Gå med</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </>
    );
};

export default HouseholdScreen;
