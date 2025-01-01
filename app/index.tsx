import { COLORS, FONT, SIZES } from "@/constants"; // Ensure your color/font constants align with the design
import { useGlobalContext } from "@/context/GlobalProvider";
import service from "@/service";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, RelativePathString, router, Stack } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons


const Home = () => {
  const [activeTab, setActiveTab] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [username, setUsername] = useState(""); // New state for username in Register
  const { setUser, setIsLogged } = useGlobalContext();

  const handleLogin = async () => {
    // console.log("Logging in with:", email, password);
    if (!email || !password) {
      Alert.alert("Error", "Please fill up all fields");
    }
    if (password.length > 8) {
      Alert.alert(
        "Error",
        "Password must be between 8 and 265 characters long"
      );
    }

    try {
      const response = await service.appWrite.login(
        email,
        password,
       
      );
  
      const result = await service.appWrite.getCurrentUser();
      setUser(result);
      setIsLogged(true);


  
      // Navigate to the main screen
      router.replace('/main' as RelativePathString);
    } catch (error) {
      console.error(error);
  
      // Handle specific error messages
      if (error instanceof Error && error.message) {
        if (error.message.includes("Invalid credentials")) {
          Alert.alert("Login Error", "Invalid email or password. Please try again.");
        } else if (error.message.includes("User is not verified")) {
          Alert.alert(
            "Login Error",
            "Your email is not verified. Please check your inbox and verify your account."
          );
        } else {
          Alert.alert("Login Error", error.message);
        }
      } else {
        Alert.alert("Login Error", "An unknown error occurred.");
      }
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !username) {
      Alert.alert("Error", "Please fill up all fields");
      return;
    }
  
    if (password.length < 8 || password.length > 256) {
      Alert.alert("Error", "Password must be between 8 and 256 characters long");
      return;
    }
  
    let preferences = null;
  
    try {
      const response = await service.appWrite.createUser(
        email,
        password,
        username,
        preferences
      );
  
      // console.log(response);
      setUser(response);
      setIsLogged(true);

  
      // Navigate to the main screen
      router.replace(`/main` as RelativePathString);
    } catch (error) {
      console.error(error);
  
      // Extract the error message for the user
      if (error instanceof Error && error.message) {
        if (error.message.includes("same id, email, or phone already exists")) {
          Alert.alert(
            "Registration Error",
            "The email is already registered. Please use a different email."
          );
        } else if (error.message.includes("Invalid document structure")) {
          Alert.alert(
            "Registration Error",
            "Failed to save user details. Please try again."
          );
        } else {
          Alert.alert("Registration Error", error.message);
        }
      } else {
        Alert.alert("Registration Error", "An unknown error occurred.");
      }
    }
  };
  

  const handleTabSwitch = (tab: any) => setActiveTab(tab);

  const platforms = ["google", "facebook", "instagram", "linkedin"];
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) {
    return <Redirect href={{ pathname: "/main" }} />;
}

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
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.bannerBox}>
            <ImageBackground
              source={require("../assets/images/banner-removebg-preview.png")}
              style={styles.banner}
            />
          </View>
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
                  placeholderTextColor={COLORS.default}
                  value={email}
                  onChangeText={setEmail}
                />
                <View style={styles.passwordContainer}>
                  <TextInput
                    // style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={COLORS.default}
                    secureTextEntry={!showPasswordLogin}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <MaterialCommunityIcons
                    name={showPasswordLogin ? "eye-off" : "eye"}
                    size={24}
                    color="#aaa"
                    style={styles.icon}
                    onPress={() => setShowPasswordLogin(!showPasswordLogin)}
                  />
                </View>
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
                  placeholderTextColor={COLORS.default}
                  value={email}
                  onChangeText={setEmail}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor={COLORS.default}
                  value={username}
                  onChangeText={setUsername}
                />
                <View style={styles.passwordContainer}>
                  <TextInput
                    // style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={COLORS.default}
                    secureTextEntry={!showPasswordRegister}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <MaterialCommunityIcons
                    name={showPasswordRegister ? "eye-off" : "eye"}
                    size={24}
                    color="#aaa"
                    style={styles.icon}
                    onPress={() =>
                      setShowPasswordRegister(!showPasswordRegister)
                    }
                  />
                </View>
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
    alignItems: "center",
    justifyContent: "center", 
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.default,
    borderRadius: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "100%",
  },
  icon: {
    position: "absolute", // Make it position-relative to the container
    right: 10, // Adjust the distance from the right edge
    top: "50%", // Vertically center it within the container
    transform: [{ translateY: -12 }], // Offset for proper centering
  },

  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  bannerBox: {
    width: "100%",
    alignItems: "center",
    justifyContent:"center", // Center the banner horizontally
    marginBottom: 20, // Add space below the banner
  },
  banner: {
    width: "100%", // Ensure the banner spans the full width
    height: 100, // Set an appropriate height
    resizeMode: 'cover', // Keep the aspect ratio
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 20,
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
    color: COLORS.default,
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
    color: COLORS.default,
    marginHorizontal: 10,
  },
  activeTabText: {
    color: COLORS.secondary,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.secondary,
  },
  input: {
    borderWidth: 1,
    // borderColor: COLORS.default,
    borderRadius: 40,
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
    borderColor: COLORS.default,
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
    color: COLORS.default,
  },
  forgotText: {
    color: COLORS.secondary,
  },
  loginButton: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 40,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#e64777", // Shadow color
    shadowOffset: { width: 0, height: 0 }, // No offset, shadow is centered
    shadowOpacity: 0.9, // Intensity of the shadow
    shadowRadius: 53, // Blur radius, replicates the spread effect
    elevation: 9,
  },
  loginButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  orText: {
    color: COLORS.default,
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
    color: COLORS.default,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});

export default Home;


