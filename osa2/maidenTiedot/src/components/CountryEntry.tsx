import Country from "../interfaces/Country";
import WeatherInfo from "./WeatherInfo";

const CountryEntry = ({
  country,
  collapse = true,
  setCountry,
}: {
  country: Country;
  collapse?: boolean;
  setCountry: CallableFunction;
}) => {
  if (collapse) {
    return (
      <li>
        {country.name.common}
        <button onClick={() => setCountry(country)}>show</button>
      </li>
    );
  }

  return (
    <div>
      <h2>{country.name.common}</h2>

      <p>
        capital {country.capital}
        <br />
        area {country.area}
      </p>

      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.svg} alt={country.flags.alt} width="10%"></img>

      <h3>Weather in {country.capital}</h3>
      <WeatherInfo city={country.capital} />
    </div>
  );
};

export default CountryEntry;
