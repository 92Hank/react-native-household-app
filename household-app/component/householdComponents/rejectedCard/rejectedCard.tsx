import React, { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { List, Surface } from "react-native-paper";
import { household } from "../../../../Common/household";
import { snackbarContext } from "../../../context/snackBarContext";
import { selectCurrentLoginUser } from "../../../Redux/features/loginUser/LoginSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import { useLeaveHouseholdMutation } from "../../../Redux/Service/household/householdApi";

interface Props {
    households: household[];
}

const RejectedCard = (props: Props) => {
    const [expanded, setExpanded] = useState(false);
    const { setSnackbar } = useContext(snackbarContext);
    const [removeUser, { isSuccess, error }] = useLeaveHouseholdMutation();
    const user = useAppSelector(selectCurrentLoginUser);

    useEffect(() => {
        if (isSuccess) {
            setSnackbar("Du blev inte accepterad, du kanske skrev in fel kod?", true);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            console.log(error);
            setSnackbar("ett oväntat fel dök upp", true);
        }
    }, [error]);

    const clickOnHousehold = (item: household) => {
        removeUser({ houseHoldId: item.id, userId: user?.id as string });
    };

    const handlePress = () => setExpanded(!expanded);
    return (
        <View>
            <List.Section>
                <List.Accordion
                    title="Avslagna ansökningar"
                    expanded={expanded}
                    onPress={handlePress}
                    titleStyle={styles.title}
                >
                    <FlatList
                        data={props.households}
                        keyExtractor={(item: household) => item.id}
                        renderItem={({ item }) => (
                            <Surface style={styles.listItem}>
                                <TouchableOpacity>
                                    {/* Falskt felmeddelande */}
                                    <List.Item
                                        titleStyle={styles.item}
                                        title={item.name}
                                        onPress={() => clickOnHousehold(item)}
                                    />
                                </TouchableOpacity>
                            </Surface>
                        )}
                    />
                </List.Accordion>
            </List.Section>
        </View>
    );
};

export default RejectedCard;
const deviceWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
    item: {
        fontWeight: "bold",
        fontSize: 22,
    },
    listItem: {
        backgroundColor: "#FFB6C1",
        width: deviceWidth - 20,
        alignContent: "center",
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 6,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
    title: {
        fontSize: 20,
    },
});
