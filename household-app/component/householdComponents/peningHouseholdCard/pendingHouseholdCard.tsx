import React, { useContext, useState } from "react";
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { List, Surface } from "react-native-paper";
import { household } from "../../../../Common/household";
import { snackbarContext } from "../../../context/snackBarContext";

interface Props {
    households: household[];
}

const PendingHouseHoldCard = (props: Props) => {
    const [expanded, setExpanded] = useState(false);
    const { setSnackbar } = useContext(snackbarContext);

    // const [memberModal, setMember] = useState<fullMemberInfo>();
    // const [isClickedTaskOpen, setIsClickedTaskOpen] = useState(false);

    const clickOnHousehold = () => {
        // setMember(member);
        // setIsClickedTaskOpen(true);
        setSnackbar("Väntar på medlemskap", true);
    };
    // const handleTaskClose = () => {
    //     setIsClickedTaskOpen(false);
    // };

    const handlePress = () => setExpanded(!expanded);
    // const onPressMember = () => {
    //     console.log("Få upp modalen för att redigera syssla och ta bort arkivering?");
    // };

    return (
        <View>
            <List.Section>
                <List.Accordion
                    title="Väntande ansökningar"
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
                                        onPress={() => clickOnHousehold()}
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

export default PendingHouseHoldCard;

const deviceWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
    item: {
        fontWeight: "bold",
        fontSize: 22,
    },
    listItem: {
        width: deviceWidth - 20,
        alignContent: "center",
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 6,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
    },
    title: {
        fontSize: 20,
    },
});
