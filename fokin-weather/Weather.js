import React from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

const weatherOptions = {
    Thunderstorm: {
        iconName: "weather-lightning",
        gradient: ["#373B44", "#4286f4"],
        title: "천둥",
        subtitle: "집 밖에 나가봐.."
      },
      Drizzle: {
        iconName: "weather-hail",
        gradient: ["#89F7FE", "#66A6FF"],
        title: "조금 비옴",
        subtitle: "우산을 가져가야 돼 말아야 돼"
      },
      Rain: {
        iconName: "weather-rainy",
        gradient: ["#00C6FB", "#005BEA"],
        title: "비옴",
        subtitle: "이 정도면 우산 챙겨야지"
      },
      Snow: {
        iconName: "weather-snowy",
        gradient: ["#7DE2FC", "#B9B6E5"],
        title: "눈옴",
        subtitle: "Do you want to build a snowman?"
      },
      Atmosphere: {
        iconName: "weather-hail",
        gradient: ["#89F7FE", "#66A6FF"]
      },
      Clear: {
        iconName: "weather-sunny",
        gradient: ["#FF7300", "#FEF253"],
        title: "맑음",
        subtitle: "노느라 불태워보자!"
      },
      Clouds: {
        iconName: "weather-cloudy",
        gradient: ["#D7D2CC", "#304352"],
        title: "흐림",
        subtitle: "꾸리꾸리한 날씨야.."
      },
      Mist: {
        iconName: "weather-hail",
        gradient: ["#4DA0B0", "#D39D38"],
        title: "엷은 안개",
        subtitle: "앞이 살짝 안보여요.."
      },
      Dust: {
        iconName: "weather-hail",
        gradient: ["#4DA0B0", "#D39D38"],
        title: "먼지",
        subtitle: "감사해요 중국.."
      },
      Haze: {
        iconName: "weather-hail",
        gradient: ["#4DA0B0", "#D39D38"],
        title: "안개",
        subtitle: "앞이 안보여요.."
      }
}

export default function Weather({temp, condition, getLocation}) {
    
    const reloadWeather = () =>{
        getLocation();
    }

    return (
    <LinearGradient
          colors={weatherOptions[condition].gradient}
          style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.halfContainer}>
            <MaterialCommunityIcons size={96} name={weatherOptions[condition].iconName || "weather-sunset"} color="white" />
            <Text style={styles.temp}>{temp}°</Text>
        </View>
        <View style={{...styles.halfContainer, ...styles.textContainer}}>
            <Text style={styles.title}>{weatherOptions[condition].title}</Text>
            <Text style={styles.subtitle}>{weatherOptions[condition].subtitle}</Text>
        </View>
        <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={reloadWeather}>
                <MaterialCommunityIcons size={36} name={"reload"} color="white" />
            </TouchableOpacity>
        </View>
    </LinearGradient>
    )
}

Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    condition: PropTypes.oneOf(["Thunderstorm", "Drizzle", "Rain", "Snow", "Atmosphere", "Clear", "Clouds", "Haze", "Mist", "Dust"]).isRequired,
    getLocation: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },
    temp:{
        fontSize: 42,
        color:"white"
    },
    halfContainer:{
        flex:2,
        justifyContent:"center",
        alignItems:"center"
    },
    bottomContainer:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"flex-end"
    },
    title:{
        color:"white",
        fontSize: 44,
        fontWeight: "300",
        marginBottom:10
    },
    subtitle:{
        fontWeight:"600",
        color:"white",
        fontSize: 24
    },
    textContainer:{
        paddingHorizontal:20,
        alignItems:"flex-start"
    }
})