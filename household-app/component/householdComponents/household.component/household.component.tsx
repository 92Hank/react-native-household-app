import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Surface } from "react-native-paper";
import { household } from "../../../../Common/household";

interface Props {
    household: household;
    onPress: () => void;
}

export default function HouseholdComponent(props: Props) {
    return (
        // <View style = {styles.container}>
        //   <List.Item style = {styles.item}
        //     title= {props.household.name}
        //     onPress ={props.onPress}
        //     // description={props.household.name}
        //     left={(props) => <List.Icon {...props} icon="home" />}
        //   >
        //   {/* <Pressable onPress={props.onPress}>
        //     <View>
        //       <Text>{props.household.name}</Text>
        //       <Text>{props.household.JoinCode}</Text>
        //     </View>
        //   </Pressable> */}
        //   </List.Item>
        // </View>

        <TouchableOpacity onPress={props.onPress}>
            <Surface style={styles.container}>
                <View>
                    <Text style={styles.title}>{props.household.name}</Text>
                </View>
            </Surface>
        </TouchableOpacity>
    );
}
const deviceWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
    container: {
        width: deviceWidth - 20,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
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
        fontWeight: "bold",
        fontSize: 22,
        marginHorizontal: 15,
        marginVertical: 12,
    },
});
