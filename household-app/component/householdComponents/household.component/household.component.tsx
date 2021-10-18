import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import Household from "../../../../Common/Household";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
} from "react-native-paper";
import ItemSeparator from "../../itemSeparator/itemSeparator.component";

interface Props {
  household: Household;
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

    <View>
      <Pressable style={styles.title} onPress={props.onPress}>
        <Text style={styles.text}>{props.household.name}</Text>
      </Pressable>
      <ItemSeparator />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // display: "flex",
    // backgroundColor: "white",
    // flexDirection: "column",
    // alignItems: "center",
    // padding: 8,
  },
  text: {
    fontSize: 20,
    padding: 12,
  },
  item: {
    display: "flex",
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  title: {
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
  },
});
