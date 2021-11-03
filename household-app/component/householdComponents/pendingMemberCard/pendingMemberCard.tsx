import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { List, Surface } from "react-native-paper";
import { fullMemberInfo } from "../../../../Common/household";
import ChangeMemberStatusModal from "../changeMemberStatusModal/changeMemberStatusModal";

interface Props {
    pendingMember: fullMemberInfo[];
}

const PendingMemberTaskCard = (props: Props) => {
    const [expanded, setExpanded] = useState(false);
    const [memberModal, setMember] = useState<fullMemberInfo>();
    const [isClickedTaskOpen, setIsClickedTaskOpen] = useState(false);

    const clickOnMember = (member: fullMemberInfo) => {
        setMember(member);
        setIsClickedTaskOpen(true);
    };
    const handleTaskClose = () => {
        setIsClickedTaskOpen(false);
    };

    const handlePress = () => setExpanded(!expanded);
    return (
        <View>
            <List.Section>
                <List.Accordion title="Ansökningar" expanded={expanded} onPress={handlePress} titleStyle={styles.title}>
                    <FlatList
                        data={props.pendingMember}
                        keyExtractor={(item: fullMemberInfo) => item.userId}
                        renderItem={({ item }) => (
                            <Surface style={styles.listItem}>
                                <TouchableOpacity>
                                    {/* Falskt felmeddelande */}
                                    <List.Item
                                        titleStyle={styles.item}
                                        title={item.name}
                                        onPress={() => clickOnMember(item)}
                                    />
                                </TouchableOpacity>
                            </Surface>
                        )}
                    />
                </List.Accordion>
            </List.Section>
            <View>
                <ChangeMemberStatusModal
                    isOpen={isClickedTaskOpen}
                    handleModalClose={handleTaskClose}
                    member={memberModal as fullMemberInfo}
                />
            </View>
        </View>
    );
};

export default PendingMemberTaskCard;
const deviceWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
    item: {
        fontWeight: "bold",
        fontSize: 18,
    },
    listItem: {
        width: deviceWidth - 20,
        backgroundColor: "#ADD8E6",
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
        fontSize: 18,
    },
});
