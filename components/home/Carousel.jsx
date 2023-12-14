import { StyleSheet, Text, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../../constants";

const Carousel = () => {
  const slides = [
    "https://routine.vn/media/amasty/webp/banner/tmp/images/Winter_collection_2023_-_desktop_jpg.webp",
    "https://routine.vn/media/amasty/webp/banner/tmp/images/MAIN_KV-WEBSITE-01_2_jpg.webp",
    "https://routine.vn/media/amasty/webp/banner/tmp/images/Couple_Collection_Desktop_jpg.webp",
    "https://routine.vn/media/amasty/webp/wysiwyg/Blog/ao-so-mi-form-rong-duoc-thiet-ke-theo-kieu-dang-tre-trung-danh-cho-cac-co-nang-sanh-dieu_jpg.webp",
  ];
  return (
    <View style={styles.carouselContainer}>
      <SliderBox
        images={slides}
        dotColor={COLORS.primary}
        inactiveDotColor={COLORS.secondary}
        ImageComponentStyle={{ borderRadius: 15, width: "93%", marginTop: 15 }}
        autoplay
        circleLoop
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: "center",
  },
});
