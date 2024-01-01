interface Condition {
  icon: string;
}

interface Weather {
  temp_c: number;
  condition: Condition;
  wind_kph: number;
}

export default Weather;
