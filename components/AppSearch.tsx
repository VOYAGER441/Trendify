import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/constants";
import { SearchBar, Avatar } from "@rneui/themed";

type Props = {};

const AppSearch = (props: Props) => {
  const [search, setSearch] = useState("");

  const updateSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <View style={styles.headerContainer}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        inputStyle={{ color: "black" }}
      />
      <Avatar
        rounded
        title="MD"
        size={40}
        containerStyle={styles.avatarContainer}
        titleStyle={styles.avatarTitle}
        overlayContainerStyle={styles.avatarOverlay}
      />
    </View>
  );
};

export default AppSearch;

const styles = StyleSheet.create({
  searchInputContainer: {
    backgroundColor: 'white',
    borderRadius: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchContainer: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  avatarContainer: {
    marginRight: 10,
    backgroundColor: COLORS.gray,
    padding: 2,
  },
  avatarTitle: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  avatarOverlay: {
    backgroundColor: COLORS.lightWhite,
  },
});
