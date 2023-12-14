import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },

  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xxLarge,
    zIndex: 999,
    width: SIZES.width - 44,
  },

  image: {
    aspectRatio: 1,
    resizeMode: "contain",
    height: "100%",
  },

  detail: {
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },

  titleRow: {
    marginHorizontal: 20,
    marginBottom: 5,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
    top: 20,
  },

  title: {
    top: 10,
    marginHorizontal: 20,
    fontFamily: "bold",
    fontSize: SIZES.large,
  },

  productCategory: {
    fontFamily: "semibold",
    fontSize: SIZES.large,
    color: COLORS.gray,
  },

  productType: {
    fontFamily: "light",
    fontSize: SIZES.medium,
    color: COLORS.black,
  },

  priceWapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
  },

  price: {
    fontFamily: "semibold",
    fontSize: SIZES.large,
    paddingHorizontal: 10,
    paddingTop: 5,
  },

  ratingRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 10,
    top: 5,
  },

  choiceWapper: {
    top: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: SIZES.large,
    marginTop: -SIZES.medium,
  },

  sizeChoice: {
    width: 35,
    borderWidth: 1,
    marginEnd: SIZES.small - 3,
    paddingVertical: SIZES.xSmall - 3,
    backgroundColor: "#fff",
  },

  sizePickChoice: {
    backgroundColor: "#000",
  },

  quantityChoice: {
    marginHorizontal: SIZES.small,
  },

  descriptionWrapper: {
    marginTop: SIZES.large,
    marginHorizontal: SIZES.large,
  },

  description: {
    fontFamily: "medium",
    fontSize: SIZES.large - 2,
  },

  descText: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    textAlign: "justify",
    marginBottom: 3,
  },

  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    marginHorizontal: 12,
    marginBottom: 5,
    padding: 5,
    borderRadius: SIZES.large,
  },

  cartRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width,
  },

  cartBtn: {
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.black,
    padding: SIZES.small / 2,
    borderRadius: SIZES.large,
    marginLeft: 12,
  },

  cartTitle: {
    marginLeft: SIZES.small,
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
  },

  addToCart: {
    width: 37,
    height: 37,
    borderRadius: 50,
    margin: SIZES.small,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
