import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import ItemSeparator from "../itemSeparator/itemSeparator.component";

interface fullMemberInfo {
  name: string;
  userId: string;
  emoji: number;
  isPaused: boolean;
  isOwner: boolean;
  AcceptedStatus: "accepted"|"pending"|"rejected";
}

interface Props {
  member: fullMemberInfo;
  onPress: () => void;
}

export default function HouseholdComponent(props: Props) {
  return (
    <View>
      <Pressable style={styles.title} onPress={props.onPress}>
        <Text style={styles.text}>{props.member.name}</Text>
      </Pressable>
      <ItemSeparator />
    </View>
  );
}
const styles = StyleSheet.create({

  text: {
    fontSize: 20,
    padding: 12,
  },
  title: {
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
  },
});
