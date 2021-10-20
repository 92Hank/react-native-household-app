import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container:  {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  circleButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#f2f2f2",
    margin: 4,
  },
  circleBtnText: {
    color: "black",
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
  },
  active: {
    backgroundColor: "gray",
    borderRadius: 1.5,
  },
});

export default styles;