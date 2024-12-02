import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Linking,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Stack } from "expo-router";
import { SIZES, COLORS, FONT } from "@/constants"; // Ensure your color/font constants align with the design
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons

const Home = () => {
  const [activeTab, setActiveTab] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [username, setUsername] = useState(""); // New state for username in Register

  const handleLogin = () => {
    console.log("Logging in with:", email, password);
    // Add your login logic here
  };

  const handleRegister = () => {
    console.log("Registering with:", email, username, password);
    // Add your registration logic here
  };

  const handleTabSwitch = (tab: any) => setActiveTab(tab);

  const platforms = ["google", "facebook", "instagram", "linkedin"];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerTitle: "",
          headerTransparent: true,
        }}
      />

      <ImageBackground
        source={require("../assets/images/loginback.png")}
        style={styles.backgroundImage}
      >
        <View>
          <Text>Trendify</Text>
          
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            {/* Header Section */}
            <Text style={styles.headerText}>{activeTab}</Text>
            <Text style={styles.agreementText}>
              By signing {activeTab === "Login" ? "in" : "up"} you are agreeing
              to our{" "}
              <Text
                style={styles.linkText}
                onPress={() => Linking.openURL("https://www.example.com")}
              >
                Terms and Privacy Policy
              </Text>
            </Text>

            {/* Tab Switch */}
            <View style={styles.tabContainer}>
              {["Login", "Register"].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => handleTabSwitch(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab && styles.activeTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Form Section */}
            {activeTab === "Login" ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor={COLORS.gray}
                  value={email}
                  onChangeText={setEmail}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={COLORS.gray}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <View style={styles.rememberForgotContainer}>
                  <View style={[styles.rememberContainer, { marginRight: 20 }]}>
                    <TouchableOpacity
                      onPress={() => setRememberPassword(!rememberPassword)}
                      style={styles.checkbox}
                    >
                      {rememberPassword && (
                        <View style={styles.checkboxInner} />
                      )}
                    </TouchableOpacity>
                    <Text style={styles.rememberText}>Remember password</Text>
                  </View>
                  <TouchableOpacity>
                    <Text style={styles.forgotText}>Forgot password</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor={COLORS.gray}
                  value={email}
                  onChangeText={setEmail}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor={COLORS.gray}
                  value={username}
                  onChangeText={setUsername}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={COLORS.gray}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleRegister}
                >
                  <Text style={styles.loginButtonText}>Register</Text>
                </TouchableOpacity>
              </>
            )}

            {/* Social Login Section */}
            <Text style={styles.orText}>or connect with</Text>
            <View style={styles.socialButtonsContainer}>
              {platforms.map((platform) => (
                <TouchableOpacity key={platform} style={styles.socialButton}>
                  <Icon
                    name={platform}
                    size={24}
                    color="#fff"
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.optional,
    borderRadius: 20,
    padding: 20,
    width: "90%",
    alignItems: "center",
  },
  headerText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: "black",
    marginBottom: 10,
  },
  agreementText: {
    textAlign: "center",
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginBottom: 20,
  },
  linkText: {
    color: COLORS.secondary,
    textDecorationLine: "underline",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tabText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginHorizontal: 10,
  },
  activeTabText: {
    color: COLORS.secondary,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.secondary,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.tertiary,
    borderRadius: 10,
    padding: 10,
    width: "100%",
    marginBottom: 10,
    color: "black",
  },
  rememberForgotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.gray,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  checkboxInner: {
    width: 14,
    height: 14,
    backgroundColor: COLORS.secondary,
  },
  rememberText: {
    color: COLORS.gray,
  },
  forgotText: {
    color: COLORS.secondary,
  },
  loginButton: {
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  orText: {
    color: COLORS.gray,
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  socialButton: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.tertiary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  socialIcon: {
    fontSize: SIZES.large,
    color: COLORS.gray,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});

export default Home;
