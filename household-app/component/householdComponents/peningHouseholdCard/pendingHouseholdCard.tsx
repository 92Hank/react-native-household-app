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

    const clickOnHousehold = () => {
        setSnackbar("Väntar på medlemskap", true);
    };

    const handlePress = () => setExpanded(!expanded);
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
        backgroundColor: "#ADD8E6",
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
