import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  FlatList,
} from "react-native";

const API_KEY = "8b17bc50033715f768c3b7f35d3aa48e";

const cities = [
  "London",
  "New York",
  "Paris",
  "Tokyo",
  "Istanbul",
  "Beijing",
  "Moscow",
  "Delhi",
  "Rio de Janeiro",
  "Los Angeles",
  "Sydney",
  "Berlin",
  "Rome",
  "Dubai",
  "Bangkok",
  "Cairo",
  "New Jersey",
  "California",
  "Milan",
];

const WeatherScreen = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cityWeatherList, setCityWeatherList] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          query
        )}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCityWeather = async () => {
      const fetchedData = await Promise.all(
        cities.map(async (city) => {
          try {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                city
              )}&appid=${API_KEY}&units=metric`
            );
            const data = await res.json();
            return res.ok ? data : null;
          } catch {
            return null;
          }
        })
      );
      setCityWeatherList(fetchedData.filter(Boolean));
    };

    fetchCityWeather();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/weather_bg1.jpg")}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* FlatList of cities */}
        <View
          style={{
            marginBottom: 20,
            height: 150,
            marginBottom: 100,
          }}
        >
          <FlatList
            horizontal
            data={cityWeatherList}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.cityCard}
                onPress={() => {
                  setWeather(item);
                  setQuery(item.name);
                }}
              >
                <Text style={styles.cityCardName}>{item.name}</Text>
                <Text style={styles.cityCardTemp}>
                  {Math.round(item.main.temp)}°C
                </Text>
                <Text style={styles.cityCardDesc}>
                  {item.weather[0].description}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* City Search */}
        <View style={styles.citySearchContainer}>
          <Text style={styles.heading}>Search for city:</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter city (e.g. London)"
            placeholderTextColor="#ccc"
            value={query}
            onChangeText={setQuery}
          />

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSearch}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Weather Display */}
        {(loading || error || weather) && (
          <View style={styles.resultContainer}>
            {loading && (
              <ActivityIndicator style={{ marginTop: 20 }} size="large" />
            )}

            {error ? (
              <Text style={styles.error}>{error}</Text>
            ) : weather ? (
              <View style={styles.Container}>
                <Text style={styles.city}>{weather.name}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Text style={styles.temp}>
                    {Math.round(weather.main.temp)}°C
                  </Text>
                  <Text style={styles.desc}>
                    {weather.weather[0].description}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },

  overlay: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  citySearchContainer: {
    marginBottom: 50,
    marginTop: -20,
  },

  heading: {
    fontSize: 30,
    color: "#16166B",
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  input: {
    width: 300,
    height: 50,
    borderColor: "#16166B",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: "#16166B",
    backgroundColor: "rgba(255,255,255,0.2)",
    fontSize: 20,
  },

  buttonContainer: {
    alignItems: "center",
  },

  buttonText: {
    fontSize: 24,
    color: "#2F2963",
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    borderColor: "#2F2963",
  },

  resultContainer: {
    backgroundColor: "rgba(255,255,255,0.5)",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "#16166B",
    width: "100%",
  },

  Container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  city: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#16166B",
    marginBottom: 30,
  },

  temp: {
    fontSize: 40,
    marginVertical: 10,
    color: "#16166B",
    textAlign: "center",
  },

  desc: {
    fontSize: 22,
    marginVertical: 10,
    color: "#16166B",
    textTransform: "capitalize",
  },

  error: {
    marginTop: 20,
    color: "red",
  },

  cityCard: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 8,
    alignItems: "center",
    width: 150,
    borderColor: "#16166B",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },

  cityCardName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16166B",
    marginBottom: 5,
    textAlign: "center",
  },

  cityCardTemp: {
    fontSize: 24,
    color: "#16166B",
    marginBottom: 3,
  },

  cityCardDesc: {
    fontSize: 14,
    color: "#16166B",
    textAlign: "center",
  },
});
