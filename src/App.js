import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";
import Axios from "axios";
const API_KEY = "c9cbc03064fb0756ab9215447e610ba1";

class App extends React.Component {
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    pressure: undefined,
    humidity: undefined,
    error: undefined
  };

  convertTime(time) {
    let date = new Date();
    date.setTime(time * 1000);
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }
  gettingWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if (city) {
      const api_url = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric)`
      );
      const data = await api_url.data;
      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        sunrise: this.convertTime(data.sys.sunrise),
        sunset: this.convertTime(data.sys.sunset),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        error: undefined
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        humidity: undefined,
        pressure: undefined,
        sunset: undefined,
        error: "Вы не ввели название города"
      });
    }
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <Info />
        <Form weatherMethod={this.gettingWeather} />
        <Weather {...this.state} />
      </div>
    );
  }
}

export default App;
