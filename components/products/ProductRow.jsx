import { FlatList, Text } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";
import { View } from "react-native";
import styles from "./productRow.style";
import useFetch from "../../hook/useFetch";
import { ActivityIndicator } from "react-native";
import ProductCardView from "./ProductCardView";

const ProductRow = () => {
  const { data, isLoading, error } = useFetch();
  // const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const products = data.sort(() => Math.random() - 0.5);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xLarge} color={COLORS.primary} />
      ) : error ? (
        <Text>{JSON.stringify(error)}</Text>
      ) : (
        <FlatList
          data={products.slice(0, 8)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCardView item={item} />}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.xSmall }}
        />
      )}
    </View>
  );
};

export default ProductRow;
