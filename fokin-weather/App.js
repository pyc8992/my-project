import React from 'react';
import { Alert } from "react-native";
import Loading from "./Loading";
import Weather from "./Weather";
import * as Location from 'expo-location';
import axios from "axios";

const API_KEY = "7aacd7d986cbe9ef5ca64b821b960a4c";

export default class extends React.Component {
  state = {
    isLoading: true,
    temp: 0,
    condition: "Clear"
  };

  getWeather = async(latitude, longitude) => {
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`);
    this.setState({ isLoading: false, condition:"Clear", condition: data.weather[0].main, temp: data.main.temp });
  };

  getLocation = async() => {
    try {
      await Location.requestPermissionsAsync();
      const { coords : { latitude, longitude } } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }    
  }

  componentDidMount(){
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />;
  }
}