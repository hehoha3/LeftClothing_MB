import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.small,
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#fff",
    // ...SHADOWS.medium,
    shadowOffset: SIZES.medium,
    shadowColor: COLORS.lightWhite,
  },

  image: {
    width: 70,
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

  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },

  productName: {
    fontSize: SIZES.medium,
    fontFamily: "bold",
    color: COLORS.primary,
  },

  productCategory: {
    fontSize: SIZES.small + 2,
    fontFamily: "regular",
    color: COLORS.gray,
    marginTop: 3,
  },

  productPrice: {
    fontSize: SIZES.small + 2,
    fontFamily: "regular",
    color: COLORS.black,
    marginTop: 3,
  },
});

export default styles;
