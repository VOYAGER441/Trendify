import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/constants";
import { Avatar } from "@rneui/themed";
import service from "@/service";
import * as Interface from "@/interface"
type Props = {
  setSearchQuery: (query: string) => void;
};
const [newsFeed, setNewsFeed] = useState<Interface.INewsResponse[]>([]);

const AppSearch = ({ setSearchQuery }: Props) => {
  const [search, setSearch] = useState("");

  const updateSearch = async (text: string) => {
    setSearch(text);
    setSearchQuery(text);

    const results = await service.apiService.searchByGNews(text);
    setSearchQuery(text); // Update parent state
    setNewsFeed(results); // Update global news feed state
  };

  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Search Here..."
        placeholderTextColor={COLORS.gray}
        onChangeText={updateSearch}
        value={search}
      />
    </View>
  );
};

export default AppSearch;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "black",
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
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
