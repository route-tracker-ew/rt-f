// globalStyles.js

import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  centerConatiner: {
    justifyContent: "center",
    alignItems: "center",
  },

  infoContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 150,
    width: 350,
    borderRadius: 10,
    backgroundColor: "white",
  },
  createNewContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "90%",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  intoMapConatiner: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  infoHead: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    marginTop: 5,
    paddingHorizontal: 8,
  },
  infoTitle: {
    marginLeft: 20,
  },

  infoID: {
    fontSize: 20,
    fontWeight: "600",
  },
  ipic: {
    width: 30,
    height: 30,
  },
  itxt: {
    marginTop: 5,
    fontSize: 12,
  },
  swipeableContainer: {
    borderRadius: 10,
  },
  deleteButton: {
    borderRadius: 10,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "100%",
  },
  deleteText: {
    color: "white",
  },
  input: {
    width: 350,
    height: 40,
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    marginTop: 4,
  },

  createButton: {
    width: 350,
    height: 40,
    backgroundColor: "black",
    marginTop: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  createButtonTxt: {
    color: "white",
  },
  dropdownContainer: {
    width: "100%",
  },
});
