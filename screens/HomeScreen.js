import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import { fetchProducts } from "../data/api";
import ProductCard from "../components/ProductCard";
import SearchFilter from "../components/SearchFilter";
import { useThemeContext } from "../context/ThemeContext";
import { getWishlist, toggleWishlistItem } from "../utils/storage";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const { theme } = useThemeContext();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [wishlistItems, setWishlistItems] = useState([]); 

  useEffect(() => {
    loadProducts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadWishlist();
    }, [])
  );

  const loadProducts = async () => {
    try {
      const res = await fetchProducts();
      setProducts(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Error loading products", err);
    } finally {
      setLoading(false);
    }
  };

  const loadWishlist = async () => {
    const list = await getWishlist();
    setWishlistItems(list);
  };

  const handleWishlistToggle = async (product) => {
    const updated = await toggleWishlistItem(product);
    setWishlistItems(updated);
  };

  const isProductInWishlist = (product) => {
    return wishlistItems.some((item) => item.id === product.id);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme === "dark" ? "#0d0d0d" : "#f9f9f9",
        },
      ]}
    >
      <Text
        style={[
          styles.heading,
          { color: theme === "dark" ? "#fff" : "#222" },
        ]}
      >
        Discover Products
      </Text>

      <SearchFilter
        searchText={searchText}
        setSearchText={setSearchText}
        products={products}
        setFilteredProducts={setFiltered}
      />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#00b894" />
          <Text style={styles.loaderText}>Loading products...</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ProductCard
                product={item}
                onPress={() =>
                  navigation.navigate("ProductDetail", { product: item })
                }
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#777",
  },
  cardWrapper: {
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
