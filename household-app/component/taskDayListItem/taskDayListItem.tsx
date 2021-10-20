import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";

interface Props {
  onPressDays: (event: any) => void;
  event: any;
}

const ListItem: React.FC<Props> = ({ onPressDays, event }) => {
  const [clickedId, setClickedId] = useState(-1);

  const handleClick = (event: any, id: any) => {
    setClickedId(id);
    console.log("button: " + id);
    onPressDays(event);
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={[
          { key: "1" },
          { key: "2" },
          { key: "3" },
          { key: "4" },
          { key: "5" },
          { key: "6" },
          { key: "7" },
          { key: "8" },
          { key: "9" },
          { key: "10" },
          { key: "11" },
          { key: "12" },
          { key: "13" },
          { key: "14" },
          { key: "15" },
          { key: "16" },
          { key: "17" },
          { key: "18" },
          { key: "19" },
          { key: "20" },
          { key: "21" },
          { key: "22" },
          { key: "23" },
          { key: "24" },
          { key: "25" },
          { key: "26" },
          { key: "27" },
          { key: "28" },
          { key: "29" },
          { key: "30" },
          { key: "31" },
        ]}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.key}
            event={event}
            onPress={() => handleClick(event, item.key)}
            style={styles.circleButton}
            {...(item.key === clickedId.toString()
              ? "circleButton active"
              : "circleButton")}
          >
            <Text style={styles.circleBtnText}>{item.key}</Text>
          </TouchableOpacity>
        )}
        extraData={clickedId}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  circleButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 100,
  },
  circleBtnText: {
    color: "black",
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
  sectionHeader: {
    fontWeight: "800",
    fontSize: 18,
    color: "#f4f4f4",
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    color: "rgba(255, 255, 255, 0.5)",
    marginTop: 5,
  },
});
