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
    margin: 15,
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 100,
    width: 140,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
  },
  buttonText: {
    color: "grey",
    fontSize: 16,
  },
  householdButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },
  text: {
    color: "grey",
  },
  button: {
    margin: 15,
    backgroundColor: "#D8D8D8",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    width: 100,
    alignItems: "center",
  },
  preference: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom:0,
    left:0,
    right: 0,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
  },
});

export default styles;
