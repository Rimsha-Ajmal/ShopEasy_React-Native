import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import { Button, Divider } from "react-native-elements";
import { useThemeContext } from "../context/ThemeContext";
import { toggleWishlistItem, getWishlist } from "../utils/storage";
import ReviewForm from "../components/ReviewForm";
import { useFocusEffect } from "@react-navigation/native";

import { fetchReviewsByProductId } from "../data/api";

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const { theme } = useThemeContext();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  useFocusEffect(
    useCallback(() => {
      checkWishlist();
      loadReviews();
    }, [product])
  );

  const checkWishlist = async () => {
    const list = await getWishlist();
    const exists = list.some((item) => item.id === product.id);
    setIsWishlisted(exists);
  };

  const loadReviews = async () => {
    setLoadingReviews(true);
    try {
      const response = await fetchReviewsByProductId(product.id);
      setReviews(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setReviews([]);
      } else {
        console.error("Failed to fetch reviews:", error);
        setReviews([]);
      }
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleWishlistToggle = async () => {
    await toggleWishlistItem(product);
    checkWishlist();
    Alert.alert(
      "Wishlist Updated",
      isWishlisted ? "Removed from Wishlist" : "Saved to Wishlist"
    );
  };

  const renderReview = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Text
        style={[styles.reviewRating, theme === "dark" && { color: "#ffd700" }]}
      >
        ⭐ {item.rating} out of 5
      </Text>
      <Text
        style={[styles.reviewComment, theme === "dark" && { color: "#ccc" }]}
      >
        "{item.comment}"
      </Text>
      <Divider style={{ marginVertical: 5 }} />
    </View>
  );

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#121212" : "#fff" },
      ]}
    >
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={[styles.name, theme === "dark" && { color: "#fff" }]}>
          {product.name}
        </Text>
        <Text style={[styles.price, theme === "dark" && { color: "#ccc" }]}>
          ${product.price}
        </Text>
        <Text style={[styles.desc, theme === "dark" && { color: "#aaa" }]}>
          {product.description}
        </Text>

        <Button
          title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
          onPress={handleWishlistToggle}
          buttonStyle={{ marginVertical: 10 }}
        />

        <Divider style={{ marginVertical: 10 }} />

        <ReviewForm productId={product.id} onReviewAdded={loadReviews} />

        <Divider style={{ marginVertical: 10 }} />

        <Text
          style={[styles.reviewsTitle, theme === "dark" && { color: "#fff" }]}
        >
          Customer Feedback ({reviews.length})
        </Text>

        {loadingReviews ? (
          <Text style={{ color: theme === "dark" ? "#ccc" : "#555" }}>
            Retrieving reviews...
          </Text>
        ) : reviews.length === 0 ? (
          <Text style={{ color: theme === "dark" ? "#ccc" : "#555" }}>
            No reviews available yet.
          </Text>
        ) : (
          <FlatList
            data={reviews}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderReview}
            scrollEnabled={false}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f2f2f2",
  },
  image: {
    width: "100%",
    height: 260,
    borderRadius: 16,
    marginTop: 12,
    resizeMode: "cover",
    backgroundColor: "#eee",
  },
  info: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#222",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4e94f3",
    marginBottom: 10,
  },
  desc: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 10,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  reviewContainer: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  reviewRating: {
    fontWeight: "600",
    fontSize: 15,
    color: "#ff8c00",
    marginBottom: 4,
  },
  reviewComment: {
    fontStyle: "italic",
    fontSize: 14,
    color: "#666",
  },
});

export default ProductDetailScreen;
