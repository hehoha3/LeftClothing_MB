import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "bold",
    fontSize: 40,
  },

  appBarWrapper: {
    marginHorizontal: 22,
    marginTop: SIZES.small,
  },

  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  location: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
});

export default styles;
