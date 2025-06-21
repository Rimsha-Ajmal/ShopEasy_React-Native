import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import WishlistScreen from "./screens/WishlistScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";
import { Icon } from "react-native-elements";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Home Stack
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: "ShopEasy" }}
    />
    <Stack.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
      options={{ title: "Product Detail" }}
    />
  </Stack.Navigator>
);

// Wishlist Stack
const WishlistStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Wishlist"
      component={WishlistScreen}
      options={{ title: "Your Wishlist" }}
    />
    <Stack.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
      options={{ title: "Product Detail" }}
    />
  </Stack.Navigator>
);

// Settings Stack (optional: in case you want to add more settings screens later)
const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ title: "Settings" }}
    />
  </Stack.Navigator>
);

// Tab Icon Renderer
const TabIcon = ({ name, color }) => (
  <Icon name={name} type="material" color={color} />
);

// Bottom Tabs
const Tabs = () => {
  const { theme } = useThemeContext();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme === "dark" ? "#121212" : "#fff",
        },
        tabBarActiveTintColor: "#007aff",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Shop"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="store" color={color} />,
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistStack}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="favorite" color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="settings" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

// App Root
export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}
