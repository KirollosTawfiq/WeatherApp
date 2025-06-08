import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Switch,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let errors = {};

    if (!username.trim()) errors.username = "Username is required";

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.trim().length < 5) {
      errors.password = "Minimum 5 characters";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigation.navigate("Weather");
      setUsername("");
      setPassword("");
      setErrors({});
      setShowPassword(false);
    }
  };

  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate("Signup");
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <View style={styles.topImageContainer}>
        <Image
          source={require("../assets/topVector.png")}
          style={styles.topImage}
        />
      </View>

      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Hello</Text>
      </View>

      <View alignItems="center">
        <Text style={styles.signText}>Login in to your account</Text>
      </View>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} color="#9A9A9A" style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            if (errors.username && text.trim()) {
              setErrors((prev) => ({ ...prev, username: null }));
            }
          }}
        />
      </View>
      {!!errors.username && (
        <Text style={styles.errorText}>{errors.username}</Text>
      )}

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} color="#9A9A9A" style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) {
              if (text.trim().length >= 5) {
                setErrors((prev) => ({ ...prev, password: null }));
              }
            }
          }}
        />
      </View>
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      {/* Show Password Toggle */}
      <View style={styles.showPasswordContainer}>
        <Switch
          value={showPassword}
          onValueChange={setShowPassword}
          thumbColor={showPassword ? "#623AA2" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#a384ff" }}
          style={{ transform: [{ scale: 0.7 }] }}
        />
        <Text style={styles.showPasswordText}>Show Password</Text>
      </View>

      <Text style={styles.forgotPasswordText}>Forgot your password</Text>

      <View style={styles.signInButtonContainer}>
        <Text style={styles.signInText}>Sign in</Text>

        <TouchableOpacity onPress={handleSubmit}>
          <LinearGradient
            colors={["#F97794", "#623AA2"]}
            style={styles.linearGradient}
          >
            <Icon name="arrow-right" size={24} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Don't have an account?{" "}
        <TouchableOpacity onPress={handleRegister}>
          <Text
            style={{
              textDecorationLine: "underline",
              color: "blue",
              marginBottom: -3,
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      </Text>

      <View style={styles.leftVectorContainer}>
        <Image
          source={require("../assets/leftVector.png")}
          style={styles.leftVectorImage}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    position: "relative",
  },
  topImage: {
    width: "100%",
    height: 130,
  },
  helloText: {
    textAlign: "center",
    fontSize: 70,
    fontWeight: "500",
    color: "#262626",
  },
  signText: {
    alignItems: "center",
    fontSize: 18,
    color: "#262626",
    marginTop: 15,
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 20,
    marginHorizontal: 40,
    elevation: 10,
    marginVertical: 20,
    alignItems: "center",
    height: 50,
  },
  inputIcon: {
    marginLeft: 15,
    marginRight: 5,
  },
  textInput: {
    flex: 1,
  },
  forgotPasswordText: {
    color: "#BEBEBE",
    textAlign: "right",
    width: "90%",
    fontSize: 15,
  },
  signInButtonContainer: {
    flexDirection: "row",
    marginTop: 120,
    width: "90%",
    justifyContent: "flex-end",
  },
  signInText: {
    color: "#262626",
    fontSize: 25,
    fontWeight: "bold",
  },
  linearGradient: {
    height: 34,
    width: 56,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  footerText: {
    color: "#262626",
    textAlign: "center",
    fontSize: 16,
    marginTop: 120,
  },
  leftVectorContainer: {
    position: "absolute",
    bottom: 0,
    left: -40,
  },
  leftVectorImage: {
    height: 350,
    width: 250,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    marginLeft: 60,
    marginTop: -10,
  },
  showPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 45,
    marginTop: -15,
  },
  showPasswordText: {
    color: "#9A9A9A",
    fontSize: 12,
  },
});
