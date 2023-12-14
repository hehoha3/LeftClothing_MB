import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./products.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { ProductList } from "../components";

const Products = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 5 }}
          >
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>

          <Text style={styles.heading}>Toàn Bộ Sản Phẩm</Text>
        </View>

        <ProductList />
      </View>
    </SafeAreaView>
  );
};

export default Products;
