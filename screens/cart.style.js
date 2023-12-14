import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    paddingTop: SIZES.xxLarge,
  },

  upperRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: SIZES.width - 44,
  },

  title: {
    fontFamily: "bold",
    marginLeft: 120,
    fontSize: SIZES.large,
    marginBottom: SIZES.medium,
  },

  cart: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.small,
    flexDirection: "row",
    padding: SIZES.medium,
    marginLeft: 9,
    borderRadius: SIZES.small,
    backgroundColor: "#fff",
    shadowOffset: SIZES.medium,
    shadowColor: COLORS.lightWhite,
    maxWidth: 400,
  },

  image: {
    minWidth: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },

  productImg: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: "cover",
  },
});

export default styles;
