import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { SocialIcon } from "react-native-elements";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let errors = {};

    if (!name.trim()) errors.name = "Name is required";

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.trim().length < 5) {
      errors.password = "Minimum 5 characters";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    ) {
      errors.email = "Enter a valid email address";
    }

    if (!mobile.trim()) {
      errors.mobile = "Mobile is required";
    } else if (!/^\d+$/.test(mobile)) {
      errors.mobile = "Enter a valid number";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigation.navigate("Weather");
      setName("");
      setPassword("");
      setEmail("");
      setMobile("");
      setErrors({});
      setShowPassword(false);
    }
  };

  const navigation = useNavigation();

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

      <Text style={styles.createAccountText}>Create account</Text>

      {/* Name */}
      <View style={styles.inputContainer}>
        <Icon name="user" size={24} color="#9A9A9A" style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (errors.name && text.trim()) {
              setErrors((prev) => ({ ...prev, name: null }));
            }
          }}
        />
      </View>
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      {/* Password */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} color="#9A9A9A" style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password && text.trim().length >= 5) {
              setErrors((prev) => ({ ...prev, password: null }));
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

      {/* Email */}
      <View style={styles.inputContainer}>
        <Icon
          name="envelope"
          size={20}
          color="#9A9A9A"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (
              errors.email &&
              /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(text)
            ) {
              setErrors((prev) => ({ ...prev, email: null }));
            }
          }}
        />
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Mobile */}
      <View style={styles.inputContainer}>
        <Icon
          name="mobile"
          size={30}
          color="#9A9A9A"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Mobile"
          value={mobile}
          keyboardType="numeric"
          onChangeText={(text) => {
            setMobile(text);
            if (errors.mobile && /^\d+$/.test(text)) {
              setErrors((prev) => ({ ...prev, mobile: null }));
            }
          }}
        />
      </View>
      {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}

      {/* Create Button */}
      <View style={styles.createContainer}>
        <Text style={styles.createText}>Create</Text>
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
        Or create account using social media
      </Text>

      <View style={styles.socialMediaIconsContainer}>
        <SocialIcon type="facebook" style={styles.socialMediaIcons} />
        <SocialIcon type="twitter" style={styles.socialMediaIcons} />
        <SocialIcon type="google" style={styles.socialMediaIcons} />
      </View>

      <View style={styles.leftVectorContainer}>
        <Image
          source={require("../assets/leftVector.png")}
          style={styles.leftVectorImage}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

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
  createAccountText: {
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#262626",
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
  createContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "90%",
    justifyContent: "flex-end",
  },
  createText: {
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
    marginTop: 40,
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
  socialMediaIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  socialMediaIcons: {
    marginTop: 25,
    elevation: 50,
    shadowRadius: 10,
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
