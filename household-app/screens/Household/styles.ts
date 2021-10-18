import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "grey",
  },
  logoutButton: {
    margin: 15,
    backgroundColor: "#D8D8D8",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    width: 100,
    alignItems: "center",
  },
  householdButton: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "45%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
    borderRadius: 20,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    height: 55
  },
  buttonText: {
    color: "grey",
    fontSize: 16,
  },
  householdButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  text: {
    color: "grey",
  },
  buttonsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default styles;
