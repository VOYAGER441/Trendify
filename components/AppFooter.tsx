import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "@/constants";
import { useRouter, usePathname, RelativePathString } from "expo-router";

// Define a type for valid MaterialCommunityIcons names
type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

const AppFooter = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route path
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Define routes with strict typing for the icon property
  const routes: { key: string; title: string; icon: IconName; path: string }[] =
    [
      { key: "home", title: "Home", icon: "home", path: "/home" },
      { key: "category", title: "Category", icon: "grid", path: "/category" },
      {
        key: "profile",
        title: "Profile",
        icon: "human-greeting-variant",
        path: "/user",
      },
    ];

  useEffect(() => {
    // Update the selectedIndex based on the current route
    const currentRouteIndex = routes.findIndex(
      (route) => route.path === pathname
    );
    if (currentRouteIndex !== -1) {
      setSelectedIndex(currentRouteIndex);
    }
  }, [pathname]);

  const handleNavigation = (index: number) => {
    if (selectedIndex !== index) {
      router.push(routes[index].path as RelativePathString); // Navigate to the selected route
    }
  };

  return (
    <View style={styles.container}>
      {routes.map((route, index) => (
        <TouchableOpacity
          key={route.key}
          style={styles.button}
          onPress={() => handleNavigation(index)}
        >
          <MaterialCommunityIcons
            name={route.icon}
            size={24}
            color={selectedIndex === index ? COLORS.primary : "gray"}
          />
          <Text
            style={{
              color: selectedIndex === index ? COLORS.primary : "gray",
              fontSize: 12,
            }}
          >
            {route.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    borderRadius: 60,
    marginBottom: 20,
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  button: {
    alignItems: "center",
  },
});

export default AppFooter;
